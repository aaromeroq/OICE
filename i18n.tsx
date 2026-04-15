import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'es' | 'en';

type TranslationKey =
  | 'language.es'
  | 'language.en'
  | 'language.switchToEs'
  | 'language.switchToEn'
  | 'header.subtitleLine1'
  | 'header.subtitleLine2'
  | 'tabs.home'
  | 'tabs.atlas'
  | 'tabs.repository'
  | 'tabs.news'
  | 'tabs.ai'
  | 'tabs.links'
  | 'hero.title'
  | 'hero.subtitle'
  | 'home.section.atlas.title'
  | 'home.section.atlas.description'
  | 'home.section.repository.title'
  | 'home.section.repository.description'
  | 'home.section.ai.title'
  | 'home.section.ai.description'
  | 'home.section.links.title'
  | 'home.section.links.description'
  | 'home.explore'
  | 'news.title'
  | 'news.subtitle'
  | 'news.loading'
  | 'news.error'
  | 'news.empty'
  | 'news.sourcesTitle'
  | 'news.apiKeyMissing'
  | 'repo.title'
  | 'repo.subtitle'
  | 'repo.searchHint'
  | 'repo.searchPlaceholder'
  | 'repo.searchAria'
  | 'repo.searchButton'
  | 'repo.searchingButton'
  | 'repo.loading'
  | 'repo.errorTitle'
  | 'repo.errorMessage'
  | 'repo.empty'
  | 'repo.card.yearFallback'
  | 'repo.card.journalFallback'
  | 'repo.card.authorsFallback'
  | 'repo.card.abstractFallback'
  | 'repo.card.readMore'
  | 'links.title'
  | 'links.subtitle'
  | 'links.visit'
  | 'links.items.report.title'
  | 'links.items.report.description'
  | 'links.items.tool.title'
  | 'links.items.tool.description'
  | 'footer.rights'
  | 'footer.tagline'
  | 'ai.title'
  | 'ai.subtitle'
  | 'ai.welcomeTitle'
  | 'ai.welcomeSubtitle'
  | 'ai.guidedLabel'
  | 'ai.question.whoPays'
  | 'ai.question.howPays'
  | 'ai.question.whoRisks'
  | 'ai.question.stateParticipation'
  | 'ai.question.benefitTransfers'
  | 'ai.placeholder'
  | 'ai.error'
  | 'ai.avatar'
  | 'ai.presetPrompt'
  | 'ai.systemReady'
  | 'ai.userPrompt'
  | 'map.region.global'
  | 'map.region.centralNorthAmerica'
  | 'map.region.southAmerica'
  | 'map.region.europe'
  | 'map.region.asia'
  | 'map.capacity'
  | 'modal.closeAria'
  | 'modal.modelType'
  | 'modal.summary'
  | 'modal.keyFeatures'
  | 'modal.challenges'
  | 'modal.close';

type TranslationDictionary = Record<TranslationKey, string>;

