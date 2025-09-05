import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from '../supabaseClient'; // Import supabase to fetch project data

// --- HELPER ICONS (No changes needed here) ---
const ClearIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M10 11v6" /><path d="M14 11v6" /></svg>
);
const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
);

// --- GEMINI API SETUP ---
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not set in the .env.local file");
}
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// --- INTERFACE DEFINITION ---
interface Message {
    role: 'user' | 'model';
    text: string;
}

// --- MAIN COMPONENT ---
const AiPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: "Hello! I'm Sendan's portfolio AI. Ask me anything about his projects!" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [projectsData, setProjectsData] = useState<any[]>([]); // State to hold project info
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    // --- FETCH PROJECT DATA FROM SUPABASE ONCE ---
    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase.from('projects').select('*');
            if (error) {
                console.error("Error fetching projects for AI context:", error);
            } else {
                setProjectsData(data || []);
            }
        };
        fetchProjects();
    }, []);

    // --- AUTO-SCROLL EFFECT ---
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    // --- HANDLE SENDING MESSAGE TO GEMINI API ---
    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', text: input.trim() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Convert project data to a string for the prompt
            const projectContext = JSON.stringify(projectsData);

            // This is the prompt that makes the AI portfolio-aware
            const prompt = `You are a helpful and friendly AI assistant for Sendan Balaji's personal portfolio.
            Your personality is professional yet approachable.
            Here is all of Sendan's project information in JSON format:
            ${projectContext}

            Based ONLY on the information above, answer the following user question.
            If the question is not about Sendan's projects, skills, or career, politely state that you can only answer questions about the portfolio.

            User question: "${userMessage.text}"`;

            // Call the real Gemini API
            const result = await model.generateContent(prompt);
            const response = result.response;
            const text = response.text();

            const modelResponse: Message = { role: 'model', text: text };
            setMessages(prev => [...prev, modelResponse]);

        } catch (err) {
            console.error("Error calling Gemini API:", err);
            const errorResponse: Message = { role: 'model', text: "Sorry, I encountered an error connecting to the AI. Please try again." };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    // --- HELPER FUNCTIONS (No changes needed) ---
    const handleClearChat = () => {
        setMessages([{ role: 'model', text: "Chat cleared! How can I help you next?" }]);
    };

    const handleDownloadChat = () => {
        const chatHistory = messages.map(msg => `${msg.role.toUpperCase()}: ${msg.text}`).join('\n\n');
        const blob = new Blob([chatHistory], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ai-chat-history.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // --- JSX / UI (No changes needed) ---
    return (
        <div className="pt-8 pb-20 px-4 min-h-screen flex flex-col items-center">
            <header className="w-full max-w-4xl glass-card p-4 mb-6 rounded-xl border-indigo-500/30 shadow-lg shadow-indigo-500/20 flex justify-between items-center">
                <div>
                    <h1 className="font-poppins text-2xl md:text-3xl font-bold text-white text-glow">Portfolio AI</h1>
                    <p className="text-sm text-indigo-300">Powered by Gemini 1.5 Flash</p>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handleClearChat} className="p-2 rounded-full bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors" aria-label="Clear Chat"><ClearIcon /></button>
                    <button onClick={handleDownloadChat} className="p-2 rounded-full bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors" aria-label="Download Chat"><DownloadIcon /></button>
                </div>
            </header>

            <div className="w-full max-w-4xl flex-grow flex flex-col glass-card rounded-xl overflow-hidden border-indigo-500/30 shadow-lg shadow-indigo-500/20" style={{ minHeight: '65vh' }}>
                <div ref={chatContainerRef} className="flex-grow p-4 md:p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent ai-chat-bg">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-3 animate-chat-bubble-slide-in ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center font-bold text-sm">AI</div>}
                            <div className={`max-w-md md:max-w-lg lg:max-w-xl px-4 py-3 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-700/80 text-white rounded-br-lg' : 'bg-slate-800/80 text-slate-200 rounded-bl-lg'}`}>
                                <p className="whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-end gap-3 justify-start animate-chat-bubble-slide-in">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center font-bold text-sm">AI</div>
                            <div className="max-w-md md:max-w-lg px-4 py-3 rounded-2xl bg-slate-800/80 text-slate-200 rounded-bl-lg">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-slate-900/40 border-t border-indigo-500/20 flex-shrink-0">
                    <form onSubmit={handleSendMessage} className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask about my projects..."
                            disabled={isLoading}
                            className="w-full bg-slate-800 border border-slate-700 rounded-full py-3 pl-5 pr-14 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all disabled:opacity-50"
                        />
                        <button type="submit" disabled={isLoading || !input.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-indigo-600 rounded-full text-white transition-all duration-200 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transform hover:scale-110 active:scale-95">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AiPage;