import React from 'react';
import { ZapIcon, MapIcon, LibraryIcon, NewspaperIcon, LinkIcon, ChatIcon, HomeIcon } from './Icons';
import { useLanguage } from '../i18n';

type Tab = 'home' | 'atlas' | 'repository' | 'news' | 'ai' | 'links';

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { language, setLanguage, t } = useLanguage();

  const tabs = [
    { id: 'home', label: t('tabs.home'), icon: HomeIcon },
    { id: 'atlas', label: t('tabs.atlas'), icon: MapIcon },
    { id: 'repository', label: t('tabs.repository'), icon: LibraryIcon },
    { id: 'news', label: t('tabs.news'), icon: NewspaperIcon },
    { id: 'ai', label: t('tabs.ai'), icon: ChatIcon },
    { id: 'links', label: t('tabs.links'), icon: LinkIcon },
  ];

  return (
    <header className="bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 min-h-24 py-4">
          <div className="flex items-center">
            <ZapIcon className="h-10 w-10 text-cyan-400 flex-shrink-0" />
            <div className="ml-4">
              <h1 className="text-xl sm:text-5xl font-bold text-white tracking-tight">
                OIRSE
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">
                {t('header.subtitleLine1')}
              </p>
              <p className="text-xs text-gray-400 hidden sm:block">
                {t('header.subtitleLine2')}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-end gap-4">
            <div className="hidden md:flex items-center justify-end gap-x-6 min-w-0 overflow-hidden">
              <a href="https://www.centroenlace.org/" target="_blank" rel="noopener noreferrer" title="Enlace - Centro para el Desarrollo Energético Sostenible">
                <img
                  src="https://res.cloudinary.com/dnh5bxvvy/image/upload/v1762958770/enlacelogo_cio5ge.png"
                  alt="Enlace Logo"
                  className="h-9 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>
              <a href="https://uchile.cl/" target="_blank" rel="noopener noreferrer" title="Universidad de Chile">
                <img
                  src="https://res.cloudinary.com/dnh5bxvvy/image/upload/v1751649356/escudo-uchile-horizontal-color_bl-fondo-transp_ebnvfq.png"
                  alt="Universidad de Chile Logo"
                  className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>
              <a href="https://eie.pucv.cl/" target="_blank" rel="noopener noreferrer" title="Escuela de Ingenieria Electrica - PUCV">
                <img
                  src="https://res.cloudinary.com/dnh5bxvvy/image/upload/v1751648586/ESCUELA_DE_INGENIER%C3%8DA_EL%C3%89CTRICA_blanco_d6oj7o.png"
                  alt="Departamento de Ingeniería Eléctrica Logo"
                  className="h-8 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>
              <a href="https://isci.cl" target="_blank" rel="noopener noreferrer" title="Instituto de Sistemas Complejos de Ingeniería">
                <img
                  src="https://res.cloudinary.com/dnh5bxvvy/image/upload/v1751649019/Logo-ISCI_eacof4.png"
                  alt="ISCI Logo"
                  className="h-9 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
              </a>
            </div>
            <div className="flex items-center rounded-full border border-gray-700 bg-gray-900/60 p-1 flex-shrink-0 relative z-10">
              <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${language === 'es' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                aria-label={t('language.switchToEs')}
                type="button"
              >
                {t('language.es')}
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${language === 'en' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:text-white'
                  }`}
                aria-label={t('language.switchToEn')}
                type="button"
              >
                {t('language.en')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800/50">
        <div className="flex items-center -mb-px overflow-x-auto md:justify-center hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex-shrink-0 whitespace-nowrap flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-300 ${activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-white'
                }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
       `}</style>
    </header>
  );
};
