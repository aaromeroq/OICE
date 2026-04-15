import React, { useEffect } from 'react';
import { Project } from '../types';
import { useLanguage } from '../i18n';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const { t } = useLanguage();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center p-4 z-[1000]"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">{project.name}</h3>
              <p className="text-sm text-gray-400 mt-1">{project.region} – {project.countries.join(', ')}</p>
            </div>
            <button 
              onClick={onClose} 
              type="button"
              className="text-gray-400 hover:text-white transition-colors text-3xl font-bold leading-none flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-700 -mt-1 -mr-2"
              aria-label={t('modal.closeAria')}
            >
              ×
            </button>
          </div>
          <div className="mt-6 border-t border-gray-700 pt-6">
            <h4 className="font-semibold text-cyan-400 mb-2">{t('modal.modelType')}</h4>
            <p className="text-gray-300">{project.modelType}</p>

            <h4 className="font-semibold text-cyan-400 mt-6 mb-2">{t('modal.summary')}</h4>
            <p className="text-gray-300">{project.summary}</p>

            <h4 className="font-semibold text-cyan-400 mt-6 mb-2">{t('modal.keyFeatures')}</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {project.keyFeatures.map((feature, index) => <li key={index}>{feature}</li>)}
            </ul>

            <h4 className="font-semibold text-cyan-400 mt-6 mb-2">{t('modal.challenges')}</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              {project.challenges.map((challenge, index) => <li key={index}>{challenge}</li>)}
            </ul>
          </div>
        </div>
        <div className="bg-gray-900/50 px-6 sm:px-8 py-4 text-right rounded-b-xl">
            <button onClick={onClose} className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors text-sm font-semibold">{t('modal.close')}</button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};
