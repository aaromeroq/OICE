import React, { Suspense, lazy } from 'react';

const GlobeComponent = lazy(() => import('./Globe'));

export const Hero: React.FC = () => {
  return (
    <div className="relative h-[60vh] min-h-[500px] w-full text-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      <Suspense fallback={<div className="absolute inset-0 bg-gray-950 animate-pulse" />}>
        <GlobeComponent />
      </Suspense>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-10 p-4">
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight [text-shadow:_0_2px_4px_rgb(0_0_0_/_40%)]">
            Observatorio de Integración Regional de Sistemas Eléctricos
          </h2>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-gray-200 [text-shadow:_0_1px_3px_rgb(0_0_0_/_30%)]">
            Un observatorio interactivo que mapea casos de estudio globales, conocimientos académicos y las últimas noticias para acelerar la interconexión eléctrica en América Latina y el Caribe.
          </p>
        </div>
      </div>
    </div>
  );
};
