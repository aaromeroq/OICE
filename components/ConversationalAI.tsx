import React from 'react';
import { ChatIcon } from './Icons';
import { useLanguage } from '../i18n';

export const ConversationalAI: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="bg-stone-50 min-h-screen flex items-center justify-center py-16">
            <div className="max-w-2xl mx-auto text-center px-4">
                <div className="inline-flex items-center justify-center p-5 bg-teal-50 rounded-2xl mb-8 border border-teal-100">
                    <ChatIcon className="h-14 w-14 text-teal-600" />
                </div>
                <h2 className="text-3xl font-black text-stone-900 tracking-tight mb-4">{t('ai.title')}</h2>
                <div className="inline-block px-4 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider mb-6 border border-amber-200">
                    {t('ai.badge')}
                </div>
                <p className="text-base text-stone-500 leading-relaxed max-w-lg mx-auto">
                    {t('ai.description')}
                </p>
                <div className="mt-8 bg-white rounded-xl border border-stone-200 p-5 max-w-md mx-auto text-left">
                    <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider mb-3">{t('ai.capabilities')}</p>
                    <ul className="space-y-2 text-sm text-stone-600">
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0"></span>
                            {t('ai.cap1')}
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0"></span>
                            {t('ai.cap2')}
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0"></span>
                            {t('ai.cap3')}
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0"></span>
                            {t('ai.cap4')}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
