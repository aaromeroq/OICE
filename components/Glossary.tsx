import React, { useState } from 'react';
import { glossaryData, GlossaryEntry } from '../data/glossary';
import { useLanguage } from '../i18n';
import { BookOpenIcon, SearchIcon, ZapIcon } from './Icons';

export const Glossary: React.FC = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);

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

  // Node hover handler helper
  const handleNodeHover = (term: string | null) => {
    setHoveredTerm(term);
  };

  return (
    <div className="bg-ivory-50 min-h-screen py-12 px-6 flex-grow">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-ink mb-2 font-display">
            Glosario de la Taxonomía RIPCEL
          </h2>
          <rect className="mx-auto w-24 h-1 bg-copper-500 rounded my-3 block" />
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
            Pasa el cursor sobre los nodos del mapa mental para ver la definición correspondiente resaltada en el glosario de abajo.
          </p>

          <div className="w-full overflow-x-auto flex justify-center py-4 bg-stone-50/50 border border-stone-100 rounded-xl">
            {/* Interactive SVG Mind Map matching their circular tree diagram */}
            <svg viewBox="0 0 960 620" className="w-full max-w-[860px] h-auto select-none" xmlns="http://www.w3.org/2000/svg">
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
              <g stroke="#3C8EAF" stroke-opacity="0.25" stroke-width="2.5" fill="none">
                <path d="M 480 310 Q 370 360 270 410" /> {/* Gen Hardware */}
                <path d="M 480 310 Q 480 410 480 490" /> {/* Storage */}
                <path d="M 480 310 Q 590 360 690 410" /> {/* Grid Context */}
                <path d="M 480 310 Q 590 260 650 200" /> {/* Management */}
                <path d="M 480 310 Q 480 210 480 130" /> {/* Emerging Tech */}
                <path d="M 480 310 Q 370 260 310 200" /> {/* Cybersecurity */}
              </g>

              {/* Connections (Branches to Subnodes) */}
              <g stroke="#3C8EAF" stroke-opacity="0.15" stroke-width="2" fill="none">
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

              {/* Subnodes (Maturity circles) */}
              {/* Generation Hardware */}
              <g onMouseEnter={() => handleNodeHover('Solar PV')} onMouseLeave={() => handleNodeHover(null)} cursor="pointer">
                <circle cx="160" cy="350" r="32" fill={hoveredTerm === 'Solar PV' ? '#C1A86B' : '#EAF4F8'} stroke={hoveredTerm === 'Solar PV' ? '#B08E3E' : '#3C8EAF'} stroke-width="2" />
                <text x="160" y="354" font-family="system-ui" font-size="10" font-weight="bold" fill={hoveredTerm === 'Solar PV' ? '#FFFFFF' : '#122E3A'} text-anchor="middle">Solar PV</text>
              </g>
              <g onMouseEnter={() => handleNodeHover('Wind')} onMouseLeave={() => handleNodeHover(null)} cursor="pointer">
                <circle cx="120" cy="415" r="32" fill={hoveredTerm === 'Wind' ? '#C1A86B' : '#EAF4F8'} stroke={hoveredTerm === 'Wind' ? '#B08E3E' : '#3C8EAF'} stroke-width="2" />
                <text x="120" y="419" font-family="system-ui" font-size="10" font-weight="bold" fill={hoveredTerm === 'Wind' ? '#FFFFFF' : '#122E3A'} text-anchor="middle">Wind</text>
              </g>
              <g onMouseEnter={() => handleNodeHover('Biomass')} onMouseLeave={() => handleNodeHover(null)} cursor="pointer">
                <circle cx="130" cy="480" r="32" fill={hoveredTerm === 'Biomass' ? '#C1A86B' : '#EAF4F8'} stroke={hoveredTerm === 'Biomass' ? '#B08E3E' : '#3C8EAF'} stroke-width="2" />
                <text x="130" y="484" font-family="system-ui" font-size="10" font-weight="bold" fill={hoveredTerm === 'Biomass' ? '#FFFFFF' : '#122E3A'} text-anchor="middle">Biomass</text>
              </g>
              <g onMouseEnter={() => handleNodeHover('Small Hydro')} onMouseLeave={() => handleNodeHover(null)} cursor="pointer">
                <circle cx="180" cy="540" r="32" fill={hoveredTerm === 'Small Hydro' ? '#C1A86B' : '#EAF4F8'} stroke={hoveredTerm === 'Small Hydro' ? '#B08E3E' : '#3C8EAF'} stroke-width="2" />
                <text x="180" y="544" font-family="system-ui" font-size="9" font-weight="bold" fill={hoveredTerm === 'Small Hydro' ? '#FFFFFF' : '#122E3A'} text-anchor="middle">Small Hydro</text>
              </g>

              {/* Storage */}
              <g onMouseEnter={() => handleNodeHover('Batteries')} onMouseLeave={() => handleNodeHover(null)} cursor="pointer">
                <circle cx="370" cy="570" r="32" fill={hoveredTerm === 'Batteries' ? '#C1A86B' : '#EAF4F8'} stroke={hoveredTerm === 'Batteries' ? '#B08E3E' : '#3C8EAF'} stroke-width="2" />
                <text x="370" y="574" font-family="system-ui" font-size="10" font-weight="bold" fill={hoveredTerm === 'Batteries' ? '#FFFFFF' : '#122E3A'} text-anchor="middle">Batteries</text>
              </g>
              <g onMouseEnter={() => handleNodeHover('Thermal storage')} onMouseLeave={() => handleNodeHover(null)} cursor="pointer">
                <circle cx="480" cy="580" r="32" fill={hoveredTerm === 'Thermal storage' ? '#C1A86B' : '#EAF4F8'} stroke={hoveredTerm === 'Thermal storage' ? '#B08E3E' : '#3C8EAF'} stroke-width="2" />
                <text x="480" y="584" font-family="system-ui" font-size="9" font-weight="bold" fill={hoveredTerm === 'Thermal storage' ? '#FFFFFF' : '#122E3A'} text-anchor="middle">Thermal</text>
              </g>
              <g onMouseEnter={() => handleNodeHover('Green H2')} onMouseLeave={() => handleNodeHover(null)} cursor="pointer">
                <circle cx="590" cy="570" r="32" fill={hoveredTerm === 'Green H2' ? '#C1A86B' : '#EAF4F8'} stroke={hoveredTerm === 'Green H2' ? '#B08E3E' : '#3C8EAF'} stroke-width="2" />
                <text x="590" y="574" font-family="system-ui" font-size="9" font-weight="bold" fill={hoveredTerm === 'Green H2' ? '#FFFFFF' : '#122E3A'} text-anchor="middle">Green H2</text>
              </g>

              {/* Grid Context */}
              <g onMouseEnter={() => handleNodeHover('Microgrid')} onMouseLeave={() => handleNodeHover(null)} cursor="pointer">
                <circle cx="810" cy="350" r="32" fill={hoveredTerm === 'Microgrid' ? '#C1A86B' : '#EAF4F8'} stroke={hoveredTerm === 'Microgrid' ? '#B08E3E' : '#3C8EAF'} stroke-width="2" />
                <text x="810" y="354" font-family="system-ui" font-size="10" font-weight="bold" fill={hoveredTerm === 'Microgrid' ? '#FFFFFF' : '#122E3A'} text-anchor="middle">Microgrid</text>
              </g>
              <g onMouseEnter={() => handleNodeHover('Urban grid context')} onMouseLeave={() => handleNodeHover(null)} cursor="pointer">
                <circle cx="830" cy="410" r="32" fill={hoveredTerm === 'Urban grid context' ? '#C1A86B' : '#EAF4F8'} stroke={hoveredTerm === 'Urban grid context' ? '#B08E3E' : '#3C8EAF'} stroke-width="2" />
                <text x="830" y="414" font-family="system-ui" font-size="10" font-weight="bold" fill={hoveredTerm === 'Urban grid context' ? '#FFFFFF' : '#122E3A'} text-anchor="middle">Urban</text>
              </g>
              <g onMouseEnter={() => handleNodeHover('Rural grid context')} onMouseLeave={() => handleNodeHover(null)} cursor="pointer">
                <circle cx="815" cy="480" r="32" fill={hoveredTerm === 'Rural grid context' ? '#C1A86B' : '#EAF4F8'} stroke={hoveredTerm === 'Rural grid context' ? '#B08E3E' : '#3C8EAF'} stroke-width="2" />
                <text x="815" y="484" font-family="system-ui" font-size="10" font-weight="bold" fill={hoveredTerm === 'Rural grid context' ? '#FFFFFF' : '#122E3A'} text-anchor="middle">Rural</text>
              </g>
              <g onMouseEnter={() => handleNodeHover('Island grid context')} onMouseLeave={() => handleNodeHover(null)} cursor="pointer">
                <circle cx="755" cy="540" r="32" fill={hoveredTerm === 'Island grid context' ? '#C1A86B' : '#EAF4F8'} stroke={hoveredTerm === 'Island grid context' ? '#B08E3E' : '#3C8EAF'} stroke-width="2" />
                <text x="755" y="544" font-family="system-ui" font-size="10" font-weight="bold" fill={hoveredTerm === 'Island grid context' ? '#FFFFFF' : '#122E3A'} text-anchor="middle">Island</text>
              </g>

              {/* Management Software */}
              <g onMouseEnter={() => handleNodeHover('EMS basic')} onMouseLeave={() => handleNodeHover(null)} cursor="pointer">
                <circle cx="760" cy="150" r="32" fill={hoveredTerm === 'EMS basic' ? '#C1A86B' : '#EAF4F8'} stroke={hoveredTerm === 'EMS basic' ? '#B08E3E' : '#3C8EAF'} stroke-width="2" />
                <text x="760" y="154" font-family="system-ui" font-size="9" font-weight="bold" fill={hoveredTerm === 'EMS basic' ? '#FFFFFF' : '#122E3A'} text-anchor="middle">EMS basic</text>
              </g>
              <g onMouseEnter={() => handleNodeHover('AI optimised')} onMouseLeave={() => handleNodeHover(null)} cursor="pointer">
                <circle cx="780" cy="80" r="32" fill={hoveredTerm === 'AI optimised' ? '#C1A86B' : '#EAF4F8'} stroke={hoveredTerm === 'AI optimised' ? '#B08E3E' : '#3C8EAF'} stroke-width="2" />
                <text x="780" y="84" font-family="system-ui" font-size="9" font-weight="bold" fill={hoveredTerm === 'AI optimised' ? '#FFFFFF' : '#122E3A'} text-anchor="middle">AI opt.</text>
              </g>

              {/* Emerging Tech */}
              <g onMouseEnter={() => handleNodeHover('VPP / V2G')} onMouseLeave={() => handleNodeHover(null)} cursor="pointer">
                <circle cx="350" cy="60" r="32" fill={hoveredTerm === 'VPP / V2G' ? '#C1A86B' : '#EAF4F8'} stroke={hoveredTerm === 'VPP / V2G' ? '#B08E3E' : '#3C8EAF'} stroke-width="2" />
                <text x="350" y="64" font-family="system-ui" font-size="8" font-weight="bold" fill={hoveredTerm === 'VPP / V2G' ? '#FFFFFF' : '#122E3A'} text-anchor="middle">VPP / V2G</text>
              </g>
              <g onMouseEnter={() => handleNodeHover('Blockchain')} onMouseLeave={() => handleNodeHover(null)} cursor="pointer">
                <circle cx="480" cy="45" r="32" fill={hoveredTerm === 'Blockchain' ? '#C1A86B' : '#EAF4F8'} stroke={hoveredTerm === 'Blockchain' ? '#B08E3E' : '#3C8EAF'} stroke-width="2" />
                <text x="480" y="49" font-family="system-ui" font-size="9" font-weight="bold" fill={hoveredTerm === 'Blockchain' ? '#FFFFFF' : '#122E3A'} text-anchor="middle">Blockchain</text>
              </g>
              <g onMouseEnter={() => handleNodeHover('Digital twins')} onMouseLeave={() => handleNodeHover(null)} cursor="pointer">
                <circle cx="610" cy="60" r="32" fill={hoveredTerm === 'Digital twins' ? '#C1A86B' : '#EAF4F8'} stroke={hoveredTerm === 'Digital twins' ? '#B08E3E' : '#3C8EAF'} stroke-width="2" />
                <text x="610" y="64" font-family="system-ui" font-size="8" font-weight="bold" fill={hoveredTerm === 'Digital twins' ? '#FFFFFF' : '#122E3A'} text-anchor="middle">Dig. twins</text>
              </g>

              {/* Cybersecurity */}
              <g onMouseEnter={() => handleNodeHover('Encryption')} onMouseLeave={() => handleNodeHover(null)} cursor="pointer">
                <circle cx="180" cy="130" r="32" fill={hoveredTerm === 'Encryption' ? '#C1A86B' : '#EAF4F8'} stroke={hoveredTerm === 'Encryption' ? '#B08E3E' : '#3C8EAF'} stroke-width="2" />
                <text x="180" y="134" font-family="system-ui" font-size="8" font-weight="bold" fill={hoveredTerm === 'Encryption' ? '#FFFFFF' : '#122E3A'} text-anchor="middle">Encryption</text>
              </g>
              <g onMouseEnter={() => handleNodeHover('Access controls')} onMouseLeave={() => handleNodeHover(null)} cursor="pointer">
                <circle cx="150" cy="200" r="32" fill={hoveredTerm === 'Access controls' ? '#C1A86B' : '#EAF4F8'} stroke={hoveredTerm === 'Access controls' ? '#B08E3E' : '#3C8EAF'} stroke-width="2" />
                <text x="150" y="204" font-family="system-ui" font-size="8" font-weight="bold" fill={hoveredTerm === 'Access controls' ? '#FFFFFF' : '#122E3A'} text-anchor="middle">Access ctrl</text>
              </g>

              {/* First-level Branch Nodes */}
              <circle cx="270" cy="410" r="48" fill="url(#branch-grad)" stroke="#1F4A5C" stroke-width="1.5" />
              <text x="270" y="407" font-family="Georgia" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Generation</text>
              <text x="270" y="420" font-family="Georgia" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Hardware</text>

              <circle cx="480" cy="490" r="48" fill="url(#branch-grad)" stroke="#1F4A5C" stroke-width="1.5" />
              <text x="480" y="494" font-family="Georgia" font-size="12" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Storage</text>

              <circle cx="690" cy="410" r="48" fill="url(#branch-grad)" stroke="#1F4A5C" stroke-width="1.5" />
              <text x="690" y="407" font-family="Georgia" font-size="12" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Grid</text>
              <text x="690" y="420" font-family="Georgia" font-size="12" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Context</text>

              <circle cx="650" cy="200" r="48" fill="url(#branch-grad)" stroke="#1F4A5C" stroke-width="1.5" />
              <text x="650" y="197" font-family="Georgia" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Management</text>
              <text x="650" y="210" font-family="Georgia" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Software</text>

              <circle cx="480" cy="130" r="48" fill="url(#branch-grad)" stroke="#1F4A5C" stroke-width="1.5" />
              <text x="480" y="127" font-family="Georgia" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Emerging</text>
              <text x="480" y="140" font-family="Georgia" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Tech</text>

              <circle cx="310" cy="200" r="48" fill="url(#branch-grad)" stroke="#1F4A5C" stroke-width="1.5" />
              <text x="310" y="204" font-family="Georgia" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Cybersecurity</text>

              {/* Center Core Node */}
              <circle cx="480" cy="310" r="68" fill="url(#center-grad)" stroke="#C1A86B" stroke-width="2.5" />
              <text x="480" y="306" font-family="Georgia" font-size="14" font-weight="bold" fill="#E5D3A2" text-anchor="middle">Technological</text>
              <text x="480" y="322" font-family="Georgia" font-size="14" font-weight="bold" fill="#E5D3A2" text-anchor="middle">Dimension</text>
            </svg>
          </div>
        </div>

        {/* Search & Filters block */}
        <div className="bg-white border border-stone-200 shadow-soft rounded-2xl p-5 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
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
            const isHovered = hoveredTerm === entry.term || (hoveredTerm === 'Thermal storage' && entry.term === 'Thermal storage') || (hoveredTerm === 'Urban grid context' && entry.term === 'Urban grid context') || (hoveredTerm === 'Rural grid context' && entry.term === 'Rural grid context') || (hoveredTerm === 'Island grid context' && entry.term === 'Island grid context');
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
