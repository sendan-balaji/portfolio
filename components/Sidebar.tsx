
import React from 'react';

const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

const AboutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

const ProjectsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
    </svg>
);

const SkillsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
    </svg>
);

const ExperimentsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4.5 3h15"></path>
        <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"></path>
        <path d="M6 14h12"></path>
    </svg>
);

const AiIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
    </svg>
);

const ContactIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </svg>
);


const navLinks = [
    { page: 'home', label: 'Home', icon: <HomeIcon /> },
    { page: 'about', label: 'About', icon: <AboutIcon /> },
    { page: 'projects', label: 'Projects', icon: <ProjectsIcon /> },
    { page: 'skills', label: 'Skills', icon: <SkillsIcon /> },
    { page: 'experiments', label: 'Experiments', icon: <ExperimentsIcon /> },
    { page: 'ai', label: 'AI', icon: <AiIcon /> },
    { page: 'contact', label: 'Contact', icon: <ContactIcon /> },
];

interface SidebarProps {
    currentPage: string;
    setPage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setPage }) => {

    return (
        <aside
            className={`
                hidden md:flex flex-col fixed top-0 left-0 h-screen bg-gradient-to-b from-indigo-950 via-slate-950 to-slate-950 
                text-slate-400 shadow-[5px_0_25px_-5px_rgba(79,70,229,0.2)] z-40 
                transition-all duration-300 ease-in-out
                md:w-20 lg:w-56
            `}
            id="sidebar"
        >
            <div className="flex items-center h-20 shrink-0 md:justify-center lg:justify-start lg:px-4">
                <button
                    onClick={() => setPage('home')}
                    className="flex items-center group"
                    aria-label="Go to Home"
                >
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-poppins text-xl font-bold text-white transition-all duration-300 group-hover:bg-indigo-500 group-hover:scale-110 shadow-lg shadow-indigo-600/30">
                        S
                    </div>
                    <span className="font-poppins text-xl font-bold text-white whitespace-nowrap hidden lg:inline ml-4">
                        Sendan
                    </span>
                </button>
            </div>

            <nav className="flex flex-col w-full mt-4 space-y-4 md:items-center lg:items-start lg:px-4">
                {navLinks.map((link) => (
                    <button
                        key={link.page}
                        onClick={() => setPage(link.page)}
                        className={`
                            flex items-center h-12 rounded-lg transition-colors duration-200
                            md:w-12 md:justify-center lg:w-full lg:justify-start lg:px-4
                            ${currentPage === link.page
                                ? 'bg-indigo-600 text-white shadow-[0_0_15px_theme(colors.indigo.500)]'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                            }
                        `}
                        aria-label={link.label}
                    >
                        {link.icon}
                        <span className="font-semibold text-sm whitespace-nowrap hidden lg:inline ml-4">
                            {link.label}
                        </span>
                    </button>
                ))}
            </nav>


        </aside>
    );
};

export default Sidebar;
