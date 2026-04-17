import React, { useState, useEffect, Suspense, lazy } from 'react';
import { LegislationItem, legislationData } from '../data/legislation';
import { MapIcon, ScaleIcon, BookOpenIcon, UsersIcon, BriefcaseIcon, NewspaperIcon } from './Icons';
import { academicPublications } from '../data/research';
import { communitiesData } from '../data/communities';
import { newsData } from '../data/news';
import { useLanguage } from '../i18n';

const GlobeComponent = lazy(() => import('./Globe'));

type Tab = 'home' | 'atlas' | 'legislation' | 'catastro' | 'repository' | 'ai' | 'links' | 'members' | 'news';

interface HomeProps {
    setActiveTab: (tab: Tab) => void;
    onSelectCountry?: (country: string) => void;
}

/* Unified editorial marquee — three lanes, one surface */
const EditorialTicker: React.FC<{ setActiveTab: (tab: Tab) => void }> = ({ setActiveTab }) => {
    const [laws, setLaws] = useState<LegislationItem[]>([]);
    useEffect(() => { setLaws(legislationData); }, []);

    const Lane: React.FC<{
        label: string;
        items: React.ReactNode[];
        duration: number;
        onClick: () => void;
        accent: string;
    }> = ({ label, items, duration, onClick, accent }) => (
        <div
            onClick={onClick}
            className="group relative py-3 cursor-pointer overflow-hidden"
        >
            <div className="absolute left-0 top-0 bottom-0 z-20 pl-6 pr-4 flex items-center bg-gradient-to-r from-ivory-50 via-ivory-50 to-transparent">
                <span className={`ui-label text-[10px] font-semibold uppercase tracking-[0.2em] ${accent}`}>{label}</span>
            </div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-ivory-50 to-transparent z-10 pointer-events-none"></div>
            <div className="whitespace-nowrap flex items-center will-change-transform" style={{ animation: `marquee-e ${duration}s linear infinite` }}>
                {[...items, ...items].map((node, i) => (
                    <span key={i} className="mx-8 text-[13px] text-ink/70 group-hover:text-moss-900 transition-colors flex items-center font-sans">
                        {node}
                    </span>
                ))}
            </div>
        </div>
    );

    return (
        <div className="border-y hairline bg-ivory-50">
            <Lane
                label="Legislación"
                duration={55}
                accent="text-moss-700"
                onClick={() => setActiveTab('legislation')}
                items={laws.map((item, i) => (
                    <span key={`l-${i}`} className="flex items-center gap-3">
                        <span className="font-display text-[16px] text-moss-500 tracking-wider font-semibold">{item.country}</span>
                        <span className="text-ink/50">—</span>
                        <span className="font-display text-[14px]">{item.title}</span>
                    </span>
                ))}
            />
            <div className="border-t hairline"></div>
            <Lane
                label="Noticias"
                duration={70}
                accent="text-copper-500"
                onClick={() => setActiveTab('news')}
                items={newsData.map((item, i) => (
                    <span key={`n-${i}`} className="flex items-center gap-3">
                        <NewspaperIcon className="h-3.5 w-3.5 text-moss-500" />
                        {item.country && <span className="font-display  text-[16px] text-moss-700 tracking-wider font-semibold">{item.country}</span>}
                        <span className="font-display text-[14px]">{item.title}</span>
                    </span>
                ))}
            />
            <div className="border-t hairline"></div>
            <Lane
                label="Investigación"
                duration={85}
                accent="text-moss-500"
                onClick={() => setActiveTab('repository')}
                items={academicPublications.map((p, i) => (
                    <span key={`p-${i}`} className="flex items-center gap-3">
                        <BookOpenIcon className="h-3.5 w-3.5 text-moss-500" />
                        <span className="font-display text-[14px]">{p.title}</span>
                    </span>
                ))}
            />
            <style>{`
                @keyframes marquee-e {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
};

export const Home: React.FC<HomeProps> = ({ setActiveTab, onSelectCountry }) => {
    const { t } = useLanguage();

    const uniqueCountries = new Set(communitiesData.flatMap(c => c.countries));
    const totalMembers = communitiesData.reduce((sum, c) => sum + (c.dimensionGO.membersCount || 0), 0);

    const sections = [
        { num: '01', title: t('home.section.atlas.title'),       description: t('home.section.atlas.desc'),       icon: MapIcon,       tab: 'atlas' as Tab },
        { num: '02', title: t('home.section.legislation.title'), description: t('home.section.legislation.desc'), icon: ScaleIcon,     tab: 'legislation' as Tab },
        { num: '03', title: t('home.section.catastro.title'),    description: t('home.section.catastro.desc'),    icon: BriefcaseIcon, tab: 'catastro' as Tab },
        { num: '04', title: t('home.section.members.title'),     description: t('home.section.members.desc'),     icon: UsersIcon,     tab: 'members' as Tab },
    ];

    const handleCountrySelect = (countryName: string) => {
        if (onSelectCountry) onSelectCountry(countryName);
        else setActiveTab('atlas');
    };

    return (
        <div className="flex-grow flex flex-col bg-ivory-50">

            {/* Hero — globe as ambient backdrop, no frame */}
            <section className="relative overflow-hidden">
                {/* Ambient globe layer — offset right so globe dominates the right half */}
                <div
                    className="pointer-events-auto absolute globe-blend opacity-[0.95]"
                    aria-hidden="false"
                    style={{ top: 0, bottom: 0, left: '15%', right: '-15%' }}
                >
                    <Suspense fallback={null}>
                        <GlobeComponent onSelectCountry={handleCountrySelect} />
                    </Suspense>
                </div>
                {/* Left-to-center soft ivory wash to lift the copy */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'linear-gradient(90deg, rgba(251,248,242,0.97) 0%, rgba(251,248,242,0.92) 25%, rgba(251,248,242,0.55) 45%, rgba(251,248,242,0.15) 62%, rgba(251,248,242,0) 75%)',
                    }}
                />

                <div className="relative container mx-auto px-6 sm:px-8 lg:px-12 pt-8 sm:pt-10 lg:pt-14 pb-8 sm:pb-12 lg:pb-14 pointer-events-none">
                    <div className="grid grid-cols-1 lg:grid-cols-12">
                        <div className="lg:col-span-7 xl:col-span-6 relative z-10">
                            <div className="flex items-center gap-3 mb-8">
                                <span className="w-8 h-px bg-moss-900"></span>
                                <span className="ui-label text-[10px] font-semibold uppercase tracking-[0.32em] text-moss-700">
                                    {t('home.badge')}
                                </span>
                            </div>

                            <h1 className="text-[44px] sm:text-[64px] md:text-[76px] lg:text-[88px] xl:text-[104px] text-ink text-balance">
                                {t('home.hero.line1')}<br />
                                <span className="italic text-moss-800">{t('home.hero.line2')}</span><br />
                                <span className="text-copper-500">{t('home.hero.line3')}</span>
                            </h1>

                            <p
                                className="mt-6 sm:mt-8 text-[15px] sm:text-[17px] leading-[1.65] text-ink/70 max-w-xl text-pretty"
                                dangerouslySetInnerHTML={{
                                    __html: t('home.hero.subtitle').replace(
                                        '<strong>',
                                        '<strong class="text-ink font-semibold">'
                                    ),
                                }}
                            />

                            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 pointer-events-auto">
                                <button
                                    onClick={() => setActiveTab('atlas')}
                                    className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-moss-900 text-ivory-50 text-sm font-semibold rounded-full hover:bg-ink transition-all"
                                >
                                    {t('home.hero.cta1')}
                                    <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('repository')}
                                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-ivory-50/80 backdrop-blur text-ink text-sm font-semibold rounded-full border hairline-strong hover:border-ink transition-all"
                                >
                                    {t('home.hero.cta2')}
                                </button>
                            </div>

                            {/* Globe hint */}
                            <div className="mt-6 inline-flex items-center gap-2 text-[12px] text-ink/55 ui-label pointer-events-auto">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full rounded-full bg-copper-400 opacity-75 animate-ping"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-copper-500"></span>
                                </span>
                                {t('home.globe.hint')}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <EditorialTicker setActiveTab={setActiveTab} />

            {/* Stats — editorial figures */}
            <section className="border-b hairline">
                <div className="container mx-auto px-6 sm:px-8 lg:px-12 py-14 lg:py-20">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
                        {[
                            { value: String(communitiesData.length).padStart(2, '0'), label: t('home.stats.communities'), accent: 'text-ink' },
                            { value: String(uniqueCountries.size).padStart(2, '0'), label: t('home.stats.countries'),   accent: 'text-moss-900' },
                            { value: '4D',                                           label: t('home.stats.taxonomy'),    accent: 'text-copper-500' },
                            { value: `${(totalMembers / 1000).toFixed(0)}K+`,         label: t('home.stats.participants'), accent: 'text-moss-800' },
                        ].map((s, i) => (
                            <div key={i} className="group">
                                <div className={`font-display text-[72px] lg:text-[96px] leading-none tracking-display ${s.accent}`}>
                                    {s.value}
                                </div>
                                <div className="mt-3 pt-3 border-t hairline text-[11px] font-semibold uppercase tracking-[0.24em] text-ink/55">
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tools — editorial numbered blocks */}
            <section className="py-20 lg:py-28">
                <div className="container mx-auto px-6 sm:px-8 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-14">
                        <div className="lg:col-span-7">
                            <div className="flex items-center gap-3 mb-5">
                                <span className="w-8 h-px bg-moss-900"></span>
                                <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-moss-700">
                                    Plataforma
                                </span>
                            </div>
                            <h2 className="font-display text-[44px] sm:text-[56px] leading-[1] tracking-display text-ink text-balance">
                                {t('home.tools.title')}
                            </h2>
                        </div>
                        <div className="lg:col-span-4 lg:col-start-9 flex items-end">
                            <p className="text-[15px] leading-relaxed text-ink/65 text-pretty">
                                {t('home.tools.subtitle')}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 border-t hairline">
                        {sections.map((section, idx) => (
                            <button
                                key={section.tab}
                                onClick={() => setActiveTab(section.tab)}
                                className={`group relative text-left p-8 lg:p-10 border-b hairline transition-all hover:bg-ivory-100 ${
                                    idx % 2 === 0 ? 'md:border-r hairline' : ''
                                }`}
                            >
                                <div className="flex items-start justify-between gap-6 mb-6">
                                    <span className="font-mono text-[11px] tracking-[0.2em] text-ink/40">
                                        {section.num} / 04
                                    </span>
                                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border hairline text-ink/50 group-hover:text-copper-500 group-hover:border-copper-400 transition-all">
                                        <section.icon className="h-4 w-4" />
                                    </span>
                                </div>
                                <h3 className="font-display text-[32px] lg:text-[38px] leading-[1.05] tracking-display text-ink mb-3 text-balance">
                                    {section.title}
                                </h3>
                                <p className="text-[14px] leading-relaxed text-ink/65 max-w-md text-pretty">
                                    {section.description}
                                </p>
                                <div className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink/40 group-hover:text-moss-900 transition-colors">
                                    {t('home.tools.access')}
                                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* About RIPCEL — dark editorial block */}
            <section className="relative bg-moss-900 text-ivory-100 overflow-hidden">
                <div
                    className="absolute inset-0 opacity-[0.08] pointer-events-none"
                    style={{
                        backgroundImage:
                            'radial-gradient(800px 400px at 90% 10%, rgba(226,166,120,0.9), transparent 55%), radial-gradient(700px 500px at 0% 90%, rgba(168,188,172,0.35), transparent 60%)',
                    }}
                />
                <div className="relative container mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-7">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-8 h-px bg-copper-400"></span>
                                <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-copper-300">
                                    {t('home.about.label')}
                                </span>
                            </div>
                            <h2 className="font-display text-[44px] sm:text-[60px] lg:text-[72px] leading-[0.98] tracking-display text-ivory-50 mb-8 text-balance">
                                <span className="font-italic-display">{t('home.about.title')}</span>
                            </h2>
                            <p className="text-[16px] lg:text-[17px] leading-[1.7] text-ivory-100/75 max-w-2xl text-pretty">
                                {t('home.about.text')}
                            </p>
                        </div>
                        <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-4 justify-end">
                            <div className="p-6 rounded-2xl border border-ivory-100/15 bg-ivory-100/5 backdrop-blur-sm">
                                <div className="font-display text-[64px] leading-none text-copper-300">15</div>
                                <div className="mt-3 pt-3 border-t border-ivory-100/10 text-[10px] font-semibold uppercase tracking-[0.3em] text-ivory-100/60">
                                    {t('home.about.countriesLabel')}
                                </div>
                            </div>
                            <div className="p-6 rounded-2xl border border-ivory-100/15 bg-ivory-100/5 backdrop-blur-sm">
                                <div className="font-display text-[64px] leading-none text-moss-100">06</div>
                                <div className="mt-3 pt-3 border-t border-ivory-100/10 text-[10px] font-semibold uppercase tracking-[0.3em] text-ivory-100/60">
                                    {t('home.about.dimensionsLabel')}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
