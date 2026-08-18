import React, { useState } from 'react';
import { glossaryData } from '../data/glossary';
import { useLanguage } from '../i18n';
import { BookOpenIcon, SearchIcon } from './Icons';

interface MindMapNode {
  id: string;
  label: string;
  x: number;
  y: number;
  r: number;
  definition: string;
  isMain?: boolean;
}

const mapNodes: MindMapNode[] = [
  // Centro
  {
    id: 'center',
    label: 'Dimensión Tecnológica',
    x: 480,
    y: 310,
    r: 68,
    isMain: true,
    definition: 'Eje principal de la taxonomía RIPCEL enfocado en caracterizar la infraestructura de generación, almacenamiento, configuración de red y herramientas digitales de la comunidad.'
  },
  // Categorías principales (Ramas)
  {
    id: 'branch-gen',
    label: 'Hardware de Generación',
    x: 270,
    y: 410,
    r: 48,
    isMain: true,
    definition: 'Equipos físicos dedicados a transformar recursos renovables locales (solar, eólica, biomasa, etc.) en energía utilizable.'
  },
  {
    id: 'branch-store',
    label: 'Almacenamiento',
    x: 480,
    y: 490,
    r: 48,
    isMain: true,
    definition: 'Sistemas que guardan excedentes de energía (térmica, electroquímica o química) para liberarla cuando no hay producción.'
  },
  {
    id: 'branch-grid',
    label: 'Contexto de Red',
    x: 690,
    y: 410,
    r: 48,
    isMain: true,
    definition: 'El entorno de red eléctrica donde se inserta la comunidad: conectada en área urbana o rural, microrred local o aislada.'
  },
  {
    id: 'branch-mgmt',
    label: 'Software de Gestión',
    x: 650,
    y: 200,
    r: 48,
    isMain: true,
    definition: 'Plataformas digitales y de automatización (EMS, SCADA) para monitorear flujos, predecir consumos y optimizar la red.'
  },
  {
    id: 'branch-emerge',
    label: 'Tecnologías Emergentes',
    x: 480,
    y: 130,
    r: 48,
    isMain: true,
    definition: 'Tecnologías disruptivas aplicadas a la energía, como transacciones P2P vía Blockchain, plantas virtuales (VPP) o Gemelos Digitales.'
  },
  {
    id: 'branch-cyber',
    label: 'Ciberseguridad',
    x: 310,
    y: 200,
    r: 48,
    isMain: true,
    definition: 'Medidas de protección de los datos y del control operativo contra hackeos, manipulaciones o accesos no autorizados.'
  },
  // Subnodos - Generación
  {
    id: 'Solar PV',
    label: 'Solar PV',
    x: 160,
    y: 350,
    r: 32,
    definition: 'Paneles fotovoltaicos que convierten la luz solar directamente en electricidad; la tecnología de generación más común en las comunidades energéticas (89% de los casos).'
  },
  {
    id: 'Wind',
    label: 'Wind',
    x: 120,
    y: 415,
    r: 32,
    definition: 'Aerogeneradores de pequeña escala utilizados para la generación eléctrica local.'
  },
  {
    id: 'Biomass',
    label: 'Biomass',
    x: 130,
    y: 480,
    r: 32,
    definition: 'Materiales orgánicos (residuos agrícolas, madera, etc.) utilizados para generación de calor o electricidad en comunidades rurales.'
  },
  {
    id: 'Small Hydro',
    label: 'Small Hydro',
    x: 180,
    y: 540,
    r: 32,
    definition: 'Centrales minihidráulicas o microhidráulicas que aprovechan corrientes de agua locales sin grandes embalses.'
  },
  // Subnodos - Almacenamiento
  {
    id: 'Batteries',
    label: 'Batteries',
    x: 370,
    y: 570,
    r: 32,
    definition: 'Dispositivos de almacenamiento electroquímico (litio, plomo-ácido, etc.) para flexibilidad a corto y mediano plazo.'
  },
  {
    id: 'Thermal storage',
    label: 'Thermal',
    x: 480,
    y: 580,
    r: 32,
    definition: 'Sistemas que almacenan calor (sales fundidas, tanques de agua caliente) para calefacción o generación posterior.'
  },
  {
    id: 'Green H2',
    label: 'Green H2',
    x: 590,
    y: 570,
    r: 32,
    definition: 'Hidrógeno producido a partir de electricidad renovable mediante electrólisis para almacenamiento a largo plazo.'
  },
  // Subnodos - Contexto de Red
  {
    id: 'Microgrid',
    label: 'Microgrid',
    x: 810,
    y: 350,
    r: 32,
    definition: 'Una red local autocontrolada que puede funcionar conectada a la red principal o en modo de isla energética.'
  },
  {
    id: 'Urban grid context',
    label: 'Urban',
    x: 830,
    y: 410,
    r: 32,
    definition: 'Comunidades energéticas ubicadas en ciudades, típicamente conectadas a una red de distribución eléctrica fuerte.'
  },
  {
    id: 'Rural grid context',
    label: 'Rural',
    x: 815,
    y: 480,
    r: 32,
    definition: 'Comunidades energéticas en áreas de baja densidad de población, a menudo con conexiones de red débiles o aisladas.'
  },
  {
    id: 'Island grid context',
    label: 'Island',
    x: 755,
    y: 540,
    r: 32,
    definition: 'Sistemas eléctricos aislados que requieren altos niveles de autosuficiencia y control de frecuencia/voltaje.'
  },
  // Subnodos - Gestión
  {
    id: 'EMS basic',
    label: 'EMS basic',
    x: 760,
    y: 150,
    r: 32,
    definition: 'Sistema de Gestión de Energía con funciones básicas de monitoreo de flujos y adquisición de datos.'
  },
  {
    id: 'AI optimised',
    label: 'AI opt.',
    x: 780,
    y: 80,
    r: 32,
    definition: 'Sistemas avanzados de gestión energética que utilizan algoritmos de inteligencia artificial para control predictivo.'
  },
  // Subnodos - Emergentes
  {
    id: 'VPP / V2G',
    label: 'VPP / V2G',
    x: 350,
    y: 60,
    r: 32,
    definition: 'Planta de Energía Virtual (VPP) y Vehículo a la Red (V2G - inyección bidireccional desde autos eléctricos).'
  },
  {
    id: 'Blockchain',
    label: 'Blockchain',
    x: 480,
    y: 45,
    r: 32,
    definition: 'Tecnología de registro distribuido descentralizado que habilita transacciones directas de energía P2P.'
  },
  {
    id: 'Digital twins',
    label: 'Dig. twins',
    x: 610,
    y: 60,
    r: 32,
    definition: 'Réplicas virtuales digitales de sistemas energéticos físicos reales para simulaciones y pruebas.'
  },
  // Subnodos - Ciberseguridad
  {
    id: 'Encryption',
    label: 'Encryption',
    x: 180,
    y: 130,
    r: 32,
    definition: 'Protección criptográfica de las comunicaciones digitales de control y datos telemétricos.'
  },
  {
    id: 'Access controls',
    label: 'Access ctrl',
    x: 150,
    y: 200,
    r: 32,
    definition: 'Políticas y mecanismos de seguridad de red que restringen qué usuarios o dispositivos externos acceden al sistema.'
  }
];

