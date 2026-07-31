import React, { useState, useEffect } from 'react';
import { Header, Tab } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { InteractiveMap } from './components/InteractiveMap';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { AcademicRepository } from './components/AcademicRepository';
import { ConversationalAI } from './components/ConversationalAI';
import { communitiesData } from './data/communities';
import { EnergyCommunity, Region } from './types';
import { LinksSection } from './components/LinksSection';
import { LegislativeMonitor } from './components/LegislativeMonitor';
import { RegistrationWizard } from './components/RegistrationWizard';
import { Members } from './components/Members';
import { News } from './components/News';
import { AdminDashboard } from './components/AdminDashboard';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { InstitutionsCarousel } from './components/InstitutionsCarousel';

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
          
          let lng = 0;
          let lat = 0;
          if (data.location) {
            lat = Number(data.location.lat) || 0;
            lng = Number(data.location.lng) || 0;
          }
          
          let region: Region = 'South America';
          const countryName = data.country || '';
          if (['España', 'Portugal'].includes(countryName)) {
            region = 'Europe';
          } else if (['México', 'Costa Rica', 'Honduras', 'Guatemala', 'El Salvador', 'Nicaragua', 'Panamá'].includes(countryName)) {
            region = 'Central & North America';
          } else if (['Cuba', 'República Dominicana', 'Puerto Rico'].includes(countryName)) {
            region = 'Asia';
          }
          
          return {
            id: doc.id,
            name: data.name || '',
            region: region,
            countries: [countryName],
            summary: data.description || '',
            mapCoordinates: [lng, lat],
            status: data.status || 'activa',
            dimensionTE: {
              technology: data.dimensionTechnology?.techTypes?.join(', ') || 'Solar PV',
              capacityMW: data.dimensionTechnology?.scaleKw ? (Number(data.dimensionTechnology.scaleKw) / 1000) : 0,
              description: data.dimensionTechnology?.digitalization || data.description || '',
              tisScore: [5, 4, 4, 3, 4, 4, 3]
            },
            dimensionGO: {
              model: data.dimensionGovernance?.legalForm || 'Cooperativa',
              membersCount: data.dimensionGovernance?.membersCount ? Number(data.dimensionGovernance.membersCount) : 0,
              description: data.dimensionGovernance?.decisionMechanism || '',
              ostromChecklist: [
                data.dimensionGovernance?.ostromPrinciples?.dp1 || false,
                data.dimensionGovernance?.ostromPrinciples?.dp2 || false,
                data.dimensionGovernance?.ostromPrinciples?.dp3 || false,
                data.dimensionGovernance?.ostromPrinciples?.dp4 || false,
                data.dimensionGovernance?.ostromPrinciples?.dp5 || false,
                data.dimensionGovernance?.ostromPrinciples?.dp6 || false,
                data.dimensionGovernance?.ostromPrinciples?.dp7 || false,
                data.dimensionGovernance?.ostromPrinciples?.dp8 || false,
              ]
            },
            dimensionRF: {
              legalStatus: data.dimensionRegulatoryFinancial?.legalFramework || 'Regulado',
              financingMechanism: data.dimensionRegulatoryFinancial?.financingMechanism?.join(', ') || '',
              description: data.dimensionRegulatoryFinancial?.incentives || '',
              isRegulatoryDivideAffected: false,
              regulatoryNotes: data.dimensionRegulatoryFinancial?.compensationRegime || ''
            },
            dimensionAS: {
              localImpact: data.dimensionSocialAppropriation?.distributiveJustice || '',
              description: data.dimensionSocialAppropriation?.empowermentOutcomes || '',
              emancipationLevel: 4
            }
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
      <InstitutionsCarousel />
      <Footer />
      <ProjectDetailModal project={selectedCommunity} onClose={handleCloseModal} />
    </div>
  );
};

export default App;