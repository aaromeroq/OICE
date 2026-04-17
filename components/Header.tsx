import React, { useEffect, useState } from 'react';
import { MapIcon, LibraryIcon, BookOpenIcon, BriefcaseIcon, LinkIcon, ChatIcon, HomeIcon, UsersIcon, NewspaperIcon } from './Icons';
import { TransparentLogo } from './TransparentLogo';
import { useLanguage } from '../i18n';

type Tab = 'home' | 'atlas' | 'legislation' | 'catastro' | 'repository' | 'ai' | 'links' | 'members' | 'news';

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const tabs = [
    { id: 'home', label: t('tabs.home'), icon: HomeIcon },
    { id: 'atlas', label: t('tabs.atlas'), icon: MapIcon },
    { id: 'legislation', label: t('tabs.legislation'), icon: BookOpenIcon },
    { id: 'catastro', label: t('tabs.catastro'), icon: BriefcaseIcon },
    { id: 'repository', label: t('tabs.repository'), icon: LibraryIcon },
    { id: 'ai', label: t('tabs.ai'), icon: ChatIcon },
    { id: 'news', label: t('tabs.news'), icon: NewspaperIcon },
    { id: 'members', label: t('tabs.members'), icon: UsersIcon },
    { id: 'links', label: t('tabs.links'), icon: LinkIcon },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ivory-50/85 backdrop-blur-md border-b hairline shadow-[0_1px_0_rgba(20,24,26,0.04)]'
          : 'bg-ivory-50/60 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      {/* Top bar */}
      <div className="container mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Wordmark */}
          <button
            type="button"
            onClick={() => setActiveTab('home')}
            className="group flex items-baseline gap-3 focus:outline-none"
          >
            <span className="relative inline-block">
              <span className="font-display text-[34px] leading-none tracking-display text-moss-900">
                oice
              </span>
              <span className="absolute -top-1 -right-2 w-1.5 h-1.5 rounded-full bg-copper-500"></span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-2 pl-3 border-l hairline">
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-moss-700/70">
                {t('header.subtitle')}
              </span>
            </span>
          </button>

          <div className="flex items-center gap-5">
            <div className="hidden xl:flex items-center gap-3 text-right">
              <TransparentLogo src="/RIPCEL.png" alt="RIPCEL" className="h-8 object-contain" />
              <span className="w-px h-6 bg-ink/10"></span>
              <TransparentLogo src="/CYTED.png" alt="CYTED" className="h-8 object-contain" />
            </div>

            {/* Language toggle */}
            <div className="flex items-center gap-0.5 rounded-full border hairline bg-white/70 p-0.5">
              {(['es', 'en'] as const).map((lng) => (
                <button
                  key={lng}
                  onClick={() => setLanguage(lng)}
                  className={`px-3 py-1 text-[11px] font-semibold rounded-full transition-all ${
                    language === lng
                      ? 'bg-moss-900 text-ivory-50'
                      : 'text-moss-700/70 hover:text-moss-900'
                  }`}
                  type="button"
                  aria-label={t(lng === 'es' ? 'language.switchToEs' : 'language.switchToEn')}
                >
                  {t(lng === 'es' ? 'language.es' : 'language.en')}
                </button>
              ))}
            </div>

            {/* Hamburger — shown below xl (so 9-tab nav never needs horizontal scroll) */}
            <button
              className="xl:hidden text-moss-800 p-1 -mr-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop nav — only at xl+ where all 9 tabs fit without scroll */}
      <nav className="hidden xl:block border-t hairline">
        <div className="container mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-11">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as Tab)}
                  className={`group relative flex items-center gap-1.5 px-2 h-full text-[13px] transition-colors whitespace-nowrap ${
                    active ? 'text-moss-900' : 'text-ink/55 hover:text-moss-900'
                  }`}
                  type="button"
                >
                  <tab.icon className={`h-3.5 w-3.5 ${active ? 'text-copper-500' : 'text-ink/40 group-hover:text-copper-500'}`} />
                  <span className={active ? 'font-semibold' : 'font-medium'}>{tab.label}</span>
                  <span
                    className={`absolute left-2 right-2 -bottom-px h-[2px] transition-all ${
                      active ? 'bg-moss-900' : 'bg-transparent group-hover:bg-ink/20'
                    }`}
                  ></span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile / tablet nav */}
      {mobileOpen && (
        <div className="xl:hidden bg-ivory-50 border-t hairline">
          <div className="container mx-auto px-4 py-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as Tab); setMobileOpen(false); }}
                className={`flex items-center gap-3 w-full px-3 py-3 text-sm rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-moss-900 text-ivory-50 font-semibold'
                    : 'text-ink/70 hover:bg-ivory-100 font-medium'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
