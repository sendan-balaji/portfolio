
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

interface HeaderProps {
    currentPage: string;
    isMobileMenuOpen: boolean;
    onToggleMenu: () => void;
    setPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, isMobileMenuOpen, onToggleMenu, setPage }) => {
    return (
        <>
            <header className="md:hidden fixed top-0 left-0 right-0 h-20 px-6 flex justify-between items-center bg-slate-950/80 backdrop-blur-sm z-40 border-b border-slate-800/50">
                <button onClick={() => setPage('home')} className="flex items-center group" aria-label="Go to Home page">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-poppins text-xl font-bold text-white shadow-lg shadow-indigo-600/30 transition-transform duration-300 group-hover:scale-110 active:scale-95">
                        S
                    </div>
                </button>
                <button
                    onClick={onToggleMenu}
                    className="p-2 rounded-md text-slate-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    aria-controls="mobile-menu"
                    aria-expanded={isMobileMenuOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    {isMobileMenuOpen ? (
                        <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
            </header>
            
            {isMobileMenuOpen && (
                <nav id="mobile-menu" className="md:hidden fixed top-20 left-0 right-0 bg-slate-950/95 backdrop-blur-sm border-b border-slate-800 animate-menu-fade-down z-30">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        {navLinks.map((link) => (
                            <button
                                key={link.page}
                                onClick={() => setPage(link.page)}
                                className={`
                                    w-full flex items-center px-4 py-3 rounded-lg text-left font-semibold
                                    transition-colors duration-200
                                    ${currentPage === link.page
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                    }
                                `}
                            >
                                {link.icon}
                                <span className="ml-4">{link.label}</span>
                            </button>
                        ))}
                    </div>
                </nav>
            )}
        </>
    );
};

export default Header;