import React, { useEffect, useState } from 'react';
import { EnergyCommunity } from '../types';
import { useLanguage } from '../i18n';

interface ProjectDetailModalProps {
  project: EnergyCommunity | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'TE' | 'GO' | 'RF' | 'AS' | 'SUS'>('TE');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (project) setActiveTab('TE');
  }, [project]);

  if (!project) return null;

  const ostromLabels = [
    t('modal.ostrom.1'), t('modal.ostrom.2'), t('modal.ostrom.3'),
    t('modal.ostrom.4'), t('modal.ostrom.5'), t('modal.ostrom.6'),
    t('modal.ostrom.7'), t('modal.ostrom.8')
  ];

  const tisLabels = [
    t('modal.tis.1'), t('modal.tis.2'), t('modal.tis.3'),
    t('modal.tis.4'), t('modal.tis.5'), t('modal.tis.6'), t('modal.tis.7')
  ];

  const statusStyle: Record<string, string> = {
    activa: 'bg-teal-100 text-teal-800 border-teal-200',
    incubacion: 'bg-amber-100 text-amber-800 border-amber-200',
    estancada: 'bg-red-100 text-red-800 border-red-200',
    abandonada: 'bg-stone-100 text-stone-700 border-stone-200',
  };

  const dimensionTabs = [
    { id: 'TE', label: t('modal.tab.technology'), emoji: '⚡' },
    { id: 'GO', label: t('modal.tab.governance'), emoji: '🏛' },
    { id: 'RF', label: t('modal.tab.regulation'), emoji: '📜' },
    { id: 'AS', label: t('modal.tab.social'), emoji: '🤝' },
    { id: 'SUS', label: t('modal.tab.tis'), emoji: '📊' },
  ];

  const emancipationLabel = (level: number): string => {
    if (level >= 4) return t('modal.as.level5');
    if (level >= 2) return t('modal.as.level3');
    return t('modal.as.level1');
  };

  return (
    <div
      className="fixed inset-0 bg-stone-900/50 backdrop-blur-sm flex justify-center items-center p-4 z-[1000]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-modal-in flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-stone-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-3 py-1 text-[10px] font-bold rounded-md uppercase tracking-wider border ${statusStyle[project.status] || statusStyle.activa}`}>
                  {project.status}
                </span>
                <span className="text-sm text-stone-500 font-medium">{project.countries.join(', ')}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">{project.name}</h3>
            </div>
            <button
              onClick={onClose}
              type="button"
              className="text-stone-400 hover:text-stone-700 transition-colors text-2xl font-bold leading-none flex items-center justify-center h-10 w-10 rounded-full hover:bg-stone-100"
              aria-label={t('modal.closeAria')}
            >
              &times;
            </button>
          </div>

          <p className="text-stone-600 text-sm leading-relaxed mb-6">{project.summary}</p>

          {/* Dimension Tabs */}
          <div className="flex border-b border-stone-200 overflow-x-auto hide-scrollbar -mb-px">
            {dimensionTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2.5 px-5 text-sm font-semibold whitespace-nowrap transition-all border-b-[3px] ${
                  activeTab === tab.id
                    ? 'border-teal-600 text-teal-800 bg-teal-50/50'
                    : 'border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-50'
                }`}
              >
                <span className="mr-1.5">{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 min-h-[220px] animate-fade-in">
          {activeTab === 'TE' && (
            <div className="space-y-4">
              <InfoCard label={t('modal.te.config')} value={project.dimensionTE.technology} />
              {project.dimensionTE.capacityMW && (
                <InfoCard label={t('modal.te.capacity')} value={`${project.dimensionTE.capacityMW} MW`} />
              )}
              <InfoCard label={t('modal.te.description')} value={project.dimensionTE.description} isLong />
            </div>
          )}

          {activeTab === 'GO' && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <InfoCard label={t('modal.go.model')} value={project.dimensionGO.model} className="flex-1" />
                {project.dimensionGO.membersCount && (
                  <InfoCard label={t('modal.go.members')} value={project.dimensionGO.membersCount.toLocaleString()} className="w-full sm:w-48" />
                )}
              </div>

              {project.dimensionGO.ostromChecklist && (
                <div className="bg-stone-50 p-5 rounded-xl border border-stone-200">
                  <h4 className="text-xs text-teal-700 uppercase tracking-widest font-bold mb-4">{t('modal.go.ostrom')}</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {ostromLabels.map((lbl, idx) => {
                      const active = project.dimensionGO.ostromChecklist?.[idx];
                      return (
                        <div key={idx} className={`p-2.5 rounded-lg border text-center transition-all ${
                          active ? 'bg-teal-50 border-teal-200 text-teal-700' : 'bg-white border-stone-200 text-stone-400'
                        }`}>
                          <div className="text-[10px] leading-tight font-medium">{lbl}</div>
                          <div className="mt-1 text-xs font-bold">{active ? '✓' : '—'}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <InfoCard label={t('modal.go.description')} value={project.dimensionGO.description} isLong />
            </div>
          )}

          {activeTab === 'RF' && (
            <div className="space-y-4">
              {project.dimensionRF.isRegulatoryDivideAffected && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-amber-500 animate-pulse flex-shrink-0"></div>
                  <p className="text-sm text-amber-800 font-medium">{t('modal.rf.regulatoryDivide')}</p>
                </div>
              )}
              <InfoCard label={t('modal.rf.legalStatus')} value={project.dimensionRF.legalStatus} />
              <InfoCard label={t('modal.rf.financing')} value={project.dimensionRF.financingMechanism} />
              {project.dimensionRF.regulatoryNotes && (
                <div className="bg-stone-50 p-5 rounded-xl border border-dashed border-stone-300">
                  <h4 className="text-xs text-stone-500 uppercase tracking-widest font-semibold mb-1">{t('modal.rf.notes')}</h4>
                  <p className="text-sm text-stone-600 italic">{project.dimensionRF.regulatoryNotes}</p>
                </div>
              )}
              <InfoCard label={t('modal.rf.description')} value={project.dimensionRF.description} isLong />
            </div>
          )}

          {activeTab === 'AS' && (
            <div className="space-y-5">
              <div className="bg-stone-50 p-5 rounded-xl border border-stone-200">
                <h4 className="text-xs text-teal-700 uppercase tracking-widest font-bold mb-4">{t('modal.as.scale')}</h4>
                <div className="flex items-end justify-between gap-1.5 mb-2">
                  {[1, 2, 3, 4, 5].map(lvl => (
                    <div key={lvl} className="flex-1 flex flex-col items-center">
                      <div className={`w-full rounded-t transition-all ${
                        lvl <= project.dimensionAS.emancipationLevel
                          ? 'bg-gradient-to-t from-teal-600 to-teal-500'
                          : 'bg-stone-200'
                      }`} style={{ height: `${12 + lvl * 6}px` }}></div>
                      <span className={`text-[10px] mt-1 font-bold ${
                        lvl === project.dimensionAS.emancipationLevel ? 'text-teal-600' : 'text-stone-400'
                      }`}>N{lvl}</span>
                    </div>
                  ))}
                </div>
                <div className="text-right mt-2">
                  <span className="text-xs text-stone-500 font-medium">
                    {t('modal.as.level', { level: project.dimensionAS.emancipationLevel })}: {emancipationLabel(project.dimensionAS.emancipationLevel)}
                  </span>
                </div>
              </div>
              <InfoCard label={t('modal.as.impact')} value={project.dimensionAS.localImpact} />
              <InfoCard label={t('modal.as.description')} value={project.dimensionAS.description} isLong />
            </div>
          )}

          {activeTab === 'SUS' && (
            <div className="space-y-5">
              <div className="bg-stone-50 p-6 rounded-xl border border-stone-200">
                <h4 className="text-xs text-teal-700 uppercase tracking-widest font-bold mb-6 text-center">{t('modal.tis.title')}</h4>
                <div className="space-y-4">
                  {tisLabels.map((lbl, idx) => {
                    const score = project.dimensionTE.tisScore?.[idx] || 0;
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-medium">
                          <span className="text-stone-600">{lbl}</span>
                          <span className="text-teal-700 font-mono font-bold">{score}/5</span>
                        </div>
                        <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-1000 rounded-full"
                            style={{ width: `${(score / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-stone-50 px-6 sm:px-8 py-4 text-right rounded-b-2xl border-t border-stone-100">
          <button onClick={onClose} className="px-6 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors text-sm font-semibold shadow-sm">
            {t('modal.close')}
          </button>
        </div>
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-in { animation: modal-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.3s ease forwards; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

const InfoCard: React.FC<{ label: string; value: string | number; isLong?: boolean; className?: string }> = ({ label, value, isLong, className }) => (
  <div className={`bg-stone-50 p-4 rounded-xl border border-stone-200 ${className || ''}`}>
    <h4 className="text-[10px] text-stone-500 uppercase tracking-widest font-semibold mb-1">{label}</h4>
    <p className={`text-stone-800 ${isLong ? 'text-sm leading-relaxed' : 'text-base font-medium'}`}>{value}</p>
  </div>
);
