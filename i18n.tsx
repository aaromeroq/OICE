import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'es' | 'en';

// Using a Record<string,string> so any key is allowed without enumerating 200+ entries
type TranslationDictionary = Record<string, string>;

const es: TranslationDictionary = {
  // ─── Language selector ─────
  'language.es': 'ES',
  'language.en': 'EN',
  'language.switchToEs': 'Cambiar a español',
  'language.switchToEn': 'Cambiar a inglés',

  // ─── Header ────────────────
  'header.subtitle': 'Observatorio Iberoamericano · Comunidades Energéticas',
  'header.network': 'Red Temática',
  'tabs.home': 'Home',
  'tabs.atlas': 'Atlas Interactivo',
  'tabs.legislation': 'Monitor Legal',
  'tabs.catastro': 'Catastro',
  'tabs.repository': 'Repositorio Académico',
  'tabs.ai': 'IA Conversacional',
  'tabs.news': 'Noticias',
  'tabs.members': 'Red RIPCEL',
  'tabs.links': 'Reportes y Herramientas',

  // ─── Home Hero ─────────────
  'home.badge': 'Red CYTED RIPCEL',
  'home.hero.line1': 'Comunidades',
  'home.hero.line2': 'Energéticas en',
  'home.hero.line3': 'Iberoamérica',
  'home.hero.subtitle': 'Plataforma abierta para el diagnóstico, implementación y estudio comparado de comunidades energéticas en <strong>15 países</strong> de Iberoamérica.',
  'home.hero.cta1': 'Explorar Atlas',
  'home.hero.cta2': 'Ver Repositorio',
  'home.globe.hint': 'Selecciona un país de Iberoamérica para explorar sus comunidades',

  // ─── Home Stats ────────────
  'home.stats.communities': 'Comunidades',
  'home.stats.countries': 'Países',
  'home.stats.taxonomy': 'Taxonomía',
  'home.stats.participants': 'Participantes',

  // ─── Home Sections ─────────
  'home.tools.title': 'Herramientas del Observatorio',
  'home.tools.subtitle': 'Plataforma integrada de datos, regulación y análisis comparado para investigadores y tomadores de decisiones.',
  'home.tools.access': 'Acceder',
  'home.section.atlas.title': 'Atlas Interactivo',
  'home.section.atlas.desc': 'Cartografía georeferenciada de comunidades energéticas con taxonomía 4D (Tecnología, Gobernanza, Regulación, Apropiación Social).',
  'home.section.legislation.title': 'Monitor Legislativo',
  'home.section.legislation.desc': 'Seguimiento de normativas sobre generación compartida, autoconsumo colectivo y figuras asociativas en 15 países.',
  'home.section.catastro.title': 'Catastro',
  'home.section.catastro.desc': 'Registro estandarizado de comunidades energéticas bajo el protocolo cientifico RIPCEL.',
  'home.section.members.title': 'Red RIPCEL',
  'home.section.members.desc': 'Directorio de investigadores e instituciones de la red iberoamericana en 15 países.',

  // ─── Home About RIPCEL ─────
  'home.about.label': 'Sobre RIPCEL',
  'home.about.title': 'Cooperación Científica, Tecnológica y Social para la Transición Energética Justa',
  'home.about.text': 'OICE constituye el repositorio digital abierto y la plataforma analítica de investigación comparada de la red RIPCEL, integrando 15 países en torno al diagnóstico, implementación técnica y estudios de participación comunitaria.',
  'home.about.countriesLabel': 'Paises RIPCEL',
  'home.about.dimensionsLabel': 'Dimensiones',

  // ─── Legislative Monitor ───
  'legislation.title': 'Monitor Legislativo',
  'legislation.subtitle': 'Seguimiento de normativas, leyes y resoluciones sobre generación compartida y comunidades energéticas en Iberoamérica.',
  'legislation.allCountries': 'Todos los países',
  'legislation.allTypes': 'Todos los tipos',
  'legislation.empty': 'No se encontraron normativas con los filtros seleccionados.',

  // ─── Registration / Catastro
  'catastro.title': 'Catastro de Comunidades Energéticas',
  'catastro.badge': 'Proximamente',
  'catastro.description': 'El portal de registro habilitara a los miembros de la red RIPCEL a identificar, categorizar y añadir nuevas comunidades energéticas en todo el territorio iberoamericano utilizando el protocolo científico estandarizado de 4 dimensiones.',
  'catastro.protocol': 'Protocolo de Registro',
  'catastro.step1.label': 'Identificación',
  'catastro.step1.desc': 'Nombre, ubicación, país y coordenadas',
  'catastro.step2.label': 'Tecnología (TE)',
  'catastro.step2.desc': 'Configuración tecnológica y capacidad',
  'catastro.step3.label': 'Gobernanza (GO)',
  'catastro.step3.desc': 'Modelo organizativo y principios de Ostrom',
  'catastro.step4.label': 'Regulación (RF)',
  'catastro.step4.desc': 'Marco legal y mecanismos de financiación',
  'catastro.step5.label': 'Apropiación (AS)',
  'catastro.step5.desc': 'Impacto social y nivel de emancipación',

  // ─── Members ───────────────
  'members.title': 'Red RIPCEL',
  'members.subtitle': 'Directorio de investigadores, representaciones académicas e institucionales de la Red Iberoamericana de Promoción de Comunidades Energéticas Locales.',
  'members.searchPlaceholder': 'Buscar por nombre o institución...',
  'members.allCountries': 'Todos los paises',
  'members.empty': 'No se encontraron coincidencias para la busqueda.',

  // ─── Footer ────────────────
  'footer.tagline': 'Observatorio Iberoamericano de Comunidades Energéticas',
  'footer.initiative': 'Una iniciativa de la Red Temática <strong>CYTED RIPCEL</strong> — Red Iberoamericana de Promoción de Comunidades Energéticas Locales para la Transición Justa y Sostenible.',

  // ─── Academic Repository ────
  'repo.title': 'Repositorio Académico',
  'repo.subtitle': 'Biblioteca científica sobre comunidades energéticas, cooperativas de generación distribuida, marcos de Ostrom/TIS e innovación social en la transición energética iberoamericana.',
  'repo.searchPlaceholder': 'Buscar por titulo, autor, journal...',
  'repo.resultCount.one': '{count} publicación encontrada',
  'repo.resultCount.many': '{count} publicaciones encontradas',
  'repo.yearFallback': 'N/D',
  'repo.readMore': 'Leer mas →',
  'repo.empty': 'No se encontraron publicaciones que coincidan con la búsqueda.',

  // ─── Conversational AI ─────
  'ai.title': 'Asistente IA RAG',
  'ai.badge': 'Proximamente',
  'ai.description': 'Estamos entrenando un motor conversacional avanzado basado en todo el ecosistema documental de RIPCEL. Pronto podras consultar regulaciones, marcos teoricos y estadisticas de comunidades energeticas de manera interactiva.',
  'ai.capabilities': 'Capacidades previstas',
  'ai.cap1': 'Consulta de marcos regulatorios por país',
  'ai.cap2': 'Análisis comparativo de modelos de gobernanza',
  'ai.cap3': 'Busqueda semantica en repositorio académico',
  'ai.cap4': 'Recomendaciones basadas en taxonomía 4D',

  // ─── News ──────────────────
  'news.title': 'Noticias',
  'news.subtitle': 'Últimas novedades sobre comunidades energéticas, regulación y cooperación en Iberoamérica.',
  'news.allCountries': 'Todos los países',
  'news.empty': 'No se encontraron noticias con los filtros seleccionados.',
  // ─── Links ─────────────────
  'links.title': 'Enlaces de Interés',
  'links.subtitle': 'Recursos externos, portales institucionales y herramientas vinculadas al ecosistema de comunidades energéticas en Iberoamérica.',
  'links.visit': 'Visitar sitio',
  'links.tag.cooperation': 'Cooperación',
  'links.tag.reference': 'Referencia',
  'links.tag.regulation': 'Regulación',
  'links.tag.financing': 'Financiamiento',
  'links.tag.caseStudy': 'Caso de Estudio',
  'links.cyted.title': 'CYTED - Programa Iberoamericano de Ciencia y Tecnología',
  'links.cyted.desc': 'Programa marco de cooperacion cientifica que financia la Red RIPCEL y otras redes tematicas de investigacion.',
  'links.irena.title': 'IRENA - Community Energy Benefits',
  'links.irena.desc': 'Informe de la Agencia Internacional de Energias Renovables sobre beneficios del modelo de energia comunitaria a nivel global.',
  'links.idae.title': 'IDAE - Comunidades Energéticas (España)',
  'links.idae.desc': 'Portal del Instituto para la Diversificación y Ahorro de la Energía sobre Oficinas de Transformación Comunitaria y el marco CER/CCE.',
  'links.minminas.title': 'MinMinas Colombia - Comunidades Energéticas',
  'links.minminas.desc': 'Portal del Ministerio de Minas y Energía de Colombia con el Registro Único de Comunidades Energéticas (RUCE).',
  'links.agenciase.title': 'AgenciaSE Chile - Fondo de Acceso a la Energía',
  'links.agenciase.desc': 'Agencia de Sostenibilidad Energética de Chile con fondos concursables para comunidades y territorios vulnerables.',
  'links.coopeguana.title': 'CoopeGuanacaste - Informe de Sostenibilidad',
  'links.coopeguana.desc': 'Informe GRI 2024 de la cooperativa de electrificación rural más avanzada de Costa Rica.',

  // ─── Atlas / InteractiveMap ─
  'atlas.title': 'Atlas Interactivo',
  'atlas.subtitle': '{count} comunidades en {countries} paises',
  'atlas.backAll': '← Ver todo',
  'atlas.hideSidebar': 'Ocultar',
  'atlas.showSidebar': 'Mostrar',
  'atlas.communityPanel': 'Comunidades en {country}',
  'atlas.members': 'miembros',
  'atlas.viewTaxonomy': 'Ver taxonomia 4D →',
  'atlas.popup.viewDimensions': 'Ver dimensiones →',
  'atlas.legend.activa': 'Activa',
  'atlas.legend.incubacion': 'Incubacion',
  'atlas.legend.estancada': 'Estancada',
  'atlas.legend.abandonada': 'Abandonada',
  'atlas.inCountry': '{count} comunidades',

  // ─── ProjectDetailModal ─────
  'modal.close': 'Cerrar',
  'modal.closeAria': 'Cerrar modal',
  'modal.tab.technology': 'Tecnología',
  'modal.tab.governance': 'Gobernanza',
  'modal.tab.regulation': 'Regulación',
  'modal.tab.social': 'Apropiación',
  'modal.tab.tis': 'Funciones TIS',
  'modal.te.config': 'Configuración tecnológica',
  'modal.te.capacity': 'Capacidad instalada',
  'modal.te.description': 'Descripción técnica',
  'modal.go.model': 'Modelo organizativo',
  'modal.go.members': 'Número de miembros',
  'modal.go.ostrom': 'Principios de Ostrom',
  'modal.go.description': 'Descripción de gobernanza',
  'modal.rf.regulatoryDivide': 'Afectada por brecha regulatoria',
  'modal.rf.legalStatus': 'Estatus juridico',
  'modal.rf.financing': 'Mecanismo de financiamiento',
  'modal.rf.notes': 'Notas regulatorias',
  'modal.rf.description': 'Descripción regulatoria',
  'modal.as.scale': 'Escala de emancipación',
  'modal.as.level': 'Nivel {level}',
  'modal.as.level1': 'Dependencia',
  'modal.as.level3': 'Autonomía parcial',
  'modal.as.level5': 'Emancipación plena',
  'modal.as.impact': 'Impacto local',
  'modal.as.description': 'Descripción de apropiación social',
  'modal.tis.title': 'Funciones del Sistema de Innovación Tecnológica (TIS)',
  'modal.ostrom.1': '1. Límites definidos',
  'modal.ostrom.2': '2. Equivalencia costos/beneficios',
  'modal.ostrom.3': '3. Acuerdos colectivos',
  'modal.ostrom.4': '4. Monitoreo',
  'modal.ostrom.5': '5. Sanciones graduales',
  'modal.ostrom.6': '6. Mecanismos de resolución',
  'modal.ostrom.7': '7. Reconocimiento de derechos',
  'modal.ostrom.8': '8. Organización anidada',
  'modal.tis.1': 'F1: Actividades emprendedoras',
  'modal.tis.2': 'F2: Desarrollo de conocimiento',
  'modal.tis.3': 'F3: Difusión de conocimiento',
  'modal.tis.4': 'F4: Orientación de la búsqueda',
  'modal.tis.5': 'F5: Formación de mercado',
  'modal.tis.6': 'F6: Movilización de recursos',
  'modal.tis.7': 'F7: Legitimación',
};

