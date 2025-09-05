import React, { useState, useEffect, useMemo } from 'react';
import { useAnimateOnScroll } from '../hooks/useAnimateOnScroll';
import { supabase } from '../supabaseClient'; // This import path is now correct for your structure

const categories = ['All', 'Featured', 'Mini Projects', 'AI Experiments', 'Upcoming'];
const ages = [11, 12, 12.5, 13, 13.5, 14];

const ProjectCard = ({ project }: { project: any }) => {
    const [ref, isVisible] = useAnimateOnScroll({ threshold: 0.1, triggerOnce: true });

    const isUpcoming = project.category === 'Upcoming';

    return (
        <div ref={ref} className={`card-glow rounded-xl p-6 text-left flex flex-col transition-all duration-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${isUpcoming ? 'border-dashed border-indigo-400/50' : ''}`}>
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="font-poppins text-xl font-bold text-white">{project.title}</h3>
                    <span className="text-sm font-medium text-indigo-300/80">{`Age ${project.age} – ${project.year}`}</span>
                </div>
                {isUpcoming && <p className="text-indigo-400 font-semibold mt-1">🚧 Upcoming Project</p>}
                <p className="text-slate-400 mt-2 min-h-[4rem]">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t: string) => (
                        <span key={t} className="bg-indigo-900/50 text-indigo-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{t}</span>
                    ))}
                </div>
            </div>
            <div className="mt-6 flex gap-4">
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={`w-full text-center py-2 px-4 rounded-md font-semibold transition-all duration-300 ${isUpcoming ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}>
                    {isUpcoming ? 'Coming Soon' : 'View Demo'}
                </a>
                <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className={`w-full text-center py-2 px-4 rounded-md font-semibold transition-all duration-300 ${isUpcoming ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
                    Source Code
                </a>
            </div>
        </div>
    );
}

interface ProjectsPageProps {
    initialSearchTerm?: string;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ initialSearchTerm = '' }) => {
    const [projectsData, setProjectsData] = useState<any[]>([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [activeAge, setActiveAge] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

    useEffect(() => {
        const fetchProjects = async () => {
            const { data, error } = await supabase.from('projects').select('*');
            if (error) {
                console.error("Error fetching projects:", error);
            } else {
                setProjectsData(data || []);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = useMemo(() => {
        return projectsData.filter(p => {
            const categoryMatch = activeCategory === 'All' || p.category === activeCategory;
            const ageMatch = activeAge === null || p.age === activeAge;
            const searchMatch = searchTerm.trim() === '' ||
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.tech.some((t: string) => t.toLowerCase().includes(searchTerm.toLowerCase()));
            return categoryMatch && ageMatch && searchMatch;
        });
    }, [projectsData, activeCategory, activeAge, searchTerm]);

    return (
        <div className="pt-8 pb-20 px-4">
            <div className="container mx-auto max-w-7xl">
                <header className="text-center">
                    <h1 className="font-poppins text-5xl md:text-7xl font-extrabold text-white text-glow">My Projects</h1>
                    <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto">A collection of my work, from early experiments to my latest creations.</p>
                </header>

                <div className="my-12">
                    <div className="max-w-xl mx-auto mb-8">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="block w-full bg-slate-800 border border-slate-700 rounded-full py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                placeholder="Search projects..."
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${activeCategory === cat ? 'filter-btn-active' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center justify-center gap-2 md:gap-6 mt-8">
                        <button onClick={() => setActiveAge(null)} className={`text-sm font-medium transition-colors ${activeAge === null ? 'text-indigo-400' : 'text-slate-400 hover:text-indigo-400'}`}>All Ages</button>
                        <div className="h-px w-12 bg-slate-700"></div>
                        {ages.map(age => (
                            <button
                                key={age}
                                onClick={() => setActiveAge(age)}
                                className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-sm font-semibold rounded-full transition-all duration-300 ${activeAge === age ? 'filter-btn-active' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                            >
                                {age}
                            </button>
                        ))}
                        <div className="h-px w-12 bg-slate-700"></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard key={`${project.title}-${index}`} project={project} />
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="text-center col-span-full mt-16">
                        <p className="text-2xl font-semibold text-slate-400">No projects match the current filters.</p>
                        <p className="text-slate-500 mt-2">Try selecting a different category, age or search term.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ProjectsPage;