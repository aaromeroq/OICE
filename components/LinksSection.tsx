import React from 'react';
import { LinkIcon } from './Icons';
import { useLanguage } from '../i18n';

interface LinkItem {
    titleKey: string;
    descKey: string;
    url: string;
    tagKey: string;
}

const links: LinkItem[] = [
    {
        titleKey: 'links.cyted.title',
        descKey: 'links.cyted.desc',
        url: 'https://www.cyted.org',
        tagKey: 'links.tag.cooperation',
    },
    {
        titleKey: 'links.irena.title',
        descKey: 'links.irena.desc',
        url: 'https://www.irena.org',
        tagKey: 'links.tag.reference',
    },
    {
        titleKey: 'links.idae.title',
        descKey: 'links.idae.desc',
        url: 'https://www.idae.es/ayudas-y-financiacion/comunidades-energeticas',
        tagKey: 'links.tag.regulation',
    },
    {
        titleKey: 'links.minminas.title',
        descKey: 'links.minminas.desc',
        url: 'https://www.minenergia.gov.co/es/comunidades-energeticas/',
        tagKey: 'links.tag.regulation',
    },
    {
        titleKey: 'links.agenciase.title',
        descKey: 'links.agenciase.desc',
        url: 'https://www.agenciase.org',
        tagKey: 'links.tag.financing',
    },
    {
        titleKey: 'links.coopeguana.title',
        descKey: 'links.coopeguana.desc',
        url: 'https://coopeguanacaste.com',
        tagKey: 'links.tag.caseStudy',
    },
];

const tagColors: Record<string, string> = {
    'links.tag.cooperation': 'bg-teal-50 text-teal-700 border-teal-200',
    'links.tag.reference': 'bg-stone-50 text-stone-700 border-stone-200',
    'links.tag.regulation': 'bg-amber-50 text-amber-700 border-amber-200',
    'links.tag.financing': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'links.tag.caseStudy': 'bg-violet-50 text-violet-700 border-violet-200',
};

export const LinksSection: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-stone-50 min-h-screen py-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                <div className="mb-8">
                    <h1 className="text-2xl font-black text-stone-900 tracking-tight">{t('links.title')}</h1>
                    <p className="text-stone-500 text-sm mt-1 max-w-2xl">
                        {t('links.subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {links.map((link, idx) => (
                        <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white rounded-xl border border-stone-200 p-5 hover:shadow-md hover:border-teal-200 transition-all group block"
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${tagColors[link.tagKey] || 'bg-stone-50 text-stone-700 border-stone-200'}`}>
                                    {t(link.tagKey)}
                                </span>
                            </div>
                            <h3 className="text-base font-bold text-stone-800 mb-2 group-hover:text-teal-700 transition-colors">{t(link.titleKey)}</h3>
                            <p className="text-sm text-stone-500 leading-relaxed">{t(link.descKey)}</p>
                            <div className="flex items-center gap-1.5 mt-3 text-xs font-bold text-teal-600 group-hover:text-teal-800 transition-colors">
                                <LinkIcon className="h-3.5 w-3.5" />
                                {t('links.visit')}
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};
