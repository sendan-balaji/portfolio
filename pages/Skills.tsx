
import React, { useState } from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';

const coreSkillsData = [
    { name: 'HTML', age: 11.5, confidence: 5, icon: '📄', category: 'Frontend' },
    { name: 'CSS', age: 11.5, confidence: 4, icon: '🎨', category: 'Frontend' },
    { name: 'JavaScript', age: 12.5, confidence: 4, icon: '⚡', category: 'Frontend' },
    { name: 'React', age: 13.5, confidence: 4, icon: '⚛️', category: 'Frontend' },
    { name: 'Tailwind CSS', age: 13.5, confidence: 5, icon: '🌊', category: 'Frontend' },
    { name: 'Python', age: 12.5, confidence: 3, icon: '🐍', category: 'Backend' },
    { name: 'Node.js', age: 0, confidence: 0, icon: '🟢', category: 'Backend', upcoming: true },
];

const toolsData = [
    { name: 'Git & GitHub', description: 'For version control and collaboration.' },
    { name: 'VS Code', description: 'My primary code editor.' },
    { name: 'Tally Web', description: 'My first ever project (Age 11).' },
    { name: 'QR Generator', description: 'A recent mini-project.' },
    { name: 'YouTube Clone', description: 'First major project (Age 12.5).' },
];

const futureGoalsData = [
    { name: 'Web3 Development' },
    { name: 'Advanced AI / AGI' },
    { name: 'Bio-Digital Interfaces' },
    { name: 'Quantum Computing' },
];

const tabs = ['Core Skills', 'Tools & Experiments', 'Future Goals'];

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex justify-center text-xl">
        {[...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? 'text-yellow-400' : 'text-slate-600'}>★</span>
        ))}
    </div>
);

const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
    const [ref, isVisible] = useAnimateOnScroll({ threshold: 0.1, triggerOnce: true });
    return (
        <div ref={ref} className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {children}
        </div>
    );
}

const SkillCard = ({ skill }: { skill: typeof coreSkillsData[0] }) => {
    const isLocked = skill.upcoming;
    return (
        <div className={`card-glow p-6 text-center rounded-xl flex flex-col justify-between ${isLocked ? 'opacity-60 border-dashed' : ''}`}>
            <div>
                <div className="text-4xl">{skill.icon}</div>
                <h3 className="font-poppins text-xl font-bold text-white mt-3">{skill.name}</h3>
                <p className="text-slate-400 text-sm mt-1">
                    {isLocked ? 'Upcoming' : `Started at ${skill.age} y/o`}
                </p>
            </div>
            <div className="mt-4">
                {isLocked ? (
                    <div className="text-4xl text-slate-500">🔒</div>
                ) : (
                    <StarRating rating={skill.confidence} />
                )}
            </div>
        </div>
    );
};

const ToolCard = ({ tool }: { tool: typeof toolsData[0] }) => (
    <div className="card-glow p-6 text-center rounded-xl">
        <h3 className="font-poppins text-xl font-bold text-white">{tool.name}</h3>
        <p className="text-slate-400 mt-2">{tool.description}</p>
    </div>
);

const FutureGoalOrb = ({ goal }: { goal: typeof futureGoalsData[0] }) => (
    <div className="text-center flex flex-col items-center">
        <div className="w-40 h-40 rounded-full border-2 border-indigo-500/50 bg-indigo-900/20 flex items-center justify-center p-4 orb-glow">
            <span className="text-4xl text-slate-400">🔒</span>
        </div>
        <h3 className="font-poppins text-lg font-semibold text-white mt-4">{goal.name}</h3>
    </div>
);

const SkillsPage = () => {
    const [activeTab, setActiveTab] = useState('Core Skills');

    const renderContent = () => {
        switch (activeTab) {
            case 'Core Skills':
                return (
                    <SectionWrapper>
                        <div>
                            <h3 className="font-poppins text-2xl font-semibold text-indigo-300 mb-6">Frontend Development</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                {coreSkillsData.filter(s => s.category === 'Frontend').map(skill => <SkillCard key={skill.name} skill={skill} />)}
                            </div>
                        </div>
                         <div className="mt-12">
                            <h3 className="font-poppins text-2xl font-semibold text-indigo-300 mb-6">Backend Basics</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                                {coreSkillsData.filter(s => s.category === 'Backend').map(skill => <SkillCard key={skill.name} skill={skill} />)}
                            </div>
                        </div>
                    </SectionWrapper>
                );
            case 'Tools & Experiments':
                return (
                    <SectionWrapper>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {toolsData.map(tool => <ToolCard key={tool.name} tool={tool} />)}
                        </div>
                    </SectionWrapper>
                );
            case 'Future Goals':
                 return (
                    <SectionWrapper>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                            {futureGoalsData.map(goal => <FutureGoalOrb key={goal.name} goal={goal} />)}
                        </div>
                    </SectionWrapper>
                );
            default:
                return null;
        }
    };

    return (
        <div className="pt-8 pb-20 px-4">
            <div className="container mx-auto max-w-7xl">
                <header className="text-center">
                    <h1 className="font-poppins text-5xl md:text-7xl font-extrabold text-white text-glow">My Skills</h1>
                    <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">A timeline of my technical abilities and learning journey.</p>
                </header>

                <div className="my-12 flex justify-center">
                    <div className="bg-slate-800/80 border border-slate-700 rounded-full p-1 flex space-x-1">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-3 py-2 sm:px-6 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 border border-transparent ${activeTab === tab ? 'tab-btn-active' : 'text-slate-300 hover:bg-slate-700/50'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-16">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default SkillsPage;