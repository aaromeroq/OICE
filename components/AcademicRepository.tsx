import React, { useState, useMemo } from 'react';
import { academicPublications } from '../data/research';
import { SearchIcon } from './Icons';
import { useLanguage } from '../i18n';

export const AcademicRepository: React.FC = () => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');

    const filtered = useMemo(() => {
        if (!searchTerm.trim()) return academicPublications;
        const lower = searchTerm.toLowerCase();
        return academicPublications.filter(p =>
            p.title.toLowerCase().includes(lower) ||
            p.authors.some(a => a.toLowerCase().includes(lower)) ||
            (p.abstract && p.abstract.toLowerCase().includes(lower)) ||
            (p.journal && p.journal.toLowerCase().includes(lower))
        );
    }, [searchTerm]);

    const resultText = t(filtered.length === 1 ? 'repo.resultCount.one' : 'repo.resultCount.many', {
        count: filtered.length,
    });

    return (
        <div className="bg-stone-50 min-h-screen py-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-black text-stone-900 tracking-tight">{t('repo.title')}</h1>
                    <p className="text-stone-500 text-sm mt-1 max-w-2xl">
                        {t('repo.subtitle')}
                    </p>
                </div>

                {/* Search */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 mb-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <SearchIcon className="h-5 w-5 text-stone-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2.5 border border-stone-300 rounded-lg bg-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm"
                            placeholder={t('repo.searchPlaceholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <p className="text-xs text-stone-500 mb-4 font-medium">{resultText}</p>

                {/* Papers list */}
                <div className="space-y-4">
                    {filtered.map(paper => (
                        <div key={paper.id} className="bg-white rounded-xl border border-stone-200 p-5 hover:shadow-md hover:border-teal-200 transition-all group">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs text-teal-700 font-bold">{paper.year || t('repo.yearFallback')}</span>
                                {paper.journal && (
                                    <>
                                        <span className="text-stone-300">·</span>
                                        <span className="text-xs text-stone-500 font-medium">{paper.journal}</span>
                                    </>
                                )}
                            </div>
                            <h3 className="text-base font-bold text-stone-800 mb-2 group-hover:text-teal-700 transition-colors leading-snug">{paper.title}</h3>
                            <p className="text-xs text-stone-500 mb-3 font-medium">{paper.authors.join(', ')}</p>
                            {paper.abstract && (
                                <p className="text-sm text-stone-500 leading-relaxed line-clamp-3">{paper.abstract}</p>
                            )}
                            {paper.link && paper.link !== '#' && (
                                <a
                                    href={paper.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-3 text-xs font-bold text-teal-600 hover:text-teal-800 transition-colors"
                                >
                                    {t('repo.readMore')}
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-16 text-stone-500">
                        {t('repo.empty')}
                    </div>
                )}
            </div>
        </div>
    );
};