const en: TranslationDictionary = {
  // ─── Language selector ─────
  'language.es': 'ES',
  'language.en': 'EN',
  'language.switchToEs': 'Switch to Spanish',
  'language.switchToEn': 'Switch to English',

  // ─── Header ────────────────
  'header.subtitle': 'Ibero-American Observatory · Energy Communities',
  'header.network': 'Thematic Network',
  'tabs.home': 'Home',
  'tabs.atlas': 'Interactive Atlas',
  'tabs.legislation': 'Legal Monitor',
  'tabs.catastro': 'Registry',
  'tabs.repository': 'Academic Repository',
  'tabs.ai': 'Conversational AI',
  'tabs.news': 'News',
  'tabs.members': 'RIPCEL Network',
  'tabs.links': 'Reports & Tools',

  // ─── Home Hero ─────────────
  'home.badge': 'CYTED RIPCEL Network',
  'home.hero.line1': 'Energy',
  'home.hero.line2': 'Communities in',
  'home.hero.line3': 'Ibero-America',
  'home.hero.subtitle': 'Open scientific platform for the diagnosis, implementation and comparative study of energy communities across <strong>15 countries</strong> in Ibero-America.',
  'home.hero.cta1': 'Explore Atlas',
  'home.hero.cta2': 'View Repository',
  'home.globe.hint': 'Select an Ibero-American country to explore its communities',

  // ─── Home Stats ────────────
  'home.stats.communities': 'Communities',
  'home.stats.countries': 'Countries',
  'home.stats.taxonomy': 'Taxonomy',
  'home.stats.participants': 'Participants',

  // ─── Home Sections ─────────
  'home.tools.title': 'Observatory Tools',
  'home.tools.subtitle': 'Integrated platform for data, regulation and comparative analysis for researchers and decision-makers.',
  'home.tools.access': 'Access',
  'home.section.atlas.title': 'Interactive Atlas',
  'home.section.atlas.desc': 'Georeferenced cartography of energy communities with 4D taxonomy (Technology, Governance, Regulation, Social Appropriation).',
  'home.section.legislation.title': 'Legislative Monitor',
  'home.section.legislation.desc': 'Tracking regulations on shared generation, collective self-consumption and associative frameworks across 15 countries.',
  'home.section.catastro.title': 'Registry',
  'home.section.catastro.desc': 'Standardized registry of energy communities under the RIPCEL scientific protocol.',
  'home.section.members.title': 'RIPCEL Network',
  'home.section.members.desc': 'Directory of researchers and institutions of the Ibero-American network across 15 countries.',

  // ─── Home About RIPCEL ─────
  'home.about.label': 'About RIPCEL',
  'home.about.title': 'Scientific Cooperation for a Just Energy Transition',
  'home.about.text': 'OICE is the open digital repository and comparative research analytics platform of the RIPCEL network, integrating 15 countries around the diagnosis, technical implementation and community participation studies within Ostrom/TIS frameworks.',
  'home.about.countriesLabel': 'RIPCEL Countries',
  'home.about.dimensionsLabel': 'Dimensions',


  // ─── Legislative Monitor ───
  'legislation.title': 'Legislative Monitor',
  'legislation.subtitle': 'Tracking regulations, laws and resolutions on shared generation and energy communities in Ibero-America.',
  'legislation.allCountries': 'All countries',
  'legislation.allTypes': 'All types',
  'legislation.empty': 'No regulations found for the selected filters.',

  // ─── Registration / Catastro
  'catastro.title': 'Energy Communities Registry',
  'catastro.badge': 'Coming Soon',
  'catastro.description': 'The registration portal will enable RIPCEL network members to identify, categorize and add new energy communities across Ibero-America using the standardized 4-dimension scientific protocol.',
  'catastro.protocol': 'Registration Protocol',
  'catastro.step1.label': 'Identification',
  'catastro.step1.desc': 'Name, location, country and coordinates',
  'catastro.step2.label': 'Technology (TE)',
  'catastro.step2.desc': 'Technology configuration and capacity',
  'catastro.step3.label': 'Governance (GO)',
  'catastro.step3.desc': 'Organizational model and Ostrom principles',
  'catastro.step4.label': 'Regulation (RF)',
  'catastro.step4.desc': 'Legal framework and financing mechanisms',
  'catastro.step5.label': 'Appropriation (AS)',
  'catastro.step5.desc': 'Social impact and emancipation level',

  // ─── Members ───────────────
  'members.title': 'RIPCEL Network',
  'members.subtitle': 'Directory of researchers, academic and institutional representatives of the Ibero-American Network for the Promotion of Local Energy Communities.',
  'members.searchPlaceholder': 'Search by name or institution...',
  'members.allCountries': 'All countries',
  'members.empty': 'No matches found for the search.',

  // ─── Footer ────────────────
  'footer.tagline': 'Ibero-American Observatory of Energy Communities',
  'footer.initiative': 'An initiative of the Thematic Network <strong>CYTED RIPCEL</strong> — Ibero-American Network for the Promotion of Local Energy Communities for a Just and Sustainable Transition.',

  // ─── Academic Repository ────
  'repo.title': 'Academic Repository',
  'repo.subtitle': 'Scientific library on energy communities, distributed generation cooperatives, Ostrom/TIS frameworks and social innovation in the Ibero-American energy transition.',
  'repo.searchPlaceholder': 'Search by title, author, journal...',
  'repo.resultCount.one': '{count} publication found',
  'repo.resultCount.many': '{count} publications found',
  'repo.yearFallback': 'N/A',
  'repo.readMore': 'Read more →',
  'repo.empty': 'No publications matched your search.',

  // ─── Conversational AI ─────
  'ai.title': 'RAG AI Assistant',
  'ai.badge': 'Coming Soon',
  'ai.description': 'We are training an advanced conversational engine based on the entire RIPCEL documentary ecosystem. Soon you will be able to query regulations, theoretical frameworks and energy community statistics interactively.',
  'ai.capabilities': 'Planned Capabilities',
  'ai.cap1': 'Regulatory framework queries by country',
  'ai.cap2': 'Comparative governance model analysis',
  'ai.cap3': 'Semantic search in academic repository',
  'ai.cap4': 'Recommendations based on 4D taxonomy',

  // ─── News ──────────────────
  'news.title': 'News',
  'news.subtitle': 'Latest updates on energy communities, regulation and cooperation in Ibero-America.',
  'news.allCountries': 'All countries',
  'news.empty': 'No news found for the selected filters.',

  // ─── Links ─────────────────
  'links.title': 'Useful Links',
  'links.subtitle': 'External resources, institutional portals and tools related to the energy communities ecosystem in Ibero-America.',
  'links.visit': 'Visit site',
  'links.tag.cooperation': 'Cooperation',
  'links.tag.reference': 'Reference',
  'links.tag.regulation': 'Regulation',
  'links.tag.financing': 'Financing',
  'links.tag.caseStudy': 'Case Study',
  'links.cyted.title': 'CYTED - Ibero-American Science and Technology Program',
  'links.cyted.desc': 'Scientific cooperation framework program that funds the RIPCEL Network and other thematic research networks.',
  'links.irena.title': 'IRENA - Community Energy Benefits',
  'links.irena.desc': 'International Renewable Energy Agency report on the benefits of the community energy model globally.',
  'links.idae.title': 'IDAE - Energy Communities (Spain)',
  'links.idae.desc': 'Portal of the Institute for Energy Diversification and Saving on Community Transformation Offices and the CER/CCE framework.',
  'links.minminas.title': 'MinMinas Colombia - Energy Communities',
  'links.minminas.desc': 'Portal of the Ministry of Mines and Energy of Colombia with the Unified Registry of Energy Communities (RUCE).',
  'links.agenciase.title': 'AgenciaSE Chile - Energy Access Fund',
  'links.agenciase.desc': 'Chile\'s Energy Sustainability Agency with competitive funds for vulnerable communities and territories.',
  'links.coopeguana.title': 'CoopeGuanacaste - Sustainability Report',
  'links.coopeguana.desc': 'GRI 2024 report of the most advanced rural electrification cooperative in Costa Rica.',

  // ─── Atlas / InteractiveMap ─
  'atlas.title': 'Interactive Atlas',
  'atlas.subtitle': '{count} communities in {countries} countries',
  'atlas.backAll': '← View all',
  'atlas.hideSidebar': 'Hide',
  'atlas.showSidebar': 'Show',
  'atlas.communityPanel': 'Communities in {country}',
  'atlas.members': 'members',
  'atlas.viewTaxonomy': 'View 4D taxonomy →',
  'atlas.popup.viewDimensions': 'View dimensions →',
  'atlas.legend.activa': 'Active',
  'atlas.legend.incubacion': 'Incubating',
  'atlas.legend.estancada': 'Stalled',
  'atlas.legend.abandonada': 'Abandoned',
  'atlas.inCountry': '{count} communities',

  // ─── ProjectDetailModal ─────
  'modal.close': 'Close',
  'modal.closeAria': 'Close modal',
  'modal.tab.technology': 'Technology',
  'modal.tab.governance': 'Governance',
  'modal.tab.regulation': 'Regulation',
  'modal.tab.social': 'Appropriation',
  'modal.tab.tis': 'TIS Functions',
  'modal.te.config': 'Technology configuration',
  'modal.te.capacity': 'Installed capacity',
  'modal.te.description': 'Technical description',
  'modal.go.model': 'Organizational model',
  'modal.go.members': 'Number of members',
  'modal.go.ostrom': 'Ostrom Principles',
  'modal.go.description': 'Governance description',
  'modal.rf.regulatoryDivide': 'Affected by regulatory divide',
  'modal.rf.legalStatus': 'Legal status',
  'modal.rf.financing': 'Financing mechanism',
  'modal.rf.notes': 'Regulatory notes',
  'modal.rf.description': 'Regulatory description',
  'modal.as.scale': 'Emancipation scale',
  'modal.as.level': 'Level {level}',
  'modal.as.level1': 'Dependence',
  'modal.as.level3': 'Partial autonomy',
  'modal.as.level5': 'Full emancipation',
  'modal.as.impact': 'Local impact',
  'modal.as.description': 'Social appropriation description',
  'modal.tis.title': 'Technological Innovation System (TIS) Functions',
  'modal.ostrom.1': '1. Defined boundaries',
  'modal.ostrom.2': '2. Cost/benefit equivalence',
  'modal.ostrom.3': '3. Collective agreements',
  'modal.ostrom.4': '4. Monitoring',
  'modal.ostrom.5': '5. Graduated sanctions',
  'modal.ostrom.6': '6. Conflict resolution mechanisms',
  'modal.ostrom.7': '7. Recognition of rights',
  'modal.ostrom.8': '8. Nested organization',
  'modal.tis.1': 'F1: Entrepreneurial activities',
  'modal.tis.2': 'F2: Knowledge development',
  'modal.tis.3': 'F3: Knowledge diffusion',
  'modal.tis.4': 'F4: Guidance of the search',
  'modal.tis.5': 'F5: Market formation',
  'modal.tis.6': 'F6: Resource mobilization',
  'modal.tis.7': 'F7: Legitimation',
};

const translations: Record<Language, TranslationDictionary> = { es, en };

const LANGUAGE_STORAGE_KEY = 'oice-language';

const interpolate = (template: string, vars?: Record<string, string | number>) => {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    const value = vars[key];
    return value === undefined || value === null ? match : String(value);
  });
};

const translate = (language: Language, key: string, vars?: Record<string, string | number>) => {
  const template = translations[language][key] ?? translations.es[key] ?? key;
  return interpolate(template, vars);
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window === 'undefined') return 'es';
    const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === 'en' || stored === 'es') return stored;
    return 'es';
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => translate(language, key, vars),
    [language]
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
