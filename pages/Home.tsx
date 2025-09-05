
import React, { useState, useEffect, useRef } from 'react';
import Atom from '../components/Atom';

interface HomePageProps {
    setPage: (page: string) => void;
    navigateWithFilter: (filter: string) => void;
}

const skills = ['HTML', 'CSS', 'JavaScript', 'Python', 'React', 'Tailwind'];

const journeyHome = [
    { age: '11.5 yrs', title: 'Learned HTML & CSS', description: 'Started my journey by learning the fundamentals of web structure and styling.' },
    { age: '12.5 yrs', title: 'Learned JavaScript + Python', description: 'Dived into programming logic and built my first cloned app, bringing static pages to life.' },
    { age: '13.5 yrs', title: 'Learned React & Tailwind', description: 'Mastered modern frontend frameworks to build complex, responsive user interfaces.' },
    { age: 'Now', title: 'Front-end Developer', description: 'Actively building projects and exploring the exciting intersection of AI and web development.' }
];

const stats = [
    { title: 'Projects Built', value: 'YouTube Clone', description: 'First major app' },
    { title: 'Experience', value: '2 years', description: 'Coding journey' },
    { title: 'Focus Areas', value: 'Front-end + AI', description: 'Current interests' }
];

const Hero: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => (
    <section id="home" className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        </div>
        <div className="container mx-auto max-w-7xl grid md:grid-cols-2 gap-10 items-center">
            <div className="text-center md:text-left">
                <h1 className="font-poppins text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tighter text-glow animate-pulse-glow">
                    Hi, I'm Sendan
                </h1>
                <p className="mt-4 font-poppins text-xl sm:text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
                    13 y/o Front-End & AI Enthusiast
                </p>
                <p className="mt-6 text-slate-300 max-w-lg mx-auto md:mx-0 text-lg">
                    I started coding at 11.5 and now build front-end apps with React & Tailwind.
                </p>
                <div className="mt-8 flex gap-4 justify-center md:justify-start">
                    <button onClick={() => setPage('projects')} className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-indigo-500 hover:shadow-[0_0_20px_theme(colors.indigo.500)] transform hover:-translate-y-1">
                        View Projects
                    </button>
                    <button onClick={() => setPage('contact')} className="bg-slate-800/80 backdrop-blur-sm text-white font-semibold py-3 px-8 rounded-full border border-slate-700 transition-all duration-300 hover:border-indigo-500 hover:shadow-[0_0_15px_theme(colors.indigo.700)] transform hover:-translate-y-1">
                        Contact Me
                    </button>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <Atom />
            </div>
        </div>
    </section>
);

const Skills: React.FC<{ navigateWithFilter: (filter: string) => void }> = ({ navigateWithFilter }) => (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="container mx-auto max-w-5xl text-center">
            <h2 className="font-poppins text-4xl sm:text-5xl font-bold text-white">Skills I've Learned</h2>
            <p className="mt-4 text-slate-400">Click a skill to see related projects!</p>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                {skills.map((skill) => (
                    <button
                        key={skill}
                        onClick={() => navigateWithFilter(skill)}
                        className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center flex items-center justify-center transition-all duration-300 hover:border-indigo-500/50 hover:shadow-[0_0_20px_theme(colors.indigo.600)] hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                    >
                        <p className="text-slate-200 font-semibold text-lg">{skill}</p>
                    </button>
                ))}
            </div>
        </div>
    </section>
);

const Journey = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const journeyRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!journeyRef.current) return;
            const viewportCenter = window.innerHeight / 2;
            let closestIndex = -1;
            let smallestDistance = Infinity;

            itemRefs.current.forEach((el, index) => {
                if (el) {
                    const rect = el.getBoundingClientRect();
                    const elCenter = rect.top + rect.height / 2;
                    const distance = Math.abs(viewportCenter - elCenter);
                    if (distance < smallestDistance) {
                        smallestDistance = distance;
                        closestIndex = index;
                    }
                }
            });
            if (smallestDistance < window.innerHeight / 2) setActiveIndex(closestIndex);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="journey" ref={journeyRef} className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
            <div className="container mx-auto max-w-5xl text-center">
                <h2 className="font-poppins text-4xl sm:text-5xl font-bold text-white">My Coding Journey</h2>
                <div className="mt-16 relative">
                    <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-slate-700" aria-hidden="true"></div>
                    <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-transparent via-indigo-500 to-transparent animate-pulse" aria-hidden="true"></div>
                    <div className="space-y-12">
                        {journeyHome.map((item, index) => (
                            <div key={index} ref={el => { if (el) itemRefs.current[index] = el; }} className={`flex items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                                <div className="hidden md:block w-5/12"></div>
                                <div className="hidden md:block w-1/12">
                                    <div className={`w-6 h-6 rounded-full mx-auto transition-all duration-500 ease-in-out ${activeIndex === index ? 'bg-indigo-400 scale-125 shadow-[0_0_30px_theme(colors.indigo.400)]' : 'bg-slate-600'}`}></div>
                                </div>
                                <div className="w-full md:w-5/12">
                                    <div className={`p-6 rounded-lg border border-slate-700 bg-slate-800/50 backdrop-blur-sm transition-all duration-500 ease-in-out ${activeIndex === index ? 'opacity-100 blur-0 scale-105' : 'opacity-40 blur-lg'}`}>
                                        <p className="text-indigo-400 font-semibold">{item.age}</p>
                                        <h3 className="font-poppins text-xl font-bold text-white mt-1">{item.title}</h3>
                                        <p className="text-slate-400 mt-2">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const Stats = () => (
    <section id="stats" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-slate-800/50 p-8 rounded-xl border border-slate-700 text-center transition-all duration-300 hover:border-indigo-500/50 hover:shadow-[0_0_25px_theme(colors.indigo.700)] hover:-translate-y-2 hover:transform hover:rotate-[-2deg]">
                        <p className="text-indigo-400 text-sm font-semibold">{stat.title}</p>
                        <p className="font-poppins text-3xl font-bold text-white mt-2">{stat.value}</p>
                        <p className="text-slate-400 mt-1">{stat.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const CTA: React.FC<{ setPage: (page: string) => void }> = ({ setPage }) => (
    <section id="cta" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="container mx-auto max-w-5xl">
            <div className="bg-gradient-to-r from-indigo-800 to-purple-800 rounded-2xl p-10 md:p-16 text-center border border-indigo-600 shadow-[0_0_30px_theme(colors.indigo.800)]">
                <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-white">Explore my projects and AI demos.</h2>
                <p className="mt-4 text-indigo-200 max-w-2xl mx-auto">See what I've been building.</p>
                <div className="mt-8">
                     <button onClick={() => setPage('projects')} className="bg-white text-indigo-700 font-semibold py-3 px-8 rounded-full transition-all duration-300 hover:bg-slate-200 transform hover:scale-105">
                        See Projects
                    </button>
                </div>
            </div>
        </div>
    </section>
);

const HomePage: React.FC<HomePageProps> = ({ setPage, navigateWithFilter }) => (
    <>
        <Hero setPage={setPage} />
        <Skills navigateWithFilter={navigateWithFilter} />
        <Journey />
        <Stats />
        <CTA setPage={setPage} />
    </>
);

export default HomePage;