export const Glossary: React.FC = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<MindMapNode | null>(null);

  const categories = [
    { id: 'Generation Hardware', label: 'Hardware de Generación', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { id: 'Storage', label: 'Almacenamiento', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { id: 'Grid Context', label: 'Contexto de Red', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { id: 'Management Software', label: 'Software de Gestión', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    { id: 'Emerging Tech', label: 'Tecnologías Emergentes', color: 'bg-rose-50 text-rose-700 border-rose-200' },
    { id: 'Cybersecurity', label: 'Ciberseguridad', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' }
  ];

  const filteredGlossary = glossaryData.filter(entry => {
    const matchesSearch = entry.term.toLowerCase().includes(search.toLowerCase()) ||
                          entry.definition.toLowerCase().includes(search.toLowerCase()) ||
                          entry.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (cat: string) => {
    const matched = categories.find(c => c.id === cat);
    return matched ? matched.color : 'bg-stone-50 text-stone-700';
  };

  const handleNodeHover = (termId: string | null) => {
    setHoveredTerm(termId);
    if (!termId) {
      setActiveTooltip(null);
    } else {
      const node = mapNodes.find(n => n.id === termId);
      if (node) setActiveTooltip(node);
    }
  };

  const handleNodeClick = (node: MindMapNode) => {
    setActiveTooltip(activeTooltip?.id === node.id ? null : node);
    setHoveredTerm(activeTooltip?.id === node.id ? null : node.id);
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-12 px-6 flex-grow">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-ink mb-2 font-display">
            Glosario de la Taxonomía RIPCEL
          </h2>
          <div className="mx-auto w-24 h-1 bg-copper-500 rounded my-3" />
          <p className="text-sm text-ink/70 max-w-xl mx-auto">
            Explora las definiciones científicas estandarizadas del Eje 1 (Dimensión Tecnológica) 
            diseñadas para catalogar comunidades energéticas de forma transparente y replicable.
          </p>
        </div>

        {/* Map Visualization Box */}
        <div className="bg-white border border-stone-200 shadow-editorial rounded-2xl p-6 mb-10 overflow-hidden">
          <div className="flex items-center gap-3 border-b hairline pb-3 mb-6">
            <BookOpenIcon className="h-5 w-5 text-moss-700" />
            <h3 className="font-display text-xl text-ink font-semibold">Mapa Mental Interactivo de la Dimensión Tecnológica</h3>
          </div>
          
          <p className="text-xs text-ink/60 mb-6 max-w-2xl leading-normal font-sans">
            Toca o pasa el cursor sobre **cualquier nodo** (incluyendo el centro y las categorías principales) para ver su definición científica flotante.
          </p>

          <div className="relative w-full overflow-x-auto flex justify-center py-4 bg-stone-50/50 border border-stone-100 rounded-xl">
            {/* The aspect-ratio parent wrapper keeps HTML tooltips perfectly aligned with SVG coordinate space */}
            <div className="relative w-full max-w-[860px] aspect-[960/620]">
              <svg viewBox="0 0 960 620" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="center-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#1F4A5C" />
                    <stop offset="100%" stop-color="#122E3A" />
                  </linearGradient>
                  <linearGradient id="branch-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#3C8EAF" />
                    <stop offset="100%" stop-color="#2D6B84" />
                  </linearGradient>
                </defs>

                {/* Connections (Center to Branches) */}
                <g stroke="#3C8EAF" strokeOpacity="0.25" strokeWidth="2.5" fill="none">
                  <path d="M 480 310 Q 370 360 270 410" />
                  <path d="M 480 310 Q 480 410 480 490" />
                  <path d="M 480 310 Q 590 360 690 410" />
                  <path d="M 480 310 Q 590 260 650 200" />
                  <path d="M 480 310 Q 480 210 480 130" />
                  <path d="M 480 310 Q 370 260 310 200" />
                </g>

                {/* Connections (Branches to Subnodes) */}
                <g stroke="#3C8EAF" strokeOpacity="0.15" strokeWidth="2" fill="none">
                  {/* Generation Hardware Subnodes */}
                  <path d="M 270 410 Q 210 375 160 350" />
                  <path d="M 270 410 Q 185 410 120 415" />
                  <path d="M 270 410 Q 190 445 130 480" />
                  <path d="M 270 410 Q 210 480 180 540" />

                  {/* Storage Subnodes */}
                  <path d="M 480 490 Q 420 540 370 570" />
                  <path d="M 480 490 Q 480 550 480 580" />
                  <path d="M 480 490 Q 540 540 590 570" />

                  {/* Grid Context Subnodes */}
                  <path d="M 690 410 Q 755 375 810 350" />
                  <path d="M 690 410 Q 775 410 830 410" />
                  <path d="M 690 410 Q 770 445 815 480" />
                  <path d="M 690 410 Q 730 480 755 540" />

                  {/* Management Software Subnodes */}
                  <path d="M 650 200 Q 700 170 760 150" />
                  <path d="M 650 200 Q 720 120 780 80" />

                  {/* Emerging Tech Subnodes */}
                  <path d="M 480 130 Q 400 90 350 60" />
                  <path d="M 480 130 Q 480 70 480 45" />
                  <path d="M 480 130 Q 560 90 610 60" />

                  {/* Cybersecurity Subnodes */}
                  <path d="M 310 200 Q 250 160 180 130" />
                  <path d="M 310 200 Q 230 200 150 200" />
                </g>

                {/* Nodes rendered from list */}
                {mapNodes.map(node => {
                  const isHovered = hoveredTerm === node.id;
                  return (
                    <g
                      key={node.id}
                      onMouseEnter={() => handleNodeHover(node.id)}
                      onMouseLeave={() => handleNodeHover(null)}
                      onClick={() => handleNodeClick(node)}
                      cursor="pointer"
                    >
                      {/* Base shadow circle for active/hover states */}
                      {isHovered && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={node.r + 3}
                          fill="none"
                          stroke="#C1A86B"
                          strokeOpacity="0.4"
                          strokeWidth="3"
                          className="animate-pulse"
                        />
                      )}
                      
                      {/* Main Node Shape */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.r}
                        fill={node.id === 'center' ? 'url(#center-grad)' : node.isMain ? 'url(#branch-grad)' : isHovered ? '#C1A86B' : '#EAF4F8'}
                        stroke={node.id === 'center' ? '#C1A86B' : node.isMain ? '#1F4A5C' : isHovered ? '#B08E3E' : '#3C8EAF'}
                        strokeWidth={node.id === 'center' ? 2.5 : node.isMain ? 1.5 : 2}
                        className="transition-all duration-300"
                      />

                      {/* Customized labels */}
                      {node.id === 'center' ? (
                        <>
                          <text x={node.x} y={node.y - 4} fontFamily="Georgia" fontSize="13" fontWeight="bold" fill="#E5D3A2" textAnchor="middle">Dimensión</text>
                          <text x={node.x} y={node.y + 12} fontFamily="Georgia" fontSize="13" fontWeight="bold" fill="#E5D3A2" textAnchor="middle">Tecnológica</text>
                        </>
                      ) : node.id === 'branch-gen' ? (
                        <>
                          <text x={node.x} y={node.y - 4} fontFamily="Georgia" fontSize="11" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">Generación</text>
                          <text x={node.x} y={node.y + 9} fontFamily="Georgia" fontSize="11" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">Hardware</text>
                        </>
                      ) : node.id === 'branch-store' ? (
                        <text x={node.x} y={node.y + 4} fontFamily="Georgia" fontSize="12" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">Almacenar</text>
                      ) : node.id === 'branch-grid' ? (
                        <>
                          <text x={node.x} y={node.y - 4} fontFamily="Georgia" fontSize="12" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">Contexto</text>
                          <text x={node.x} y={node.y + 9} fontFamily="Georgia" fontSize="12" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">de Red</text>
                        </>
                      ) : node.id === 'branch-mgmt' ? (
                        <>
                          <text x={node.x} y={node.y - 4} fontFamily="Georgia" fontSize="11" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">Gestión</text>
                          <text x={node.x} y={node.y + 9} fontFamily="Georgia" fontSize="11" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">Software</text>
                        </>
                      ) : node.id === 'branch-emerge' ? (
                        <>
                          <text x={node.x} y={node.y - 4} fontFamily="Georgia" fontSize="11" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">Emergentes</text>
                          <text x={node.x} y={node.y + 9} fontFamily="Georgia" fontSize="11" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">Tecnologías</text>
                        </>
                      ) : node.id === 'branch-cyber' ? (
                        <text x={node.x} y={node.y + 4} fontFamily="Georgia" fontSize="11" fontWeight="bold" fill="#FFFFFF" textAnchor="middle">Seguridad</text>
                      ) : (
                        <text
                          x={node.x}
                          y={node.y + 3}
                          fontFamily="system-ui"
                          fontSize={node.label.length > 9 ? "8" : "9"}
                          fontWeight="bold"
                          fill={isHovered ? '#FFFFFF' : '#122E3A'}
                          textAnchor="middle"
                        >
                          {node.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Float HTML Tooltip positioned dynamically based on SVG coordinates */}
              {activeTooltip && (
                <div
                  className="absolute bg-stone-900/95 backdrop-blur-sm text-white text-xs p-4 rounded-xl shadow-xl z-50 pointer-events-none w-72 max-w-[90vw] animate-fade-in border border-white/10 font-sans"
                  style={{
                    left: `${(activeTooltip.x / 960) * 100}%`,
                    top: `${(activeTooltip.y / 620) * 100}%`,
                    transform: `translate(-50%, -100%) translateY(-${activeTooltip.r + 12}px)`,
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5 border-b border-white/15 pb-1">
                    <strong className="text-amber-300 font-mono uppercase tracking-wider text-[9px]">
                      {activeTooltip.label}
                    </strong>
                    <span className="text-[8px] text-white/50 font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/10">
                      {activeTooltip.id === 'center' ? 'Núcleo' : activeTooltip.isMain ? 'Categoría' : 'Sub-Tecnología'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-100 leading-relaxed">
                    {activeTooltip.definition}
                  </p>
                  {/* Caret icon pointing downwards */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search & Filters block */}
        <div className="bg-white border border-stone-200 shadow-soft rounded-2xl p-5 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <SearchIcon className="h-4 w-4 text-stone-400" />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar término o definición..."
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:border-moss-500 bg-stone-50/50"
              />
            </div>
            
            {/* Category Filter buttons */}
            <div className="flex flex-wrap gap-2 text-[10px]">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-full border transition-all ${
                  selectedCategory === null
                    ? 'bg-moss-900 border-moss-900 text-ivory-50 font-bold'
                    : 'bg-white border-stone-200 text-ink/60 hover:text-ink'
                }`}
              >
                Todos
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full border transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-moss-900 border-moss-900 text-ivory-50 font-bold'
                      : 'bg-white border-stone-200 text-ink/60 hover:text-ink'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Glossary Table/Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGlossary.map((entry, index) => {
            const isHovered = hoveredTerm === entry.term || 
                              (hoveredTerm === 'Thermal storage' && entry.term === 'Thermal storage') || 
                              (hoveredTerm === 'Urban grid context' && entry.term === 'Urban grid context') || 
                              (hoveredTerm === 'Rural grid context' && entry.term === 'Rural grid context') || 
                              (hoveredTerm === 'Island grid context' && entry.term === 'Island grid context');
            return (
              <div
                key={`${entry.term}-${index}`}
                id={`glossary-card-${entry.term.replace(/\s+/g, '-')}`}
                className={`bg-white border p-6 rounded-2xl transition-all duration-300 ${
                  isHovered
                    ? 'border-copper-500 shadow-editorial ring-2 ring-copper-500/10 scale-[1.02] bg-ivory-50/20'
                    : 'border-stone-200/80 shadow-soft hover:shadow-editorial hover:border-moss-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h4 className="font-display text-xl font-bold text-ink tracking-tight">
                    {entry.term}
                  </h4>
                  <span className={`text-[9px] font-semibold font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${getCategoryColor(entry.category)}`}>
                    {categories.find(c => c.id === entry.category)?.label || entry.category}
                  </span>
                </div>
                <p className="text-xs text-ink/75 leading-relaxed font-sans">
                  {entry.definition}
                </p>
              </div>
            );
          })}
        </div>

        {filteredGlossary.length === 0 && (
          <div className="text-center py-16 bg-white border border-stone-200 rounded-2xl shadow-soft">
            <p className="text-sm text-ink/50 font-mono">No se encontraron términos que coincidan con la búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
};
