import React from 'react';
import { BriefcaseIcon } from './Icons';
import { useLanguage } from '../i18n';

export const RegistrationWizard: React.FC = () => {
    const { t } = useLanguage();

    const steps = [
        { step: '1', label: t('catastro.step1.label'), desc: t('catastro.step1.desc') },
        { step: '2', label: t('catastro.step2.label'), desc: t('catastro.step2.desc') },
        { step: '3', label: t('catastro.step3.label'), desc: t('catastro.step3.desc') },
        { step: '4', label: t('catastro.step4.label'), desc: t('catastro.step4.desc') },
        { step: '5', label: t('catastro.step5.label'), desc: t('catastro.step5.desc') },
    ];

    return (
        <div className="bg-stone-50 min-h-screen flex items-center justify-center py-16">
            <div className="max-w-2xl mx-auto text-center px-4">
                <div className="inline-flex items-center justify-center p-5 bg-emerald-50 rounded-2xl mb-8 border border-emerald-100">
                    <BriefcaseIcon className="h-14 w-14 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-black text-stone-900 tracking-tight mb-4">{t('catastro.title')}</h2>
                <div className="inline-block px-4 py-1.5 rounded-lg bg-amber-50 text-amber-700 text-xs font-bold uppercase tracking-wider mb-6 border border-amber-200">
                    {t('catastro.badge')}
                </div>
                <p className="text-base text-stone-500 leading-relaxed max-w-lg mx-auto">
                    {t('catastro.description')}
                </p>
                <div className="mt-8 bg-white rounded-xl border border-stone-200 p-5 max-w-md mx-auto text-left">
                    <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider mb-3">{t('catastro.protocol')}</p>
                    <div className="space-y-3">
                        {steps.map(item => (
                            <div key={item.step} className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{item.step}</span>
                                <div>
                                    <span className="text-sm font-semibold text-stone-700">{item.label}</span>
                                    <p className="text-xs text-stone-500">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
