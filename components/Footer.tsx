
import React from 'react';
import { useLanguage } from '../i18n';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} {t('footer.rights')}</p>
        <p className="text-sm mt-1">{t('footer.tagline')}</p>
      </div>
    </footer>
  );
};
