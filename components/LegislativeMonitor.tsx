import React, { useState, useMemo } from 'react';
import { legislationData } from '../data/legislation';
import { useLanguage } from '../i18n';

export const LegislativeMonitor: React.FC = () => {
    const { t } = useLanguage();
    const [filterCountry, setFilterCountry] = useState('Todos');
    const [filterType, setFilterType] = useState('Todos');

    const countries = useMemo(() => {
        const set = new Set(legislationData.map(l => l.country));
        return ['Todos', ...Array.from(set).sort()];
    }, []);

    const types = useMemo(() => {
        const set = new Set(legislationData.map(l => l.type));
        return ['Todos', ...Array.from(set).sort()];
    }, []);

    const filtered = useMemo(() => {
        return legislationData.filter(l => {
            const matchCountry = filterCountry === 'Todos' || l.country === filterCountry;
            const matchType = filterType === 'Todos' || l.type === filterType;
            return matchCountry && matchType;
        });
    }, [filterCountry, filterType]);

    const typeColors: Record<string, string> = {
        'Ley': 'bg-teal-100 text-teal-800 border-teal-200',
        'Decreto': 'bg-amber-100 text-amber-800 border-amber-200',
        'Resolucion': 'bg-violet-100 text-violet-800 border-violet-200',
    };

    return (
        <div className="bg-stone-50 min-h-screen py-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-black text-stone-900 tracking-tight">{t('legislation.title')}</h1>
                    <p className="text-stone-500 text-sm mt-1 max-w-2xl">
                        {t('legislation.subtitle')}
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 mb-6 flex flex-col sm:flex-row gap-3">
                    <select
                        className="flex-1 px-3 py-2 text-sm border border-stone-300 rounded-lg bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        value={filterCountry}
                        onChange={(e) => setFilterCountry(e.target.value)}
                    >
                        {countries.map(c => <option key={c} value={c}>{c === 'Todos' ? t('legislation.allCountries') : c}</option>)}
                    </select>
                    <select
                        className="sm:w-48 px-3 py-2 text-sm border border-stone-300 rounded-lg bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        {types.map(tp => <option key={tp} value={tp}>{tp === 'Todos' ? t('legislation.allTypes') : tp}</option>)}
                    </select>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filtered.map(item => (
                        <div key={item.id} className="bg-white rounded-xl border border-stone-200 p-5 hover:shadow-md hover:border-teal-200 transition-all group">
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${typeColors[item.type] || 'bg-stone-100 text-stone-700 border-stone-200'}`}>
                                    {item.type}
                                </span>
                                <span className="text-xs text-stone-500 font-semibold">{item.country} · {item.year}</span>
                            </div>
                            <h3 className="text-base font-bold text-stone-800 mb-2 group-hover:text-teal-700 transition-colors">{item.title}</h3>
                            <p className="text-sm text-stone-500 leading-relaxed">{item.summary}</p>
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16 text-stone-500">
                        {t('legislation.empty')}
                    </div>
                )}
            </div>
        </div>
    );
};
