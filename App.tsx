import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { InteractiveMap } from './components/InteractiveMap';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AcademicRepository } from './components/AcademicRepository';
import { ConversationalAI } from './components/ConversationalAI';
import { communitiesData } from './data/communities';
import { EnergyCommunity } from './types';
import { LinksSection } from './components/LinksSection';
import { LegislativeMonitor } from './components/LegislativeMonitor';
import { RegistrationWizard } from './components/RegistrationWizard';
import { Members } from './components/Members';
import { News } from './components/News';

export type Tab = 'home' | 'atlas' | 'legislation' | 'catastro' | 'repository' | 'ai' | 'links' | 'members' | 'news';

const App: React.FC = () => {
  const [selectedCommunity, setSelectedCommunity] = useState<EnergyCommunity | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleSelectCommunity = (community: EnergyCommunity) => {
    setSelectedCommunity(community);
  };

  const handleCloseModal = () => {
    setSelectedCommunity(null);
  };

  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country);
    // When a country is selected from the globe in Home, switch to the atlas
    setActiveTab('atlas');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        // Wait, Home previously only had setActiveTab, but let's change Home to take it from Context or we can just decouple it via Globe.
        // Actually earlier we saw Home defines its own handleCountrySelect. Let's make Home receive it.
        // But since Home doesn't accept onSelectCountry as prop right now, we can just edit Home.tsx later or now.
        // To avoid compilation errors, I'll update Home.tsx later if necessary, but actually Home.tsx just does setActiveTab('atlas') 
        // I need to update Home.tsx to receive `handleSelectCountry`
        return <Home setActiveTab={setActiveTab} onSelectCountry={handleSelectCountry} />;
      case 'atlas':
        return (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col">
            <InteractiveMap 
                communities={communitiesData} 
                onSelectCommunity={handleSelectCommunity} 
                initialCountry={selectedCountry}
            />
          </div>
        );
      case 'repository':
        return <AcademicRepository />;
      case 'legislation':
        return <LegislativeMonitor />;
      case 'catastro':
        return <RegistrationWizard />;
      case 'ai':
        return <ConversationalAI />;
      case 'links':
        return <LinksSection />;
      case 'members':
        return <Members />;
      case 'news':
        return <News />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans flex flex-col">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow flex flex-col">
        {renderContent()}
      </main>
      <Footer />
      <ProjectDetailModal project={selectedCommunity} onClose={handleCloseModal} />
    </div>
  );
};

export default App;