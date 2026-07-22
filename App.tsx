import React, { useState, useEffect } from 'react';
import { Header, Tab } from './components/Header';
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
import { AdminDashboard } from './components/AdminDashboard';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

const App: React.FC = () => {
  const [selectedCommunity, setSelectedCommunity] = useState<EnergyCommunity | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<{
    uid: string;
    name: string;
    email: string;
    role: string;
    approved: boolean;
  } | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [communities, setCommunities] = useState<EnergyCommunity[]>(communitiesData);

  const fetchUserProfile = async (uid: string, email: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserProfile({
          uid,
          name: data.name || 'Investigador',
          email: email || '',
          role: data.role || 'member',
          approved: data.approved || false
        });
      } else {
        setUserProfile({
          uid,
          name: 'Investigador',
          email: email || '',
          role: 'member',
          approved: false
        });
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchUserProfile(user.uid, user.email || '');
      } else {
        setUserProfile(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const q = query(collection(db, 'communities'), where('approved', '==', true));
        const querySnapshot = await getDocs(q);
        const fbCommunities = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            country: data.country,
            location: data.location,
            status: data.status,
            dimensionTechnology: data.dimensionTechnology || null,
            dimensionGovernance: data.dimensionGovernance || null,
            dimensionRegulatoryFinancial: data.dimensionRegulatoryFinancial || null,
            dimensionSocialAppropriation: data.dimensionSocialAppropriation || null,
            dimensionDissemination: data.dimensionDissemination || null,
          } as EnergyCommunity;
        });

        if (fbCommunities.length > 0) {
          const merged = [...communitiesData];
          fbCommunities.forEach(fbC => {
            if (!merged.some(m => m.name.toLowerCase() === fbC.name.toLowerCase())) {
              merged.push(fbC);
            }
          });
          setCommunities(merged);
        }
      } catch (err) {
        console.warn("Could not load communities from Firestore, using offline fallback:", err);
      }
    };

    fetchCommunities();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setActiveTab('home');
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const handleLoginSuccess = () => {
    if (auth.currentUser) {
      fetchUserProfile(auth.currentUser.uid, auth.currentUser.email || '');
    }
  };

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
    if (authLoading) {
      return (
        <div className="flex-grow flex items-center justify-center bg-ivory-50">
          <div className="text-center font-mono text-xs text-ink/50">Cargando perfil...</div>
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} onSelectCountry={handleSelectCountry} />;
      case 'atlas':
        return (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow flex flex-col">
            <InteractiveMap 
                communities={communities} 
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
        return <RegistrationWizard userProfile={userProfile} onLoginSuccess={handleLoginSuccess} />;
      case 'ai':
        return <ConversationalAI />;
      case 'links':
        return <LinksSection />;
      case 'members':
        return <Members />;
      case 'news':
        return <News />;
      case 'admin':
        return userProfile?.role === 'admin' ? <AdminDashboard /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans flex flex-col">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userProfile={userProfile} 
        onLogout={handleLogout} 
      />
      <main className="flex-grow flex flex-col">
        {renderContent()}
      </main>
      <Footer />
      <ProjectDetailModal project={selectedCommunity} onClose={handleCloseModal} />
    </div>
  );
};

export default App;