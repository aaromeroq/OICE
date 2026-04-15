import React, { useState, useEffect } from 'react';
import { Hero } from './Hero';
import { NewsArticle } from '../types';
import { GoogleGenAI } from "@google/genai";
import { MapIcon, LibraryIcon, ChatIcon, LinkIcon, BookOpenIcon } from './Icons';
import { academicPublications } from '../data/research';
import { useLanguage } from '../i18n';

type Tab = 'home' | 'atlas' | 'repository' | 'news' | 'ai' | 'links';

interface HomeProps {
    setActiveTab: (tab: Tab) => void;
}

const NewsTicker: React.FC<{ setActiveTab: (tab: Tab) => void }> = ({ setActiveTab }) => {
    const [articles, setArticles] = useState<NewsArticle[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                if (!process.env.API_KEY) {
                  throw new Error("API key not configured.");
                }
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
                
                const prompt = `Busca los 6 titulares de noticias más recientes y relevantes sobre interconexión eléctrica, energía renovable o política energética en América Latina y el Caribe. Responde únicamente con un array JSON válido de objetos, donde cada objeto tenga solo una clave: "title". El valor de "title" DEBE SER IDÉNTICO al título original.`;

                const response = await ai.models.generateContent({
                   model: "gemini-2.5-flash",
                   contents: prompt,
                   config: { tools: [{googleSearch: {}}] },
                });

                let jsonText = response.text.trim().replace(/^```json|```$/g, '');
                const parsedArticles = JSON.parse(jsonText);
                
                if (Array.isArray(parsedArticles)) {
                    const formattedArticles = parsedArticles.map((item: any, index: number) => ({
                        id: `ticker-${index}`,
                        title: item.title,
                        summary: '', date: '', link: '#'
                    }));
                    setArticles(formattedArticles);
                }
            } catch (e) {
                console.error("Fallo al obtener noticias para el ticker:", e);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (loading || articles.length === 0) {
        return <div className="h-12 bg-gray-900 animate-pulse" />;
    }

    return (
        <div 
          className="bg-gray-900 border-y border-gray-800 py-3 overflow-hidden relative cursor-pointer group"
          onClick={() => setActiveTab('news')}
        >
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-950 to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-950 to-transparent z-10"></div>
            <div className="animate-marquee whitespace-nowrap flex items-center">
                {[...articles, ...articles].map((article, index) => (
                    <span key={index} className="text-gray-400 mx-8 text-sm group-hover:text-cyan-400 transition-colors">
                        <span className="text-cyan-500 mr-2 font-bold">&bull;</span> {article.title}
                    </span>
                ))}
            </div>
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 60s linear infinite;
                }
            `}</style>
        </div>
    );
};

interface TickerPaper {
    id: string;
    title: string;
}

const PapersTicker: React.FC<{ setActiveTab: (tab: Tab) => void }> = ({ setActiveTab }) => {
    const papers: TickerPaper[] = academicPublications.map(p => ({
        id: p.id,
        title: p.title,
    }));

    if (papers.length === 0) {
        return null;
    }

    return (
        <div 
          className="bg-gray-900/50 border-b border-gray-800 py-3 overflow-hidden relative cursor-pointer group"
          onClick={() => setActiveTab('repository')}
        >
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-gray-950 to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-gray-950 to-transparent z-10"></div>
            <div className="animate-marquee-slow whitespace-nowrap flex items-center">
                {[...papers, ...papers].map((paper, index) => (
                    <span key={index} className="text-gray-400 mx-8 text-sm group-hover:text-cyan-400 transition-colors flex items-center">
                        <BookOpenIcon className="h-4 w-4 mr-3 text-cyan-500/70 flex-shrink-0" /> {paper.title}
                    </span>
                ))}
            </div>
             <style>{`
                @keyframes marquee-slow {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee-slow {
                    animation: marquee-slow 90s linear infinite;
                }
            `}</style>
        </div>
    );
};


export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
    const { t } = useLanguage();

    const sections = [
        {
            title: t('home.section.atlas.title'),
            description: t('home.section.atlas.description'),
            icon: MapIcon,
            tab: "atlas" as Tab
        },
        {
            title: t('home.section.repository.title'),
            description: t('home.section.repository.description'),
            icon: LibraryIcon,
            tab: "repository" as Tab
        },
        {
            title: t('home.section.ai.title'),
            description: t('home.section.ai.description'),
            icon: ChatIcon,
            tab: "ai" as Tab
        },
        {
            title: t('home.section.links.title'),
            description: t('home.section.links.description'),
            icon: LinkIcon,
            tab: "links" as Tab
        }
    ];

    return (
        <div className="flex-grow">
            <Hero />
            <NewsTicker setActiveTab={setActiveTab} />
            <PapersTicker setActiveTab={setActiveTab} />
            <div className="py-16 sm:py-24 bg-gray-950">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {sections.map(section => (
                            <div key={section.tab} className="bg-gray-900 p-8 rounded-xl border border-gray-800/50 transform transition-all duration-300 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2 flex flex-col">
                                <section.icon className="h-10 w-10 text-cyan-400 mb-6" />
                                <h3 className="text-xl font-bold text-white mb-3">{section.title}</h3>
                                <p className="text-gray-400 text-sm flex-grow mb-8">{section.description}</p>
                                <button 
                                    onClick={() => setActiveTab(section.tab)}
                                    className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors self-start"
                                >
                                    {t('home.explore')}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
