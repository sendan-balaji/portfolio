
import React from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

const experimentsData = [
    { name: 'Number Guessing Game', age: 12.5, description: 'A fun logic mini-project to guess the correct number.', tags: ['JavaScript'] },
    { name: 'Random Number Generator', age: 12, description: 'A small tool for generating random numbers.', tags: ['JavaScript'] },
    { name: 'Local AI Tests', age: 13, description: 'My first attempt at running AI models locally on my machine.', tags: ['AI', 'Python'] },
    { name: 'Encryption Experiments', age: 13, description: 'Trying out simple ciphers and encryption algorithms.', tags: ['Python', 'Cryptography'] },
    { name: 'Tally Web (Old)', age: 11, description: 'My very first mini web attempt, built with only HTML & CSS.', tags: ['HTML', 'CSS'] },
];

const upcomingExperimentsData = [
    { name: 'Javis Project (AI Assistant)', description: 'A personal AI assistant inspired by Iron Man.' },
    { name: 'Rebuilding Tally Web (New vs Old)', description: 'A complete rewrite using React to compare progress.' },
    { name: 'Web3 + AI Demo Experiments', description: 'Exploring the intersection of decentralized tech and AI.' },
];

const ExperimentCard = ({ experiment }: { experiment: typeof experimentsData[0] }) => {
    const [ref, isVisible] = useAnimateOnScroll({ threshold: 0.1, triggerOnce: true });
    return (
        <div ref={ref} className={`glass-card p-6 rounded-xl transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex justify-between items-start">
                <h3 className="font-poppins text-xl font-bold text-white">{experiment.name}</h3>
                <span className="text-sm font-medium text-indigo-300/80">{experiment.age} y/o</span>
            </div>
            <p className="text-slate-400 mt-2">{experiment.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                {experiment.tags.map(tag => (
                    <span key={tag} className="bg-indigo-900/50 text-indigo-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{tag}</span>
                ))}
            </div>
        </div>
    );
};

const UpcomingExperimentItem = ({ item }: { item: typeof upcomingExperimentsData[0] }) => {
     const [ref, isVisible] = useAnimateOnScroll({ threshold: 0.5, triggerOnce: true });
    return (
        <div ref={ref} className={`relative pl-8 transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="absolute left-0 top-1 h-4 w-4 rounded-full bg-indigo-500 shadow-[0_0_10px_theme(colors.indigo.500)]"></div>
            <h3 className="font-poppins text-xl font-bold text-white">{item.name}</h3>
            <p className="text-slate-400 mt-1">{item.description}</p>
        </div>
    );
};

const ExperimentsPage = () => {
    return (
        <div className="pt-8 pb-20 px-4">
            <div className="container mx-auto max-w-7xl">
                <header className="text-center">
                    <h1 className="font-poppins text-5xl md:text-7xl font-extrabold text-white text-glow">My Experiments Lab</h1>
                    <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">Where I test random ideas, tools, and AI.</p>
                </header>
                
                <div className="my-12 border-b-2 border-indigo-500/30"></div>

                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {experimentsData.map(exp => <ExperimentCard key={exp.name} experiment={exp} />)}
                    </div>
                </section>

                <section className="mt-20">
                    <header className="text-center">
                        <h2 className="font-poppins text-4xl font-bold text-white text-glow">Upcoming Experiments</h2>
                        <p className="mt-2 text-slate-400">Next, I’m exploring...</p>
                    </header>
                    <div className="mt-12 max-w-2xl mx-auto space-y-8 relative">
                         <div className="absolute left-[7px] top-0 h-full w-0.5 bg-slate-700"></div>
                        {upcomingExperimentsData.map(item => <UpcomingExperimentItem key={item.name} item={item} />)}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ExperimentsPage;