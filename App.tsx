import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { InteractiveMap } from './components/InteractiveMap';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AcademicRepository } from './components/AcademicRepository';
import { NewsFeed } from './components/NewsFeed';
import { projects } from './data/projects';
import { Project } from './types';
import { LinksSection } from './components/LinksSection';
import { ConversationalAI } from './components/ConversationalAI';

type Tab = 'home' | 'atlas' | 'repository' | 'news' | 'ai' | 'links';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'atlas':
        return (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col">
            <InteractiveMap projects={projects} onSelectProject={handleSelectProject} />
          </div>
        );
      case 'repository':
        return <AcademicRepository />;
      case 'news':
        return <NewsFeed />;
      case 'ai':
        return <ConversationalAI />;
      case 'links':
        return <LinksSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 font-sans flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow flex flex-col">
        {renderContent()}
      </main>
      <Footer />
      <ProjectDetailModal project={selectedProject} onClose={handleCloseModal} />
    </div>
  );
};

export default App;