import React from 'react';

export const ripcelInstitutions = [
  { name: 'Universidad Nacional de San Juan', code: 'UNSJ', country: 'Argentina', flag: '🇦🇷' },
  { name: 'Pontificia Universidad Católica de Valparaíso', code: 'PUCV', country: 'Chile', flag: '🇨🇱' },
  { name: 'Universidad de Sevilla', code: 'US', country: 'España', flag: '🇪🇸' },
  { name: 'Universidad Nacional de Colombia', code: 'UNAL', country: 'Colombia', flag: '🇨🇴' },
  { name: 'Universidad Nacional de Costa Rica', code: 'UNA', country: 'Costa Rica', flag: '🇨🇷' },
  { name: 'Universidade do Algarve', code: 'UAlg', country: 'Portugal', flag: '🇵🇹' },
  { name: 'Universidade Estadual de Campinas', code: 'UNICAMP', country: 'Brasil', flag: '🇧🇷' },
  { name: 'Universidad Nacional Autónoma de México', code: 'UNAM', country: 'México', flag: '🇲🇽' },
  { name: 'Universidad de Camagüey', code: 'UC', country: 'Cuba', flag: '🇨🇺' },
  { name: 'Escuela Politécnica Nacional', code: 'EPN', country: 'Ecuador', flag: '🇪🇨' },
  { name: 'Universidad Nacional Autónoma de Honduras', code: 'UNAH', country: 'Honduras', flag: '🇭🇳' },
  { name: 'Universidad Nacional de San Agustín', code: 'UNSA', country: 'Perú', flag: '🇵🇪' },
  { name: 'Universidad Técnica Federico Santa María', code: 'USM', country: 'Chile', flag: '🇨🇱' },
  { name: 'Universidad Tecnológica Nacional', code: 'UTN', country: 'Argentina', flag: '🇦🇷' },
  { name: 'Universidad Nacional de Hurlingham', code: 'UNAHUR', country: 'Argentina', flag: '🇦🇷' },
  { name: 'Universidad Nacional de Mar del Plata', code: 'UNMDP', country: 'Argentina', flag: '🇦🇷' },
  { name: 'Universidad Nacional de Quilmes', code: 'UNQ', country: 'Argentina', flag: '🇦🇷' },
  { name: 'Universidad Rey Juan Carlos', code: 'URJC', country: 'España', flag: '🇪🇸' },
  { name: 'CIEMAT', code: 'CIEMAT', country: 'España', flag: '🇪🇸' },
  { name: 'Universidad de Cuenca', code: 'UCuenca', country: 'Ecuador', flag: '🇪🇨' }
];

export const InstitutionsCarousel: React.FC = () => {
  return (
    <div className="border-t hairline bg-white py-10 overflow-hidden relative">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12 mb-6">
        <div className="flex flex-col items-center text-center">
          <span className="ui-label text-[10px] font-semibold uppercase tracking-[0.3em] text-moss-500 mb-2">
            Red de Colaboración Científica
          </span>
          <h3 className="font-display text-2xl text-ink">
            Instituciones Vinculadas al Proyecto RIPCEL
          </h3>
        </div>
      </div>

      {/* Fade Gradients left and right */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Looping Marquee container */}
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee flex gap-6 whitespace-nowrap py-3">
          {[...ripcelInstitutions, ...ripcelInstitutions].map((inst, index) => (
            <div
              key={`${inst.code}-${index}`}
              className="inline-flex items-center gap-3.5 px-5 py-3.5 bg-ivory-50/60 hover:bg-ivory-50 border border-stone-200/80 hover:border-moss-200 rounded-2xl transition-all duration-300 hover:shadow-soft cursor-default"
            >
              <span className="text-2xl filter drop-shadow-sm select-none">{inst.flag}</span>
              <div className="text-left font-sans">
                <span className="block text-xs font-bold uppercase tracking-wide text-moss-800 font-mono">
                  {inst.code}
                </span>
                <span className="block text-[11px] font-medium text-ink/75">
                  {inst.name}
                </span>
                <span className="block text-[9px] text-ink/45 uppercase tracking-wider font-mono">
                  {inst.country}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};
