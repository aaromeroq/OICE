import React from 'react';
import { useLanguage } from '../i18n';
import { TransparentLogo } from './TransparentLogo';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-moss-900 text-ivory-100 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(700px 300px at 85% 0%, rgba(226,166,120,0.9), transparent 60%), radial-gradient(600px 400px at 5% 100%, rgba(168,188,172,0.5), transparent 60%)',
        }}
      />
      <div className="relative container mx-auto px-6 sm:px-8 lg:px-12 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-5">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-6xl leading-none tracking-display text-ivory-50">oice</span>
              <span className="inline-block w-2 h-2 rounded-full bg-copper-400 mb-1"></span>
            </div>
            <p className="mt-4 font-italic-display text-2xl text-ivory-100/90 max-w-md leading-snug">
              {t('footer.tagline')}
            </p>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-copper-300 mb-4">
              {t('header.network')}
            </div>
            <div className="flex items-center gap-4 mb-4">
              <TransparentLogo src="/RIPCEL_dark.png" alt="RIPCEL" className="h-10 object-contain" />
              <span className="w-px h-8 bg-ivory-100/20"></span>
              <TransparentLogo src="/CYTED.png" alt="CYTED" className="h-10 object-contain" />
            </div>
            <p
              className="text-sm text-ivory-100/75 leading-relaxed max-w-md"
              dangerouslySetInnerHTML={{
                __html: t('footer.initiative').replace('<strong>', '<strong class="text-copper-300 font-semibold">'),
              }}
            />
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-ivory-100/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-ivory-100/50 font-mono tracking-tight">
            © {year} · OICE · Observatorio Iberoamericano de Comunidades Energéticas
          </p>
          <div className="flex items-center gap-3">
            <TransparentLogo src="/RIPCEL_dark.png" alt="RIPCEL" className="h-5 object-contain" />
            <TransparentLogo src="/CYTED.png" alt="CYTED" className="h-5 object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
};
