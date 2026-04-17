import React, { useState, useMemo } from 'react';
import { newsData } from '../data/news';
import { useLanguage } from '../i18n';

export const News: React.FC = () => {
    const { language, t } = useLanguage();
    const [filterCountry, setFilterCountry] = useState('__all__');

    const countries = useMemo(() => {
        const set = new Set(newsData.filter(n => n.country).map(n => n.country!));
        return Array.from(set).sort();
    }, []);

    const filtered = useMemo(() => {
        if (filterCountry === '__all__') return newsData;
        return newsData.filter(n => n.country === filterCountry);
    }, [filterCountry]);

    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr + 'T00:00:00');
        const locale = language === 'en' ? 'en-US' : 'es-ES';
        return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="bg-stone-50 min-h-screen py-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-black text-stone-900 tracking-tight">{t('news.title')}</h1>
                    <p className="text-stone-500 text-sm mt-1 max-w-2xl">
                        {t('news.subtitle')}
                    </p>
                </div>

                {/* Filter */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 mb-6">
                    <select
                        className="w-full sm:w-64 px-3 py-2 text-sm border border-stone-300 rounded-lg bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        value={filterCountry}
                        onChange={(e) => setFilterCountry(e.target.value)}
                    >
                        <option value="__all__">{t('news.allCountries')}</option>
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                    {filtered.map(item => (
                        <div key={item.id} className="bg-white rounded-xl border border-stone-200 p-5 hover:shadow-md hover:border-teal-200 transition-all group">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                                <span className="text-xs text-teal-700 font-bold">{formatDate(item.date)}</span>
                                <span className="hidden sm:inline text-stone-300">·</span>
                                <span className="text-xs text-stone-500 font-medium">{item.source}</span>
                                {item.country && (
                                    <>
                                        <span className="hidden sm:inline text-stone-300">·</span>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 w-max">
                                            {item.country}
                                        </span>
                                    </>
                                )}
                            </div>
                            <h3 className="text-base font-bold text-stone-800 mb-2 group-hover:text-teal-700 transition-colors leading-snug">
                                {item.title}
                            </h3>
                            <p className="text-sm text-stone-500 leading-relaxed">{item.summary}</p>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16 text-stone-500">
                        {t('news.empty')}
                    </div>
                )}
            </div>
        </div>
    );
};
