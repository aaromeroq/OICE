import React, { useState, useMemo } from 'react';
import { legislationData } from '../data/legislation';
import { useLanguage } from '../i18n';
import { Eje3Questionnaire } from './Eje3Questionnaire';
import { AuthComponent } from './AuthComponent';
import { UsersIcon, BriefcaseIcon } from './Icons';

interface LegislativeMonitorProps {
    userProfile?: {
        uid: string;
        name: string;
        email: string;
        role: string;
        approved: boolean;
        institution?: string;
        position?: string;
        country?: string;
    } | null;
    onLoginSuccess?: () => void;
}

export const LegislativeMonitor: React.FC<LegislativeMonitorProps> = ({ userProfile, onLoginSuccess }) => {
    const { t } = useLanguage();
    const [activeSubTab, setActiveSubTab] = useState<'laws' | 'questionnaire'>('laws');
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
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-stone-900 tracking-tight">{t('legislation.title')}</h1>
                    <p className="text-stone-500 text-sm mt-1 max-w-2xl">
                        {t('legislation.subtitle')}
                    </p>
                </div>

                {/* Sub-Tab Selector */}
                <div className="flex border-b border-stone-200 mb-8">
                    <button
                        onClick={() => setActiveSubTab('laws')}
                        className={`py-3 px-6 text-sm font-semibold border-b-[3px] transition-all flex items-center gap-2 ${
                            activeSubTab === 'laws'
                                ? 'border-teal-600 text-teal-800 bg-teal-50/30 font-bold'
                                : 'border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-100/50'
                        }`}
                        type="button"
                    >
                        <span className="text-base">📜</span>
                        {t('legislation.tab.laws')}
                    </button>
                    <button
                        onClick={() => setActiveSubTab('questionnaire')}
                        className={`py-3 px-6 text-sm font-semibold border-b-[3px] transition-all flex items-center gap-2 ${
                            activeSubTab === 'questionnaire'
                                ? 'border-teal-600 text-teal-800 bg-teal-50/30 font-bold'
                                : 'border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-100/50'
                        }`}
                        type="button"
                    >
                        <span className="text-base">📋</span>
                        {t('legislation.tab.questionnaire')}
                        {userProfile && (userProfile.approved || userProfile.role === 'admin') && (
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        )}
                    </button>
                </div>

                {/* Tab 1: Current Legislation (Open & Public) */}
                {activeSubTab === 'laws' ? (
                    <div className="space-y-6 animate-fade-in">
                        {/* Filters */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-stone-200 flex flex-col sm:flex-row gap-3">
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

                        {/* Cards Grid */}
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
                            <div className="text-center py-16 text-stone-500 bg-white rounded-xl border border-stone-200">
                                {t('legislation.empty')}
                            </div>
                        )}
                    </div>
                ) : (
                    /* Tab 2: Eje 3 Questionnaire — Access Controlled */
                    <div className="animate-fade-in">
                        {!userProfile ? (
                            /* Case 1: Not logged in */
                            <div className="bg-white rounded-2xl border border-stone-200 shadow-editorial p-8 max-w-xl mx-auto my-6 text-center animate-fade-in">
                                <div className="inline-flex p-3.5 bg-teal-50 rounded-2xl border border-teal-100 text-teal-700 mb-4">
                                    <UsersIcon className="h-8 w-8" />
                                </div>
                                <div className="mb-2">
                                    <span className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-teal-50 text-teal-800 border border-teal-200 font-mono">
                                        RIPCEL — Eje 3 · Acceso Restringido
                                    </span>
                                </div>
                                <h2 className="text-2xl font-black text-stone-900 mb-2 font-display">
                                    Cuestionario Nacional de Regulación y Políticas Públicas
                                </h2>
                                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto mb-6">
                                    Para responder y validar el diagnóstico regulatorio de tu país en la Red RIPCEL, debes iniciar sesión como investigador de la red o registrarte indicando tu <strong>institución</strong> y tu <strong>cargo</strong>.
                                </p>
                                <AuthComponent onAuthSuccess={onLoginSuccess} />
                            </div>
                        ) : (!userProfile.approved && userProfile.role !== 'admin') ? (
                            /* Case 2: Logged in but pending admin approval */
                            <div className="bg-white rounded-2xl border border-amber-200 shadow-editorial p-8 sm:p-10 max-w-2xl mx-auto my-8 text-center animate-fade-in">
                                <div className="inline-flex p-4 bg-amber-50 rounded-2xl border border-amber-100 mb-5">
                                    <BriefcaseIcon className="h-10 w-10 text-amber-600 animate-pulse" />
                                </div>
                                <div className="inline-block mb-3">
                                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 font-mono">
                                        Perfil en Revisión Científica
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold text-stone-900 mb-3 font-display">
                                    Autorización Pendiente por la Coordinación
                                </h3>
                                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 max-w-lg mx-auto">
                                    Hola <strong>{userProfile.name}</strong>. Tu registro ha sido recibido exitosamente en la plataforma RIPCEL. 
                                    Para responder y consignar el diagnóstico oficial del Eje 3 de tu país, tu perfil requiere la autorización previa de uno de los administradores de la red.
                                </p>

                                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 max-w-md mx-auto text-left text-xs space-y-2 mb-6 font-sans">
                                    <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                                        <span className="text-stone-500 font-mono">Investigador:</span>
                                        <span className="font-semibold text-stone-850">{userProfile.name}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                                        <span className="text-stone-500 font-mono">Institución:</span>
                                        <span className="font-semibold text-stone-850">{userProfile.institution || 'No especificada'}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-stone-200/60 pb-1.5">
                                        <span className="text-stone-500 font-mono">Cargo / Rol:</span>
                                        <span className="font-semibold text-teal-800">{userProfile.position || 'No especificado'}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-stone-500 font-mono">Correo:</span>
                                        <span className="font-mono text-stone-850">{userProfile.email}</span>
                                    </div>
                                </div>

                                <div className="text-[11px] bg-amber-50 text-amber-900 p-3.5 rounded-xl border border-amber-200/80 font-sans max-w-md mx-auto">
                                    Tan pronto un administrador verifique tu vinculación institucional, tendrás acceso inmediato para responder y guardar las respuestas de tu país.
                                </div>
                            </div>
                        ) : (
                            /* Case 3: Logged in and approved (or admin) */
                            <Eje3Questionnaire userProfile={userProfile} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