const translations: Record<Language, TranslationDictionary> = {
  es: {
    'language.es': 'ES',
    'language.en': 'EN',
    'language.switchToEs': 'Cambiar a español',
    'language.switchToEn': 'Cambiar a inglés',
    'header.subtitleLine1': 'Observatorio de Integración',
    'header.subtitleLine2': 'Regional de Sistemas Eléctricos',
    'tabs.home': 'Home',
    'tabs.atlas': 'Atlas Interactivo',
    'tabs.repository': 'Repositorio Académico',
    'tabs.news': 'Noticias y Alertas',
    'tabs.ai': 'IA Conversacional',
    'tabs.links': 'Reportes y Herramientas',
    'hero.title': 'Observatorio de Integración Regional de Sistemas Eléctricos',
    'hero.subtitle':
      'Un observatorio interactivo que mapea casos de estudio globales, conocimientos académicos y las últimas noticias para acelerar la interconexión eléctrica en América Latina y el Caribe.',
    'home.section.atlas.title': 'Atlas Interactivo',
    'home.section.atlas.description':
      'Visualice proyectos de interconexión eléctrica en todo el mundo y explore sus modelos de gobernanza y desafíos.',
    'home.section.repository.title': 'Repositorio Académico',
    'home.section.repository.description':
      'Acceda a las últimas investigaciones y publicaciones académicas sobre integración energética y mercados eléctricos.',
    'home.section.ai.title': 'IA Conversacional',
    'home.section.ai.description':
      'Haga preguntas complejas a nuestro asistente de IA entrenado con los documentos y datos del observatorio.',
    'home.section.links.title': 'Enlaces de Interés',
    'home.section.links.description':
      'Descubra informes completos, herramientas de visualización de datos y recursos adicionales para su investigación.',
    'home.explore': 'Explorar Sección →',
    'news.title': 'Noticias y Alertas',
    'news.subtitle':
      'Manténgase actualizado con los últimos avances en integración energética, impulsado por Gemini y Google Search.',
    'news.loading': 'Consultando a la IA para las últimas noticias...',
    'news.error':
      'No se pudieron cargar las noticias. La IA no respondió como se esperaba o hubo un problema de conexión.',
    'news.empty': 'No se encontraron noticias relevantes en este momento.',
    'news.sourcesTitle': 'Fuentes Consultadas',
    'news.apiKeyMissing': 'La clave de API de Gemini no está configurada.',
    'repo.title': 'Repositorio Académico',
    'repo.subtitle':
      'Explore el estado del arte en la investigación sobre interconexiones energéticas, impulsado por Semantic Scholar.',
    'repo.searchHint': 'Siempre buscamos con “{baseQuery}”; el texto del cuadro se concatena al final.',
    'repo.searchPlaceholder': 'Añada filtros como país, tecnología, etc.',
    'repo.searchAria': 'Buscar publicaciones',
    'repo.searchButton': 'Buscar',
    'repo.searchingButton': 'Buscando...',
    'repo.loading': 'Buscando en la literatura académica...',
    'repo.errorTitle': 'Ocurrió un error',
    'repo.errorMessage':
      'No se pudieron obtener los resultados. Por favor, inténtelo de nuevo más tarde. ({error})',
    'repo.empty': 'No se encontraron publicaciones que coincidan con su búsqueda.',
    'repo.card.yearFallback': 'Año no disponible',
    'repo.card.journalFallback': 'Publicación no especificada',
    'repo.card.authorsFallback': 'Autores no listados',
    'repo.card.abstractFallback': 'Resumen no disponible.',
    'repo.card.readMore': 'Leer Más →',
    'links.title': 'Enlaces de Interés',
    'links.subtitle': 'Explore recursos adicionales y herramientas relacionadas con la integración energética.',
    'links.visit': 'Visitar Sitio',
    'links.items.report.title': 'Informe: integracion.energia.la',
    'links.items.report.description':
      'El informe completo que sirve de base para este observatorio. Profundice en el análisis detallado de los modelos de gobernanza, los estudios de caso y las recomendaciones de políticas para la integración energética en América Latina y el Caribe.',
    'links.items.tool.title': 'Herramienta: explorer.energia.la',
    'links.items.tool.description':
      'Una herramienta de visualización de datos interactiva que complementa este atlas. Explore datos de inversión, capacidad de transmisión y generación renovable en toda la región para obtener una comprensión más profunda del panorama energético.',
    'footer.rights': 'Observatorio de Interconexiones. Todos los derechos reservados.',
    'footer.tagline':
      'Construyendo un futuro energético resiliente e integrado para América Latina y el Caribe.',
    'ai.title': 'IA Conversacional',
    'ai.subtitle': 'Dialoga con un asistente experto entrenado con los documentos del observatorio.',
    'ai.welcomeTitle': 'Bienvenido al asistente de IA.',
    'ai.welcomeSubtitle': 'Selecciona un modelo y haz una pregunta para comenzar.',
    'ai.guidedLabel': 'Consultas Guiadas sobre un Modelo de Interconexión:',
    'ai.question.whoPays': '¿Quién paga?',
    'ai.question.howPays': '¿Cómo se paga?',
    'ai.question.whoRisks': '¿Quién toma los riesgos?',
    'ai.question.stateParticipation': '¿Cómo participaron los Estados?',
    'ai.question.benefitTransfers': '¿Transferencias de beneficios?',
    'ai.placeholder': 'Escribe tu pregunta aquí...',
    'ai.error': 'La IA no pudo responder.',
    'ai.avatar': 'IA',
    'ai.presetPrompt': 'Sobre el modelo de {interconnection}, {question}',
    'ai.systemReady':
      'Entendido. Estoy listo para responder preguntas basándome exclusivamente en el documento proporcionado.',
    'ai.userPrompt': 'Pregunta del usuario: "{question}"\nResponde basándote únicamente en el documento.',
    'map.region.global': 'Global',
    'map.region.centralNorthAmerica': 'América Central y del Norte',
    'map.region.southAmerica': 'América del Sur',
    'map.region.europe': 'Europa',
    'map.region.asia': 'Asia',
    'map.capacity': 'Capacidad',
    'modal.closeAria': 'Cerrar modal',
    'modal.modelType': 'Tipo de Modelo',
    'modal.summary': 'Resumen',
    'modal.keyFeatures': 'Características Clave',
    'modal.challenges': 'Desafíos',
    'modal.close': 'Cerrar'
  },
  en: {
    'language.es': 'ES',
    'language.en': 'EN',
    'language.switchToEs': 'Switch to Spanish',
    'language.switchToEn': 'Switch to English',
    'header.subtitleLine1': 'Integration Observatory',
    'header.subtitleLine2': 'Regional Power Systems',
    'tabs.home': 'Home',
    'tabs.atlas': 'Interactive Atlas',
    'tabs.repository': 'Academic Repository',
    'tabs.news': 'News & Alerts',
    'tabs.ai': 'Conversational AI',
    'tabs.links': 'Reports & Tools',
    'hero.title': 'Regional Power Systems Integration Observatory',
    'hero.subtitle':
      'An interactive observatory mapping global case studies, academic knowledge, and the latest news to accelerate electric interconnection in Latin America and the Caribbean.',
    'home.section.atlas.title': 'Interactive Atlas',
    'home.section.atlas.description':
      'Visualize electricity interconnection projects worldwide and explore governance models and challenges.',
    'home.section.repository.title': 'Academic Repository',
    'home.section.repository.description':
      'Access the latest research and academic publications on energy integration and electricity markets.',
    'home.section.ai.title': 'Conversational AI',
    'home.section.ai.description':
      'Ask complex questions to our AI assistant trained on the observatory documents and data.',
    'home.section.links.title': 'Useful Links',
    'home.section.links.description':
      'Discover in-depth reports, data visualization tools, and additional resources for your research.',
    'home.explore': 'Explore Section →',
    'news.title': 'News & Alerts',
    'news.subtitle':
      'Stay up to date with the latest developments in energy integration, powered by Gemini and Google Search.',
    'news.loading': 'Querying AI for the latest news...',
    'news.error':
      'Unable to load news. The AI did not respond as expected or there was a connection problem.',
    'news.empty': 'No relevant news found at the moment.',
    'news.sourcesTitle': 'Sources Consulted',
    'news.apiKeyMissing': 'Gemini API key is not configured.',
    'repo.title': 'Academic Repository',
    'repo.subtitle':
      'Explore the state of the art in energy interconnection research, powered by Semantic Scholar.',
    'repo.searchHint': 'We always search for “{baseQuery}”; the input text is appended to it.',
    'repo.searchPlaceholder': 'Add filters like country, technology, etc.',
    'repo.searchAria': 'Search publications',
    'repo.searchButton': 'Search',
    'repo.searchingButton': 'Searching...',
    'repo.loading': 'Searching academic literature...',
    'repo.errorTitle': 'An error occurred',
    'repo.errorMessage': 'Unable to fetch results. Please try again later. ({error})',
    'repo.empty': 'No publications matched your search.',
    'repo.card.yearFallback': 'Year unavailable',
    'repo.card.journalFallback': 'Publication not specified',
    'repo.card.authorsFallback': 'Authors not listed',
    'repo.card.abstractFallback': 'Abstract unavailable.',
    'repo.card.readMore': 'Read More →',
    'links.title': 'Useful Links',
    'links.subtitle': 'Explore additional resources and tools related to energy integration.',
    'links.visit': 'Visit Site',
    'links.items.report.title': 'Report: integracion.energia.la',
    'links.items.report.description':
      'The full report that underpins this observatory. Dive into detailed analysis of governance models, case studies, and policy recommendations for energy integration in Latin America and the Caribbean.',
    'links.items.tool.title': 'Tool: explorer.energia.la',
    'links.items.tool.description':
      'An interactive data visualization tool that complements this atlas. Explore investment data, transmission capacity, and renewable generation across the region for a deeper understanding of the energy landscape.',
    'footer.rights': 'Interconnections Observatory. All rights reserved.',
    'footer.tagline':
      'Building a resilient and integrated energy future for Latin America and the Caribbean.',
    'ai.title': 'Conversational AI',
    'ai.subtitle': 'Chat with an expert assistant trained on the observatory documents.',
    'ai.welcomeTitle': 'Welcome to the AI assistant.',
    'ai.welcomeSubtitle': 'Select a model and ask a question to get started.',
    'ai.guidedLabel': 'Guided Queries About an Interconnection Model:',
    'ai.question.whoPays': 'Who pays?',
    'ai.question.howPays': 'How is it paid?',
    'ai.question.whoRisks': 'Who takes the risks?',
    'ai.question.stateParticipation': 'How did governments participate?',
    'ai.question.benefitTransfers': 'Benefit transfers?',
    'ai.placeholder': 'Type your question here...',
    'ai.error': 'The AI could not respond.',
    'ai.avatar': 'AI',
    'ai.presetPrompt': 'Regarding the {interconnection} model, {question}',
    'ai.systemReady': 'Understood. I am ready to answer questions based exclusively on the provided document.',
    'ai.userPrompt': 'User question: "{question}"\nAnswer based only on the document.',
    'map.region.global': 'Global',
    'map.region.centralNorthAmerica': 'Central & North America',
    'map.region.southAmerica': 'South America',
    'map.region.europe': 'Europe',
    'map.region.asia': 'Asia',
    'map.capacity': 'Capacity',
    'modal.closeAria': 'Close modal',
    'modal.modelType': 'Model Type',
    'modal.summary': 'Summary',
    'modal.keyFeatures': 'Key Features',
    'modal.challenges': 'Challenges',
    'modal.close': 'Close'
  }
};

const LANGUAGE_STORAGE_KEY = 'oirse-language';

const interpolate = (template: string, vars?: Record<string, string | number>) => {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    const value = vars[key];
    return value === undefined || value === null ? match : String(value);
  });
};

const translate = (language: Language, key: TranslationKey, vars?: Record<string, string | number>) => {
  const template = translations[language][key] ?? translations.es[key] ?? key;
  return interpolate(template, vars);
};

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
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
    (key: TranslationKey, vars?: Record<string, string | number>) => translate(language, key, vars),
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
