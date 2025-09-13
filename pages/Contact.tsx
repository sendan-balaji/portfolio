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

// Icon Components for social buttons
const GitHubIcon = () => (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
);

const DiscordIcon = () => (
    <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor">
        <path d="M524.5 69.8C487.1 44 444.3 24 397.3 12.5c-14.2-3.7-28.5-6.8-42.8-9.1L354 3.3c-2.7-1.3-5.5-2-8.3-2c-2.8 0-5.6 .7-8.3 2L337 4.4C322.7 6.7 308.5 9.8 294.2 12.5C247.2 24 204.4 44 167.1 69.8C121.6 100.5 86.3 144.4 62.9 198.1c-3.5 7.9-7.4 16-11.5 24.2c-4.1 8.2-8.4 16.5-13.2 24.9c-16.5 29.5-28.9 59.8-35.8 89.9c-2.1 9.1-3.3 18.2-3.6 27.2c-.3 9.1 .3 18.3 1.8 27.5c2.9 17.8 7.8 35.4 14.5 52.5c11.7 29.5 28.9 57.2 50.8 82.2c24.7 28.1 55.3 52.2 89.8 71.4c21.3 11.8 43.5 22.1 66.5 31c15.7 6.1 31.6 11.7 47.7 16.5c20.2 6.1 40.5 11.2 60.8 15.3c11.3 2.3 22.6 4.2 33.8 5.7c5.6 1 11.2 1.3 16.8 1.3c5.6 0 11.2-.4 16.8-1.3c11.2-1.5 22.5-3.4 33.8-5.7c20.3-4.1 40.6-9.2 60.8-15.3c16.1-4.9 32-10.4 47.7-16.5c23-8.8 45.2-19.2 66.5-31c34.5-19.2 65.1-43.3 89.8-71.4c21.9-25 39.1-52.7 50.8-82.2c6.8-17.1 11.6-34.7 14.5-52.5c1.5-9.2 2.1-18.4 1.8-27.5c-.3-9.1-1.5-18.2-3.6-27.2c-6.9-30.1-19.3-60.4-35.8-89.9c-4.8-8.4-9.1-16.7-13.2-24.9c-4.1-8.2-8-16.3-11.5-24.2C553.7 144.4 518.4 100.5 524.5 69.8zM222.4 358.2c-29.5 0-53.4-23.9-53.4-53.4s23.9-53.4 53.4-53.4c29.5 0 53.4 23.9 53.4 53.4s-23.9 53.4-53.4 53.4zm195.3 0c-29.5 0-53.4-23.9-53.4-53.4s23.9-53.4 53.4-53.4c29.5 0 53.4 23.9 53.4 53.4s-23.9 53.4-53.4 53.4z" />
    </svg>
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

        } catch (error: any) {
            // Handle any errors that occurred during the process
            console.error('Error sending message:', error);
            // Display the specific message from the function, or a fallback
            setFeedback(error.message || 'Sorry, there was an error sending your message. Please try again.');
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
                            <p className={`mt-4 text-center font-medium transition-opacity duration-300 ${feedback.includes('error') || feedback.includes('Sorry') ? 'text-red-400' : 'text-indigo-300'}`}>{feedback}</p>
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
