import React, { Suspense, lazy } from 'react';
import { useLanguage } from '../i18n';

const GlobeComponent = lazy(() => import('./Globe'));

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="relative h-[65vh] min-h-[500px] w-full text-center overflow-hidden bg-[#e0e5ec]">
      <Suspense fallback={<div className="absolute inset-0 bg-[#f8f9fa] animate-pulse" />}>
        <GlobeComponent />
      </Suspense>
      
      {/* Light gradient overlay to ensure text readability */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-[#f8f9fa] via-white/70 text-slate-800 to-transparent z-10 p-4">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight leading-tight [text-shadow:_0_1px_10px_rgb(255_255_255_/_80%)]">
            Transición Justa y<br/>Comunidades Energéticas
          </h2>
          <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-slate-700 font-medium">
            Explora iniciativas locales, marcos regulatorios y modelos de gobernanza en Iberoamérica. Plataforma de datos abierta para la red RIPCEL.
          </p>
        </div>
      </div>
    </div>
  );
};
