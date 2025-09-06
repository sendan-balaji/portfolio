import React, { useState } from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
import { supabase } from '../supabaseClient'; // Make sure to import the Supabase client

interface ContactPageProps {
    setPage: (page: string) => void;
}

// Helper component for scroll animations
const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
    const [ref, isVisible] = useAnimateOnScroll({ threshold: 0.1, triggerOnce: true });
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// Icon Components for social buttons (Restored to original style)
const GitHubIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
);
const DiscordIcon = () => (
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.0.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M524.5 133.8C524.3 133.5 524.1 133.2 523.7 133.1C485.6 115.6 445.3 103.1 404 96C403.6 95.9 403.2 96 402.9 96.1C402.6 96.2 402.3 96.5 402.1 96.9C396.6 106.8 391.6 117.1 387.2 127.5C342.6 120.7 297.3 120.7 252.8 127.5C248.3 117 243.3 106.8 237.7 96.9C237.5 96.6 237.2 96.3 236.9 96.1C236.6 95.9 236.2 95.9 235.8 95.9C194.5 103 154.2 115.5 116.1 133C115.8 133.1 115.5 133.4 115.3 133.7C39.1 247.5 18.2 358.6 28.4 468.2C28.4 468.5 28.5 468.7 28.6 469C28.7 469.3 28.9 469.4 29.1 469.6C73.5 502.5 123.1 527.6 175.9 543.8C176.3 543.9 176.7 543.9 177 543.8C177.3 543.7 177.7 543.4 177.9 543.1C189.2 527.7 199.3 511.3 207.9 494.3C208 494.1 208.1 493.8 208.1 493.5C208.1 493.2 208.1 493 208 492.7C207.9 492.4 207.8 492.2 207.6 492.1C207.4 492 207.2 491.8 206.9 491.7C191.1 485.6 175.7 478.3 161 469.8C160.7 469.6 160.5 469.4 160.3 469.2C160.1 469 160 468.6 160 468.3C160 468 160 467.7 160.2 467.4C160.4 467.1 160.5 466.9 160.8 466.7C163.9 464.4 167 462 169.9 459.6C170.2 459.4 170.5 459.2 170.8 459.2C171.1 459.2 171.5 459.2 171.8 459.3C268 503.2 372.2 503.2 467.3 459.3C467.6 459.2 468 459.1 468.3 459.1C468.6 459.1 469 459.3 469.2 459.5C472.1 461.9 475.2 464.4 478.3 466.7C478.5 466.9 478.7 467.1 478.9 467.4C479.1 467.7 479.1 468 479.1 468.3C479.1 468.6 479 468.9 478.8 469.2C478.6 469.5 478.4 469.7 478.2 469.8C463.5 478.4 448.2 485.7 432.3 491.6C432.1 491.7 431.8 491.8 431.6 492C431.4 492.2 431.3 492.4 431.2 492.7C431.1 493 431.1 493.2 431.1 493.5C431.1 493.8 431.2 494 431.3 494.3C440.1 511.3 450.1 527.6 461.3 543.1C461.5 543.4 461.9 543.7 462.2 543.8C462.5 543.9 463 543.9 463.3 543.8C516.2 527.6 565.9 502.5 610.4 469.6C610.6 469.4 610.8 469.2 610.9 469C611 468.8 611.1 468.5 611.1 468.2C623.4 341.4 590.6 231.3 524.2 133.7zM222.5 401.5C193.5 401.5 169.7 374.9 169.7 342.3C169.7 309.7 193.1 283.1 222.5 283.1C252.2 283.1 275.8 309.9 275.3 342.3C275.3 375 251.9 401.5 222.5 401.5zM417.9 401.5C388.9 401.5 365.1 374.9 365.1 342.3C365.1 309.7 388.5 283.1 417.9 283.1C447.6 283.1 471.2 309.9 470.7 342.3C470.7 375 447.5 401.5 417.9 401.5z"/></svg>
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
);
const EmailIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" /></svg>
);


const socialLinks = [
    { name: 'GitHub', icon: <GitHubIcon />, href: 'https://github.com/sendan-balaji' },
    { name: 'Discord', icon: <DiscordIcon />, href: 'https://discordapp.com/users/1357697152909840465' },
    { name: 'LinkedIn', icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/sendan-balaji-4b45ba380' },
    { name: 'Email', icon: <EmailIcon />, href: 'mailto:bssendan28@gmail.com' },
];

const ContactPage: React.FC<ContactPageProps> = ({ setPage }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        setFeedback('Sending...');

        try {
            // Invoke the Supabase Edge Function to send the email
            const { error } = await supabase.functions.invoke('send-contact-email', {
                body: { record: formData },
            });

            if (error) {
                // If the function returns an error, throw it to the catch block
                throw error;
            }

            // If successful, update feedback and clear the form
            setFeedback('Thank you! Your message has been sent.');
            setFormData({ name: '', email: '', message: '' });

        } catch (error) {
            // Handle any errors that occurred during the process
            console.error('Error sending message:', error);
            setFeedback('Sorry, there was an error sending your message. Please try again.');
        } finally {
            // This runs regardless of success or failure
            setIsSubmitting(false);
            // Clear the feedback message after 5 seconds
            setTimeout(() => setFeedback(''), 5000);
        }
    };

    return (
        <div className="min-h-screen flex flex-col pt-8 pb-10 px-4">
            <div className="container mx-auto max-w-4xl flex-grow">
                <AnimatedSection>
                    <header className="text-center">
                        <h1 className="font-poppins text-5xl md:text-7xl font-extrabold text-white text-glow">Let’s Connect</h1>
                        <p className="mt-4 text-lg text-slate-300 max-w-xl mx-auto">Got a project idea or just want to say hi? Reach me here 👇</p>
                    </header>
                </AnimatedSection>
                
                <AnimatedSection delay={150}>
                    <div className="mt-16 max-w-lg mx-auto">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                                <input type="text" id="name" name="name" required className="form-input" placeholder="Your Name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                                <input type="email" id="email" name="email" required className="form-input" placeholder="your.email@example.com" value={formData.email} onChange={handleChange} />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                                <textarea id="message" name="message" required rows={5} className="form-input" placeholder="Your message..." value={formData.message} onChange={handleChange}></textarea>
                            </div>
                            <div>
                                <button type="submit" disabled={isSubmitting} className="w-full btn-glow text-white font-semibold py-3 px-6 rounded-lg text-lg disabled:opacity-60 disabled:cursor-not-allowed">
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </div>
                        </form>
                        {feedback && (
                            <p className={`mt-4 text-center font-medium transition-opacity duration-300 ${feedback.includes('error') ? 'text-red-400' : 'text-indigo-300'}`}>{feedback}</p>
                        )}
                    </div>
                </AnimatedSection>

                <AnimatedSection delay={300}>
                    <div className="mt-20 text-center">
                        <h2 className="font-poppins text-2xl font-semibold text-white">Or find me on</h2>
                        <div className="mt-6 flex justify-center gap-6">
                            {socialLinks.map((link, index) => (
                                <a 
                                    key={link.name}
                                    href={link.href} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    aria-label={link.name}
                                    className="w-16 h-16 rounded-full flex items-center justify-center bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-slate-400 transition-all duration-300 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 hover:shadow-[0_0_20px_theme(colors.indigo.600)] hover:-translate-y-2 transform"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>

            </div>

            <footer className="mt-20 text-center">
                <p className="text-slate-500 text-sm">© 2025 Sendan | Built with React + Tailwind 💜</p>
            </footer>
        </div>
    );
};

export default ContactPage;
