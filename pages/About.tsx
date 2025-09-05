
import React, { useState, useEffect, useRef } from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

interface AboutPageProps {
    setPage: (page: string) => void;
    navigateWithFilter: (filter: string) => void;
}

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
    const [ref, isVisible] = useAnimateOnScroll();
    return (
        <section ref={ref} className={`py-20 md:py-24 px-4 transition-all duration-1000 ease-out ${className} ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
            <div className="container mx-auto max-w-3xl text-center">
                {children}
            </div>
        </section>
    );
};

const journeyAbout = [
    { age: 'Age 11 (2023)', title: 'The First Spark', description: 'Made a Tally Web with basic HTML. It was my first hands-on coding attempt and sparked my passion for building things.' },
    { age: 'Age 11.5', title: 'Building the Foundation', description: 'Learned HTML & CSS properly and created several personal test websites to hone my fundamental skills.' },
    { age: 'Age 12.5', title: 'Expanding My Arsenal', description: 'Learned Python & JavaScript and built a functional YouTube Clone. This was my first big project and it solidified my confidence.' },
    { age: 'Age 13.5 (Now)', title: 'Mastering the Modern Stack', description: 'Learning React & Tailwind while exploring Generative AI. This portfolio itself is my latest showpiece project.' },
];

const traits = [
    { icon: '💡', name: 'Curious Learner', description: 'Always exploring new tools and technologies.' },
    { icon: '⚡', name: 'Fast Adaptor', description: 'Pick up new frameworks and concepts quickly.' },
    { icon: '🎮', name: 'Creative Builder', description: 'Love experimenting and bringing new ideas to life.' },
    { icon: '🔐', name: 'Future Focused', description: 'Excited about the future of AI and security.' },
];

const techStack = {
    'Frontend': ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind'],
    'Programming': ['Python'],
    'AI': ['GenAI', 'Local AI Experiments'],
};

const TimelineItem = ({ item, index, isActive }: { item: typeof journeyAbout[0], index: number, isActive: boolean }) => {
    const [ref, isVisible] = useAnimateOnScroll({ threshold: 0.5, triggerOnce: true });
    const isEven = index % 2 === 0;

    const animationClasses = isVisible
        ? 'opacity-100 translate-y-0 md:translate-x-0'
        : 'opacity-0 translate-y-4 md:translate-y-0 ' + (isEven ? 'md:translate-x-8' : 'md:-translate-x-8');
        
    const focusClasses = isVisible ? (isActive ? 'blur-0' : 'blur-sm opacity-60') : '';

    return (
        <div ref={ref} className={`relative flex items-center my-8 pl-10 md:pl-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
            {/* Desktop spacer */}
            <div className="hidden md:block w-5/12"></div>

            {/* Dot */}
            <div className="z-10 w-10 md:w-2/12 flex-shrink-0 flex justify-center">
                <div className={`w-4 h-4 rounded-full transition-all duration-500 ${isVisible ? (isActive ? 'bg-purple-400 scale-125 shadow-[0_0_15px_theme(colors.purple.400)]' : 'bg-purple-400/50 scale-100') : 'bg-slate-600'}`}></div>
            </div>

            {/* Card */}
            <div className={`w-full md:w-5/12 transition-all duration-700 ease-out transform ${animationClasses} ${focusClasses}`}>
                <div className="card-glow rounded-lg p-6 text-left">
                    <p className="text-purple-400 font-semibold">{item.age}</p>
                    <h3 className="font-poppins text-xl font-bold text-white mt-1">{item.title}</h3>
                    <p className="text-slate-400 mt-2">{item.description}</p>
                </div>
            </div>
        </div>
    );
}

