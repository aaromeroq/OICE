import React, { useState } from 'react';
import { LinkIcon, BookOpenIcon } from './Icons';
import { useLanguage } from '../i18n';
import { communitiesData } from '../data/communities';
import { EnergyCommunity } from '../types';

interface LinkItem {
    titleKey: string;
    descKey: string;
    url: string;
    tagKey: string;
}

const links: LinkItem[] = [
    {
        titleKey: 'links.cyted.title',
        descKey: 'links.cyted.desc',
        url: 'https://www.cyted.org',
        tagKey: 'links.tag.cooperation',
    },
    {
        titleKey: 'links.irena.title',
        descKey: 'links.irena.desc',
        url: 'https://www.irena.org',
        tagKey: 'links.tag.reference',
    },
    {
        titleKey: 'links.idae.title',
        descKey: 'links.idae.desc',
        url: 'https://www.idae.es/ayudas-y-financiacion/comunidades-energeticas',
        tagKey: 'links.tag.regulation',
    },
    {
        titleKey: 'links.minminas.title',
        descKey: 'links.minminas.desc',
        url: 'https://www.minenergia.gov.co/es/comunidades-energeticas/',
        tagKey: 'links.tag.regulation',
    },
    {
        titleKey: 'links.agenciase.title',
        descKey: 'links.agenciase.desc',
        url: 'https://www.agenciase.org',
        tagKey: 'links.tag.financing',
    },
    {
        titleKey: 'links.coopeguana.title',
        descKey: 'links.coopeguana.desc',
        url: 'https://coopeguanacaste.com',
        tagKey: 'links.tag.caseStudy',
    },
];

const tagColors: Record<string, string> = {
    'links.tag.cooperation': 'bg-teal-50 text-teal-700 border-teal-200',
    'links.tag.reference': 'bg-stone-50 text-stone-700 border-stone-200',
    'links.tag.regulation': 'bg-amber-50 text-amber-700 border-amber-200',
    'links.tag.financing': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'links.tag.caseStudy': 'bg-violet-50 text-violet-700 border-violet-200',
};

// Complete list of technologies matching the glossary for matrix analysis
const matrixTechs = [
  { term: 'Solar FV', keywords: ['solar', 'fotovoltaica', 'pv', 'panel'] },
  { term: 'Eólica', keywords: ['eólica', 'eolica', 'wind', 'viento', 'aerogenerador'] },
  { term: 'Biomasa', keywords: ['biomasa', 'biogas', 'biogás', 'residuos', 'digestor', 'biomass'] },
  { term: 'Mini-hidráulica', keywords: ['hidro', 'hydro', 'agua', 'turbina', 'minihidráulica', 'paso de río'] },
  { term: 'Baterías', keywords: ['batería', 'bateria', 'baterias', 'battery', 'litio', 'plomo', 'iones de litio', 'batteries'] },
  { term: 'Alm. Térmico', keywords: ['térmico', 'termico', 'sales fundidas', 'agua caliente', 'thermal'] },
  { term: 'H2 Verde', keywords: ['hidrógeno verde', 'hidrogeno verde', 'h2 verde', 'electrólisis', 'electrolisis', 'green h2'] },
  { term: 'Alm. Hidrógeno', keywords: ['almacenamiento de hidrógeno', 'almacenamiento de hidrogeno', 'hydrogen storage'] },
  { term: 'Microrred', keywords: ['microrred', 'microgrid', 'red local'] },
  { term: 'Red Urbana', keywords: ['urbana', 'urban'] },
  { term: 'Red Rural', keywords: ['rural'] },
  { term: 'Red Aislada', keywords: ['aislada', 'island', 'isla'] },
  { term: 'SGE Básico', keywords: ['ems', 'gestión', 'gestion', 'monitoreo', 'scada', 'control', 'sge básico', 'ems basic'] },
  { term: 'SGE Inteligente', keywords: ['inteligencia artificial', 'ia', 'ai', 'optimizado', 'predic', 'sge inteligente', 'ai optimised'] },
  { term: 'Gemelos Digitales', keywords: ['gemelos digitales', 'gemelo digital', 'digital twins', 'digital twin'] },
  { term: 'Blockchain', keywords: ['blockchain', 'dlt', 'distribuido', 'p2p'] },
  { term: 'VPP / V2G', keywords: ['vpp', 'v2g', 'planta virtual', 'vehículo', 'vehiculo', 'bidireccional'] },
  { term: 'Cifrado', keywords: ['cifrado', 'cifrar', 'encriptación', 'encriptacion', 'encryption'] },
  { term: 'Control Acceso', keywords: ['acceso', 'controles de acceso', 'access controls'] },
  { term: 'Ciberseguridad', keywords: ['ciberseguridad', 'cybersecurity', 'seguridad informática'] }
];

