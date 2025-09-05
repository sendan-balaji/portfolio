import React, { useState } from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

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

// Icon Components for social buttons
const GitHubIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
);
const DiscordIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.36981C18.7915 3.64954 17.1595 3.11418 15.4578 2.79335C15.4545 2.79335 15.4512 2.79335 15.4478 2.79668C15.223 2.72392 14.9888 2.68449 14.7545 2.68449C14.0852 2.68449 13.4343 2.76059 12.8118 2.89517C12.7915 2.90184 12.7712 2.90517 12.7477 2.91184C11.963 3.11183 11.213 3.38171 10.4915 3.72147C10.478 3.72814 10.4645 3.73481 10.4512 3.74147C8.74952 4.50814 7.27119 5.59147 6.04952 6.94814C4.71952 8.44147 3.76302 10.2315 3.26302 12.1548C3.25969 12.1682 3.25635 12.1815 3.25302 12.1948C3.04635 13.0682 2.94635 13.9815 2.94969 14.9015C2.94969 17.9615 4.80969 20.7348 7.61635 22.2548C7.62302 22.2582 7.62969 22.2615 7.63635 22.2648C8.31635 22.6348 9.05969 22.9215 9.83302 23.1415C9.84302 23.1448 9.85302 23.1482 9.86302 23.1515C10.593 23.3615 11.353 23.4715 12.133 23.4715C14.7397 23.4715 17.1497 22.3148 18.813 20.2481C19.783 18.9915 20.473 17.5448 20.843 15.9982C20.8497 15.9748 20.853 15.9515 20.8564 15.9282C21.233 14.2382 21.3697 12.4848 21.2497 10.7648C21.073 8.31481 20.203 6.06481 18.813 4.36981H20.317ZM8.69635 17.1148C7.94969 17.1148 7.35635 16.5248 7.35635 15.7748C7.35635 15.0248 7.94969 14.4348 8.69635 14.4348C9.44302 14.4348 10.0364 15.0248 10.0364 15.7748C10.033 16.5248 9.44302 17.1148 8.69635 17.1148ZM13.3364 17.1148C12.5897 17.1148 11.9964 16.5248 11.9964 15.7748C11.9964 15.0248 12.5897 14.4348 13.3364 14.4348C14.083 14.4348 14.6764 15.0248 14.6764 15.7748C14.6764 16.5248 14.083 17.1148 13.3364 17.1148Z" /></svg>
);
const LinkedInIcon = () => (
    <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
);
const EmailIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z" /></svg>
);

const socialLinks = [
    { name: 'GitHub', icon: <GitHubIcon />, href: 'https://github.com/sendan-balaji' },
    { name: 'Discord', icon: <DiscordIcon />, href: 'https://discordapp.com/users/1357697152909840465' },
    { name: 'LinkedIn', icon: <LinkedInIcon />, href: 'https://www.linkedin.com/in/sendan-balaji-4b45ba380' },
    { name: 'Email', icon: <EmailIcon />, href: 'mailto:sendan@example.com' },
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

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setFeedback('Thank you! Your message has been sent.');
        setFormData({ name: '', email: '', message: '' });

        // Clear feedback message after a few seconds
        setTimeout(() => setFeedback(''), 5000);
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