const AboutPage: React.FC<AboutPageProps> = ({ setPage, navigateWithFilter }) => {
    const journeyRef = useRef<HTMLDivElement | null>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [lineHeight, setLineHeight] = useState(0);
    const [activeIndex, setActiveIndex] = useState(-1);

    useEffect(() => {
        const handleScroll = () => {
            if (!journeyRef.current) return;
            
            // Line animation
            const journeyRect = journeyRef.current.getBoundingClientRect();
            const journeyTop = journeyRect.top;
            const journeyHeight = journeyRect.height;
            const viewportHeight = window.innerHeight;
            
            const scrollStartPoint = viewportHeight * 0.66;
            const scrolledDistance = scrollStartPoint - journeyTop;
            const newHeight = Math.max(0, Math.min(scrolledDistance, journeyHeight));
            setLineHeight(newHeight);

            // Focus animation
            const viewportCenter = viewportHeight / 2;
            let closestIndex = -1;
            let smallestDistance = Infinity;

            itemRefs.current.forEach((el, index) => {
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < viewportHeight && rect.bottom > 0) {
                        const elCenter = rect.top + rect.height / 2;
                        const distance = Math.abs(viewportCenter - elCenter);
                        if (distance < smallestDistance) {
                            smallestDistance = distance;
                            closestIndex = index;
                        }
                    }
                }
            });
            setActiveIndex(closestIndex);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="pt-8">
            <Section>
                <h1 className="font-poppins text-5xl sm:text-6xl md:text-7xl font-extrabold text-white text-glow animate-pulse-glow">About Me</h1>
                <p className="mt-4 text-xl md:text-2xl text-slate-300">My coding journey and who I am as a developer 💜</p>
                <p className="mt-12 text-lg text-slate-300 max-w-2xl mx-auto text-left sm:text-center">
                    Hi, I’m Sendan, a 13-year-old developer who’s passionate about building cool projects with code. My journey started when I was 11, and since then I’ve been constantly learning new programming languages, frameworks, and exploring the exciting world of AI. I believe coding is not just about solving problems but also about creativity, imagination, and making ideas real.
                </p>
            </Section>

            <Section>
                <h2 className="font-poppins text-4xl md:text-5xl font-bold text-white text-glow">My Journey</h2>
                <div ref={journeyRef} className="mt-16 relative">
                    <div className="absolute left-5 top-0 bottom-0 -translate-x-1/2 w-1 bg-slate-700/50 md:left-1/2" aria-hidden="true"></div>
                    <div
                        className="absolute left-5 top-0 -translate-x-1/2 w-1 bg-purple-500 shadow-[0_0_10px_theme(colors.purple.500)] transition-all duration-300 ease-linear md:left-1/2"
                        style={{ height: `${lineHeight}px` }}
                        aria-hidden="true"
                    ></div>
                    {journeyAbout.map((item, index) => (
                        <div key={index} ref={el => { itemRefs.current[index] = el; }}>
                            <TimelineItem item={item} index={index} isActive={index === activeIndex} />
                        </div>
                    ))}
                </div>
            </Section>
            
            <Section>
                <h2 className="font-poppins text-4xl md:text-5xl font-bold text-white text-glow">Who I Am</h2>
                <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {traits.map(trait => (
                         <div key={trait.name} className="card-glow p-8 rounded-xl text-center">
                            <span className="text-4xl">{trait.icon}</span>
                            <h3 className="font-poppins text-2xl font-bold text-white mt-4">{trait.name}</h3>
                            <p className="text-slate-400 mt-2">{trait.description}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Section>
                 <h2 className="font-poppins text-4xl md:text-5xl font-bold text-white text-glow">Tech I Use</h2>
                 <p className="mt-4 text-slate-400">Click a skill to see related projects!</p>
                 <div className="mt-12 space-y-8">
                    {Object.entries(techStack).map(([category, skills]) => (
                        <div key={category}>
                            <h3 className="font-poppins text-2xl font-semibold text-purple-300">{category}</h3>
                            <div className="mt-4 flex flex-wrap justify-center gap-3">
                                {skills.map(skill => (
                                    <button
                                        key={skill}
                                        onClick={() => navigateWithFilter(skill)}
                                        className="card-glow text-slate-200 font-medium py-2 px-4 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                                    >
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                 </div>
            </Section>

            <Section>
                <h2 className="font-poppins text-5xl md:text-6xl font-extrabold text-white text-glow animate-pulse-glow">This is just the beginning 💜</h2>
                <div className="mt-8">
                    <button onClick={() => setPage('projects')} className="btn-glow inline-block text-white font-semibold py-3 px-8 rounded-full text-lg">
                        View My Projects →
                    </button>
                </div>
            </Section>
        </div>
    );
};

export default AboutPage;