const hasTech = (techString: string | undefined, keywords: string[]): boolean => {
  if (!techString) return false;
  const lower = techString.toLowerCase();
  return keywords.some(keyword => lower.includes(keyword));
};

interface LinksSectionProps {
  communities?: EnergyCommunity[];
}

export const LinksSection: React.FC<LinksSectionProps> = ({ communities = communitiesData }) => {
  const { t } = useLanguage();
  const [activeSubTab, setActiveSubTab] = useState<'reports' | 'tools'>('reports');
  const [showMatrix, setShowMatrix] = useState(false);
  const [showReportDetail, setShowReportDetail] = useState(false);
  const [selectedCell, setSelectedCell] = useState<{ tech: string; country: string } | null>(null);

  // Extract unique countries list dynamically from communities
  const uniqueCountries = Array.from(
    new Set(communities.flatMap(c => c.countries || []).filter(Boolean))
  ).sort();

  // Helper to check if a technology is present in a country
  const getCommunitiesWithTechInCountry = (techKeywords: string[], country: string) => {
    return communities.filter(c => {
      const isFromCountry = c.countries.includes(country);
      if (!isFromCountry) return false;
      return (
        hasTech(c.dimensionTE.technology, techKeywords) ||
        hasTech(c.dimensionTE.description, techKeywords)
      );
    });
  };

  const handleCellClick = (tech: string, keywords: string[], country: string) => {
    const list = getCommunitiesWithTechInCountry(keywords, country);
    if (list.length > 0) {
      setSelectedCell({ tech, country });
    } else {
      setSelectedCell(null);
    }
  };

  const selectedCellCommunities = selectedCell
    ? getCommunitiesWithTechInCountry(
        matrixTechs.find(t => t.term === selectedCell.tech)?.keywords || [],
        selectedCell.country
      )
    : [];

  return (
    <div className="bg-stone-50 min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Main Section Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-black text-stone-900 tracking-tight">Reportes y Herramientas</h1>
          <p className="text-stone-500 text-sm mt-1 max-w-2xl">
            Accede a las matrices de datos comparativos de la red RIPCEL y a los enlaces de herramientas de interés científico.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-stone-200 mb-8">
          <button
            onClick={() => {
              setActiveSubTab('reports');
              setSelectedCell(null);
              setShowMatrix(false);
              setShowReportDetail(false);
            }}
            className={`py-3 px-6 text-sm font-semibold border-b-[3px] transition-all flex items-center gap-2 ${
              activeSubTab === 'reports'
                ? 'border-teal-600 text-teal-800 bg-teal-50/30'
                : 'border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-100/50'
            }`}
          >
            <span className="text-base">📊</span>
            Reportes
          </button>
          <button
            onClick={() => {
              setActiveSubTab('tools');
              setSelectedCell(null);
              setShowMatrix(false);
              setShowReportDetail(false);
            }}
            className={`py-3 px-6 text-sm font-semibold border-b-[3px] transition-all flex items-center gap-2 ${
              activeSubTab === 'tools'
                ? 'border-teal-600 text-teal-800 bg-teal-50/30'
                : 'border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-100/50'
            }`}
          >
            <span className="text-base">⚙️</span>
            Herramientas de Ecosistema
          </button>
        </div>

        {/* Content switch */}
        {activeSubTab === 'reports' ? (
          <div className="space-y-6">
            {!showMatrix && !showReportDetail ? (
              // Main reports list (Grid of Available Reports)
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* CARD 1: Matriz de Tecnologías y Países */}
                <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-soft hover:border-teal-200 hover:shadow-editorial transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 font-bold text-lg">
                        📊
                      </div>
                      <div>
                        <h3 className="font-bold text-stone-800 text-base">Matriz de Tecnologías y Países</h3>
                        <span className="text-[10px] text-teal-700 bg-teal-50 border border-teal-100 font-semibold px-2 py-0.5 rounded uppercase tracking-wider">
                          Taxonomía RIPCEL
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed mb-6">
                      Visualiza de forma interactiva qué tecnologías de la taxonomía del Observatorio están presentes en cada uno de los países iberoamericanos miembros de la red.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowMatrix(true)}
                    className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
                  >
                    Consultar Matriz
                  </button>
                </div>

                {/* CARD 2: Marco de Definición Unificada */}
                <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-soft hover:border-teal-200 hover:shadow-editorial transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-700 font-bold text-lg">
                        📄
                      </div>
                      <div>
                        <h3 className="font-bold text-stone-800 text-base">Marco de Definición Unificada y Taxonomía</h3>
                        <span className="text-[10px] text-teal-700 bg-teal-50 border border-teal-100 font-semibold px-2 py-0.5 rounded uppercase tracking-wider">
                          Documento Técnico
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-stone-500 leading-relaxed mb-6">
                      Explora el marco conceptual de Comunidades Energéticas Locales (CEL) adoptado por RIPCEL, sus definiciones oficiales y descarga el informe PDF.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowReportDetail(true)}
                    className="w-full py-2.5 px-4 bg-teal-700 hover:bg-teal-800 text-white font-semibold text-xs rounded-xl transition-all shadow-sm"
                  >
                    Ver Definiciones y Reporte
                  </button>
                </div>

              </div>
            ) : showReportDetail ? (
              // The PDF download and definitions viewer
              <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
                {/* Back button */}
                <div>
                  <button
                    onClick={() => setShowReportDetail(false)}
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1.5 transition-colors"
                  >
                    ← Volver a Reportes
                  </button>
                </div>

                {/* Main Content Card */}
                <div className="bg-white border border-stone-200 shadow-editorial rounded-2xl p-6 sm:p-8">
                  <div className="border-b pb-6 mb-6">
                    <span className="text-[10px] bg-teal-50 border border-teal-100 text-teal-800 font-black px-2.5 py-1 rounded uppercase tracking-widest font-mono">
                      RIPCEL / CYTED - Documento Técnico
                    </span>
                    <h2 className="font-display text-xl sm:text-2xl font-black text-stone-900 mt-3 leading-tight">
                      Marco de Definición Unificada y Taxonomía de Comunidades Energéticas Locales (CEL) en Iberoamérica
                    </h2>
                    <p className="text-xs text-stone-500 mt-2 font-mono">
                      Publicado: Agosto de 2026 | Versión: v1.0 Definitiva
                    </p>
                  </div>

                  {/* Definitions columns */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    
                    {/* Short Definition */}
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 hover:border-teal-300 transition-colors">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-black uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded">
                          Versión Corta
                        </span>
                        <span className="text-[10px] text-stone-500 font-medium">
                          Divulgación General
                        </span>
                      </div>
                      <p className="text-xs text-stone-750 leading-relaxed font-sans">
                        Una comunidad energética es una organización colectiva conformada por ciudadanos, instituciones locales, cooperativas o pequeñas empresas que se asocian de forma abierta y voluntaria para producir, gestionar, almacenar, consumir o compartir energía renovable. Su gobernanza es estrictamente democrática y participativa, y su fin primordial es generar beneficios sociales, ambientales y económicos localizados para el territorio y sus habitantes, subordinando la rentabilidad financiera a dichos objetivos colectivos.
                      </p>
                    </div>

                    {/* Long Definition */}
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 hover:border-teal-300 transition-colors">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-black uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded">
                          Versión Larga
                        </span>
                        <span className="text-[10px] text-stone-500 font-medium">
                          Ámbito Académico
                        </span>
                      </div>
                      <p className="text-xs text-stone-750 leading-relaxed font-sans">
                        Una Comunidad Energética Local (CEL) es una entidad jurídica de base socio-territorial y de participación abierta, voluntaria y democrática de ciudadanos, cooperativas, autoridades locales y pequeñas empresas. Su propósito fundamental es empoderar a sus miembros como prosumidores colectivos mediante la autogestión de recursos renovables y la interconectividad bidireccional de tecnologías distribuidas. Concebida como un nicho de innovación frente a los regímenes centralizados, la CEL prioriza la autonomía política y organizativa frente a los actores comerciales dominantes, operando bajo un esquema de gobernanza donde la toma de decisiones no depende del capital aportado y cuyos excedentes se reinvierten obligatoriamente en el fortalecimiento de la resiliencia comunitaria, la soberanía energética territorial y la erradicación de la pobreza de los hogares vulnerables.
                      </p>
                    </div>

                  </div>

                  {/* Download Section Banner */}
                  <div className="bg-teal-900 text-white rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
                    <div className="max-w-xl">
                      <h4 className="font-display font-bold text-sm text-teal-200 uppercase tracking-widest mb-1 font-mono">
                        Informe Técnico Definitivo (PDF)
                      </h4>
                      <h3 className="font-display font-bold text-lg text-white mb-2 leading-snug">
                        Descarga el Reporte Consolidado Completo
                      </h3>
                      <p className="text-xs text-teal-100/80 leading-relaxed font-sans">
                        El informe formal contiene el marco de transiciones socio-técnicas (MLP), el análisis ético ampliado con el pilar de **Justicia Restaurativa**, la clasificación bajo el enfoque TIS y la actualización regulatoria de Colombia (Resolución CREG 101 072 de 2025).
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <a
                        href="/Definicion_CEL_RIPCEL.pdf"
                        download="Definicion_CEL_RIPCEL.pdf"
                        className="inline-flex items-center gap-2 bg-copper-500 hover:bg-copper-600 text-white font-bold text-xs py-3 px-6 rounded-xl transition-all shadow-md transform hover:-translate-y-0.5 active:translate-y-0 font-sans"
                      >
                        <span>📥</span>
                        Descargar PDF (412 KB)
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // The interactive technology vs country matrix
              <div className="space-y-6 animate-fade-in">
                {/* Back button */}
                <div>
                  <button
                    onClick={() => {
                      setShowMatrix(false);
                      setSelectedCell(null);
                    }}
                    className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1.5 transition-colors"
                  >
                    ← Volver a Reportes
                  </button>
                </div>

                <div className="bg-white border border-stone-200 shadow-editorial rounded-2xl p-6">
                  <div className="flex items-center justify-between border-b pb-4 mb-4">
                    <div>
                      <h2 className="font-display text-lg font-bold text-stone-900">
                        Matriz: Tecnologías de la Taxonomía vs Países
                      </h2>
                      <p className="text-[11px] text-stone-500 mt-0.5">
                        Haz clic en las celdas marcadas con <span className="text-teal-600 font-bold">●</span> para listar las comunidades que utilizan esa tecnología en dicho país.
                      </p>
                    </div>
                  </div>

                  {/* Horizontal Scrollable Table Wrapper */}
                  <div className="overflow-x-auto border border-stone-100 rounded-xl max-w-full">
                    <table className="min-w-full divide-y divide-stone-200 text-left border-collapse">
                      <thead className="bg-stone-50 text-[10px] text-stone-500 uppercase tracking-wider font-bold">
                        <tr>
                          <th className="px-4 py-3 sticky left-0 bg-stone-50 border-r border-stone-200 z-10 w-44">
                            Tecnología
                          </th>
                          {uniqueCountries.map(country => (
                            <th key={country} className="px-4 py-3 text-center min-w-[90px] border-b border-stone-200">
                              {country}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-150 text-[11px] text-stone-700 font-sans">
                        {matrixTechs.map(tech => (
                          <tr key={tech.term} className="hover:bg-stone-50/50 transition-colors">
                            {/* Stuck first column for easy technology scanning */}
                            <td className="px-4 py-2.5 font-bold sticky left-0 bg-white border-r border-stone-200 shadow-[2px_0_5px_rgba(0,0,0,0.02)]">
                              {tech.term}
                            </td>
                            {uniqueCountries.map(country => {
                              const matches = getCommunitiesWithTechInCountry(tech.keywords, country);
                              const count = matches.length;
                              const isCellSelected = selectedCell?.tech === tech.term && selectedCell?.country === country;
                              
                              return (
                                <td
                                  key={country}
                                  onClick={() => handleCellClick(tech.term, tech.keywords, country)}
                                  className={`px-4 py-2.5 text-center transition-all ${
                                    count > 0 
                                      ? 'cursor-pointer hover:bg-teal-50/70 font-semibold' 
                                      : 'text-stone-300'
                                  } ${isCellSelected ? 'bg-teal-50 border-teal-300 ring-2 ring-teal-600/10' : ''}`}
                                >
                                  {count > 0 ? (
                                    <div className="flex flex-col items-center justify-center gap-0.5">
                                      <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                                      <span className="text-[9px] text-teal-700 font-bold font-mono">
                                        ({count})
                                      </span>
                                    </div>
                                  ) : (
                                    <span className="text-stone-300">—</span>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Selected Cell details section */}
                {selectedCell && (
                  <div className="bg-white border border-teal-100 shadow-editorial rounded-2xl p-6 animate-fade-in">
                    <h3 className="text-base font-bold text-stone-950 mb-4 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-teal-600 animate-ping"></span>
                      Comunidades con <span className="text-teal-700 font-mono font-black">{selectedCell.tech}</span> en <span className="text-stone-900 font-bold">{selectedCell.country}</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedCellCommunities.map(c => (
                        <div
                          key={c.id}
                          className="bg-stone-50 border border-stone-200 p-4 rounded-xl flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-100 text-teal-800 border border-teal-200">
                                {c.status}
                              </span>
                              <span className="text-[10px] text-stone-500 font-mono">
                                {c.dimensionTE.capacityMW > 0 ? `${c.dimensionTE.capacityMW} MW` : 'Escala Local'}
                              </span>
                            </div>
                            <h4 className="font-bold text-stone-900 text-sm mb-1">{c.name}</h4>
                            <p className="text-xs text-stone-600 leading-normal line-clamp-3">
                              {c.summary}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          // Ecosistema tools tab displaying useful links
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl border border-stone-200 p-5 hover:shadow-md hover:border-teal-200 transition-all group block"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border ${tagColors[link.tagKey] || 'bg-stone-50 text-stone-700 border-stone-200'}`}>
                    {t(link.tagKey)}
                  </span>
                </div>
                <h3 className="text-base font-bold text-stone-800 mb-2 group-hover:text-teal-700 transition-colors">{t(link.titleKey)}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{t(link.descKey)}</p>
                <div className="flex items-center gap-1.5 mt-3 text-xs font-bold text-teal-600 group-hover:text-teal-800 transition-colors">
                  <LinkIcon className="h-3.5 w-3.5" />
                  {t('links.visit')}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
