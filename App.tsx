
import React, { useState } from 'react';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ProjectsPage from './pages/Projects';
import SkillsPage from './pages/Skills';
import ExperimentsPage from './pages/Experiments';
import ContactPage from './pages/Contact';
import AiPage from './pages/AiPage';
import Sidebar from './components/Sidebar';
import PageWrapper from './components/PageWrapper';
import Header from './components/Header';
import PageParticles from './components/PageParticles';

const App = () => {
    const [page, setPage] = useState('home');
    const [initialSearchTerm, setInitialSearchTerm] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const handleNavigateWithFilter = (term: string) => {
        setInitialSearchTerm(term);
        setPage('projects');
        setIsMobileMenuOpen(false);
    };

    const handleSetPage = (newPage: string) => {
        setInitialSearchTerm(''); // Clear term on normal navigation
        setPage(newPage);
        setIsMobileMenuOpen(false);
    };

    const renderPage = () => {
        switch (page) {
            case 'home':
                return <HomePage setPage={handleSetPage} navigateWithFilter={handleNavigateWithFilter} />;
            case 'about':
                return <AboutPage setPage={handleSetPage} navigateWithFilter={handleNavigateWithFilter} />;
            case 'projects':
                return <ProjectsPage initialSearchTerm={initialSearchTerm} />;
            case 'skills':
                return <SkillsPage />;
            case 'experiments':
                return <ExperimentsPage />;
            case 'ai':
                return <AiPage />;
            case 'contact':
                return <ContactPage setPage={handleSetPage} />;
            default:
                return <HomePage setPage={handleSetPage} navigateWithFilter={handleNavigateWithFilter} />;
        }
    }

    return (
        <div className="text-slate-300">
            {/* Particles in the background. Keyed to page to re-trigger on navigation. */}
            <PageParticles key={page} />

            {/* Header for mobile */}
            <Header 
                currentPage={page}
                isMobileMenuOpen={isMobileMenuOpen}
                onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                setPage={handleSetPage}
            />

            <Sidebar 
                currentPage={page} 
                setPage={handleSetPage}
            />

            <main className="relative z-10 pt-20 md:pt-0 md:pl-20 lg:pl-56">
                <PageWrapper key={page}>
                    {renderPage()}
                </PageWrapper>
            </main>
        </div>
    );
};

export default App;
