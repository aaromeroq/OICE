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

interface DimensionConfig {
  id: 'TE' | 'GO' | 'RF' | 'AS';
  title: string;
  colorTheme: {
    primary: string;
    primaryText: string;
    border: string;
    bg: string;
    glow: string;
    lineStroke: string;
    nodeFill: string;
    nodeStroke: string;
  };
  nodes: MindMapNode[];
  connections: { fromX: number; fromY: number; toX: number; toY: number; isCurve?: boolean }[];
  categories: { id: string; label: string; color: string }[];
}

const dimensions: DimensionConfig[] = [
  // ==========================================
  // 1. DIMENSIÓN TECNOLÓGICA (TE)
  // ==========================================
  {
    id: 'TE',
    title: 'Dimensión Tecnológica (TE)',
    colorTheme: {
      primary: '#3C8EAF', // Azul CYTED
      primaryText: 'text-[#3C8EAF]',
      border: 'border-[#3C8EAF]',
      bg: 'bg-[#3C8EAF]/10',
      glow: '#3C8EAF',
      lineStroke: '#3C8EAF',
      nodeFill: '#EAF4F8',
      nodeStroke: '#3C8EAF'
    },
    categories: [
      { id: 'Generation Hardware', label: 'Hardware de Generación', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
      { id: 'Storage', label: 'Almacenamiento', color: 'bg-blue-50 text-blue-700 border-blue-200' },
      { id: 'Grid Context', label: 'Contexto de Red', color: 'bg-amber-50 text-amber-700 border-amber-200' },
      { id: 'Management Software', label: 'Software de Gestión', color: 'bg-purple-50 text-purple-700 border-purple-200' },
      { id: 'Emerging Tech', label: 'Tecnologías Emergentes', color: 'bg-rose-50 text-rose-700 border-rose-200' },
      { id: 'Cybersecurity', label: 'Ciberseguridad', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' }
    ],
    connections: [
      // Centro a Ramas
      { fromX: 480, fromY: 310, toX: 270, toY: 410, isCurve: true },
      { fromX: 480, fromY: 310, toX: 480, toY: 490, isCurve: true },
      { fromX: 480, fromY: 310, toX: 690, toY: 410, isCurve: true },
      { fromX: 480, fromY: 310, toX: 650, toY: 200, isCurve: true },
      { fromX: 480, fromY: 310, toX: 480, toY: 130, isCurve: true },
      { fromX: 480, fromY: 310, toX: 310, toY: 200, isCurve: true },
      // Ramas a Subnodos (Coordenadas ajustadas para evitar que se corten abajo)
      { fromX: 270, fromY: 410, toX: 160, toY: 350 },
      { fromX: 270, fromY: 410, toX: 120, toY: 415 },
      { fromX: 270, fromY: 410, toX: 130, toY: 480 },
      { fromX: 270, fromY: 410, toX: 180, toY: 530 },
      { fromX: 480, fromY: 490, toX: 370, toY: 560 },
      { fromX: 480, fromY: 490, toX: 480, toY: 570 },
      { fromX: 480, fromY: 490, toX: 590, toY: 560 },
      { fromX: 690, fromY: 410, toX: 810, toY: 350 },
      { fromX: 690, fromY: 410, toX: 830, toY: 410 },
      { fromX: 690, fromY: 410, toX: 815, toY: 470 },
      { fromX: 690, fromY: 410, toX: 755, toY: 530 },
      { fromX: 650, fromY: 200, toX: 760, toY: 150 },
      { fromX: 650, fromY: 200, toX: 780, toY: 80 },
      { fromX: 480, fromY: 130, toX: 350, toY: 60 },
      { fromX: 480, fromY: 130, toX: 480, toY: 45 },
      { fromX: 480, fromY: 130, toX: 610, toY: 60 },
      { fromX: 310, fromY: 200, toX: 180, toY: 130 },
      { fromX: 310, fromY: 200, toX: 150, toY: 200 }
    ],
    nodes: [
      { id: 'center', label: 'Dimensión Tecnológica', x: 480, y: 310, r: 68, isMain: true, definition: 'Eje principal de la taxonomía RIPCEL enfocado en caracterizar la infraestructura de generación, almacenamiento, configuración de red y herramientas digitales de la comunidad.' },
      { id: 'branch-gen', label: 'Hardware de Generación', x: 270, y: 410, r: 48, isMain: true, definition: 'Equipos físicos dedicados a transformar recursos renovables locales (solar, eólica, biomasa, etc.) en energía utilizable.' },
      { id: 'branch-store', label: 'Almacenamiento', x: 480, y: 490, r: 48, isMain: true, definition: 'Sistemas que guardan excedentes de energía (térmica, electroquímica o química) para liberarla cuando no hay producción.' },
      { id: 'branch-grid', label: 'Contexto de Red', x: 690, y: 410, r: 48, isMain: true, definition: 'El entorno de red eléctrica donde se inserta la comunidad: conectada en área urbana o rural, microrred local o aislada.' },
      { id: 'branch-mgmt', label: 'Software de Gestión', x: 650, y: 200, r: 48, isMain: true, definition: 'Plataformas digitales y de automatización (EMS, SCADA) para monitorear flujos, predecir consumos y optimizar la red.' },
      { id: 'branch-emerge', label: 'Tecnologías Emergentes', x: 480, y: 130, r: 48, isMain: true, definition: 'Tecnologías disruptivas aplicadas a la energía, como transacciones P2P vía Blockchain, plantas virtuales (VPP) o Gemelos Digitales.' },
      { id: 'branch-cyber', label: 'Ciberseguridad', x: 310, y: 200, r: 48, isMain: true, definition: 'Medidas de protección de los datos y del control operativo contra hackeos, manipulaciones o accesos no autorizados.' },
      { id: 'Solar FV', label: 'Solar FV', x: 160, y: 350, r: 32, definition: 'Paneles fotovoltaicos que convierten la luz solar directamente en electricidad; la tecnología de generación más común en las comunidades energéticas.' },
      { id: 'Eólica', label: 'Eólica', x: 120, y: 415, r: 32, definition: 'Aerogeneradores de pequeña escala utilizados para la generación eléctrica local.' },
      { id: 'Biomasa', label: 'Biomasa', x: 130, y: 480, r: 32, definition: 'Materiales orgánicos (residuos agrícolas, madera, etc.) utilizados para generación de calor o electricidad en comunidades rurales.' },
      { id: 'Mini-hidráulica', label: 'Mini-Hidráulica', x: 180, y: 530, r: 32, definition: 'Centrales minihidráulicas o microhidráulicas que aprovechan corrientes de agua locales sin grandes embalses.' },
      { id: 'Baterías', label: 'Baterías', x: 370, y: 560, r: 32, definition: 'Dispositivos de almacenamiento electroquímico (litio, plomo-ácido, etc.) para flexibilidad a corto y mediano plazo.' },
      { id: 'Alm. Térmico', label: 'Alm. Térmico', x: 480, y: 570, r: 32, definition: 'Sistemas que almacenan calor (sales fundidas, tanques de agua caliente) para calefacción o generación posterior.' },
      { id: 'H2 Verde', label: 'H2 Verde', x: 590, y: 560, r: 32, definition: 'Hidrógeno producido a partir de electricidad renovable mediante electrólisis para almacenamiento a largo plazo.' },
      { id: 'Microrred', label: 'Microrred', x: 810, y: 350, r: 32, definition: 'Una red local autocontrolada que puede funcionar conectada a la red principal o en modo de isla energética.' },
      { id: 'Red Urbana', label: 'Red Urbana', x: 830, y: 410, r: 32, definition: 'Comunidades energéticas ubicadas en ciudades, típicamente conectadas a una red de distribución eléctrica fuerte.' },
      { id: 'Red Rural', label: 'Red Rural', x: 815, y: 470, r: 32, definition: 'Comunidades energéticas en áreas de baja densidad de población, a menudo con conexiones de red débiles o aisladas.' },
      { id: 'Red Aislada', label: 'Red Aislada', x: 755, y: 530, r: 32, definition: 'Sistemas eléctricos aislados que requieren altos niveles de autosuficiencia y control de frecuencia/voltaje.' },
      { id: 'SGE Básico', label: 'SGE Básico', x: 760, y: 150, r: 32, definition: 'Sistema de Gestión de Energía con funciones básicas de monitoreo de flujos y adquisición de datos.' },
      { id: 'SGE Inteligente', label: 'SGE Inteligente', x: 780, y: 80, r: 32, definition: 'Sistemas avanzados de gestión energética que utilizan algoritmos de inteligencia artificial para control predictivo.' },
      { id: 'VPP / V2G', label: 'VPP / V2G', x: 350, y: 60, r: 32, definition: 'Planta de Energía Virtual (VPP) y Vehículo a la Red (V2G - inyección bidireccional desde autos eléctricos).' },
      { id: 'Blockchain', label: 'Blockchain', x: 480, y: 45, r: 32, definition: 'Tecnología de registro distribuido descentralizado que habilita transacciones directas de energía P2P.' },
      { id: 'Gemelos Digitales', label: 'Gemelos Dig.', x: 610, y: 60, r: 32, definition: 'Réplicas virtuales digitales de sistemas energéticos físicos reales para simulaciones y pruebas.' },
      { id: 'Cifrado', label: 'Cifrado', x: 180, y: 130, r: 32, definition: 'Protección criptográfica de las comunicaciones digitales de control y datos telemétricos.' },
      { id: 'Control Acceso', label: 'Control Acceso', x: 150, y: 200, r: 32, definition: 'Políticas y mecanismos de seguridad de red que restringen qué usuarios o dispositivos externos acceden al sistema.' }
    ]
  },
  // ==========================================
  // 2. DIMENSIÓN DE GOBERNANZA (GO)
  // ==========================================
  {
    id: 'GO',
    title: 'Dimensión de Gobernanza (GO)',
    colorTheme: {
      primary: '#10B981', // Verde esmeralda
      primaryText: 'text-[#10B981]',
      border: 'border-[#10B981]',
      bg: 'bg-[#10B981]/10',
      glow: '#10B981',
      lineStroke: '#10B981',
      nodeFill: '#ECFDF5',
      nodeStroke: '#10B981'
    },
    categories: [
      { id: 'Organizational Model', label: 'Modelo Organizativo', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
      { id: 'Decision Making', label: 'Toma de Decisiones', color: 'bg-teal-50 text-teal-700 border-teal-200' },
      { id: 'Participation Equity', label: 'Equidad de Participación', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
      { id: 'Transparency', label: 'Transparencia', color: 'bg-blue-50 text-blue-700 border-blue-200' },
      { id: 'Human Capacities', label: 'Capacidades Humanas', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
      { id: 'Accountability Conflict Resolution', label: 'Resolución de Conflictos', color: 'bg-purple-50 text-purple-700 border-purple-200' },
      { id: 'Lifecycle', label: 'Ciclo de Vida', color: 'bg-amber-50 text-amber-700 border-amber-200' }
    ],
    connections: [
      // Centro a Ramas
      { fromX: 480, fromY: 310, toX: 240, toY: 410, isCurve: true },
      { fromX: 480, fromY: 310, toX: 480, toY: 490, isCurve: true },
      { fromX: 480, fromY: 310, toX: 690, toY: 430, isCurve: true },
      { fromX: 480, fromY: 310, toX: 780, toY: 270, isCurve: true },
      { fromX: 480, fromY: 310, toX: 660, toY: 180, isCurve: true },
      { fromX: 480, fromY: 310, toX: 480, toY: 140, isCurve: true },
      { fromX: 480, fromY: 310, toX: 310, toY: 200, isCurve: true },
      // Ramas a Subnodos (Coordenadas e interconexiones corregidas para cero superposición y alineación inferior)
      { fromX: 240, fromY: 410, toX: 200, toY: 540 },
      { fromX: 240, fromY: 410, toX: 120, toY: 490 },
      { fromX: 240, fromY: 410, toX: 90, toY: 410 },
      { fromX: 240, fromY: 410, toX: 160, toY: 340 },
      { fromX: 480, fromY: 490, toX: 600, toY: 550 },
      { fromX: 480, fromY: 490, toX: 510, toY: 570 },
      { fromX: 480, fromY: 490, toX: 420, toY: 570 },
      { fromX: 480, fromY: 490, toX: 330, toY: 550 },
      { fromX: 690, fromY: 430, toX: 800, toY: 390 },
      { fromX: 690, fromY: 430, toX: 830, toY: 460 },
      { fromX: 690, fromY: 430, toX: 780, toY: 530 },
      { fromX: 780, fromY: 270, toX: 880, toY: 260 },
      { fromX: 780, fromY: 270, toX: 870, toY: 340 },
      { fromX: 780, fromY: 270, toX: 830, toY: 180 },
      { fromX: 660, fromY: 180, toX: 720, toY: 90 },
      { fromX: 660, fromY: 180, toX: 620, toY: 60 },
      { fromX: 480, fromY: 140, toX: 360, toY: 90 },
      { fromX: 480, fromY: 140, toX: 460, toY: 50 },
      { fromX: 480, fromY: 140, toX: 550, toY: 70 },
      { fromX: 310, fromY: 200, toX: 180, toY: 130 },
      { fromX: 310, fromY: 200, toX: 150, toY: 200 },
      { fromX: 310, fromY: 200, toX: 210, toY: 270 }
    ],
    nodes: [
      { id: 'center', label: 'Gobernanza Comunitaria', x: 480, y: 310, r: 68, isMain: true, definition: 'Evalúa la estructura de organización social y la dinámica política de la comunidad energética, analizando el tipo de propiedad, la equidad, los canales de decisión y la aplicación de los principios de Elinor Ostrom.' },
      { id: 'branch-org', label: 'Modelo Organizativo', x: 240, y: 410, r: 48, isMain: true, definition: 'Estudia las estructuras jurídicas y sociales adoptadas para dotar a la comunidad de personería legal o representatividad formal.' },
      { id: 'branch-dec', label: 'Toma de Decisiones', x: 480, y: 490, r: 48, isMain: true, definition: 'Mecanismos que rigen el ejercicio del voto, la delegación del mismo y la alternancia o el tipo de liderazgo al interior de la comunidad.' },
      { id: 'branch-part', label: 'Equidad de Participación', x: 690, y: 430, r: 48, isMain: true, definition: 'Iniciativas y protocolos orientados a garantizar la presencia, voz y voto de grupos vulnerables, jóvenes, ancianos y con perspectiva de género.' },
      { id: 'branch-trans', label: 'Transparencia', x: 780, y: 270, r: 48, isMain: true, definition: 'Acceso a la información sobre consumos, balances financieros y decisiones de junta directiva mediante canales formales o políticas de datos abiertos.' },
      { id: 'branch-cap', label: 'Capacidades Humanas', x: 660, y: 180, r: 48, isMain: true, definition: 'Nivel de competencias técnicas de los miembros y la capacidad para incorporar talento profesional en la operación del sistema.' },
      { id: 'branch-acc', label: 'Rendición y Resolución', x: 480, y: 140, r: 48, isMain: true, definition: 'Protocolos de solución de conflictos vecinales, revocatoria de cargos directivos y auditoría social recíproca.' },
      { id: 'branch-life', label: 'Ciclo de Vida', x: 310, y: 200, r: 48, isMain: true, definition: 'Las diferentes fases en la evolución de la comunidad: desde la planificación y diseño inicial hasta la fase de escala y expansión.' },
      { id: 'Cooperativa', label: 'Cooperativa', x: 200, y: 540, r: 32, definition: 'Forma jurídica donde los miembros poseen y controlan democráticamente la comunidad bajo el principio de un miembro, un voto.' },
      { id: 'Asociación', label: 'Asociación', x: 120, y: 490, r: 32, definition: 'Entidad legal sin fines de lucro común para iniciativas comunitarias; menos estricta pero con posibles trabas en comercialización comercial.' },
      { id: 'Autogobierno Indígena', label: 'Autogobierno Indígena', x: 90, y: 410, r: 32, definition: 'Estructuras de gobernanza basadas en autoridades tradicionales y normas consuetudinarias de pueblos indígenas, reconocidas internamente.' },
      { id: 'Iniciativa Informal', label: 'Iniciativa Informal', x: 160, y: 340, r: 32, definition: 'Comunidades que operan de facto, sin personería jurídica formal, basándose enteramente en la confianza y el tejido social.' },
      { id: 'Un Socio Un Voto', label: 'Un Socio Un Voto', x: 600, y: 550, r: 32, definition: 'La regla democrática básica de las cooperativas donde cada miembro tiene el mismo peso electoral independientemente de su capital.' },
      { id: 'Voto por Consumo', label: 'Voto por Consumo', x: 510, y: 570, r: 32, definition: 'Poder de voto proporcional al consumo anual de energía o a la inversión económica, priorizando la escala de riesgo financiero.' },
      { id: 'Delegación Líquida', label: 'Delegación Líquida', x: 420, y: 570, r: 32, definition: 'Sistema híbrido donde los miembros pueden votar directamente o delegar su representación en expertos, revocable de forma inmediata.' },
      { id: 'Liderazgo Rotativo', label: 'Liderazgo Rotativo', x: 330, y: 550, r: 32, definition: 'Analiza la alternancia periódica de directivos frente a la concentración o permanencia de los mismos líderes.' },
      { id: 'Equidad de Género', label: 'Equidad de Género', x: 800, y: 390, r: 32, definition: 'Medidas organizativas para asegurar una participación equilibrada entre géneros en asambleas y cargos directivos.' },
      { id: 'Inclusión Etaria', label: 'Inclusión Etaria', x: 830, y: 460, r: 32, definition: 'Disposiciones destinadas a garantizar la representación activa de jóvenes y ancianos en las decisiones del proyecto.' },
      { id: 'Inclusión Vulnerabilidad', label: 'Inclusión Vulnerabilidad', x: 780, y: 530, r: 32, definition: 'Mecanismos específicos para integrar activamente a hogares en situación de pobreza energética.' },
      { id: 'Canales Formales', label: 'Canales Formales', x: 880, y: 260, r: 32, definition: 'Medios oficiales de comunicación: actas oficiales de asambleas registradas, cartas escritas o asambleas generales.' },
      { id: 'Canales Informales', label: 'Canales Informales', x: 870, y: 340, r: 32, definition: 'Medios ágiles de mensajería (WhatsApp, redes sociales) o comunicación de boca a boca que fortalecen la cercanía.' },
      { id: 'Datos Abiertos', label: 'Datos Abiertos', x: 830, y: 180, r: 32, definition: 'Política de libre acceso para los miembros a los datos de generación, consumo agregado y balances económicos.' },
      { id: 'Capacitación', label: 'Capacitación', x: 720, y: 90, r: 32, definition: 'Capacitación y educación continua de los miembros de la comunidad en habilidades técnicas, administrativas y de toma de decisiones democráticas.' },
      { id: 'Profesional', label: 'Profesional', x: 620, y: 60, r: 32, definition: 'Nivel en el que la comunidad energética contrata especialistas profesionales externos frente a la dependencia exclusiva del voluntariado.' },
      { id: 'Control Social', label: 'Control Social', x: 360, y: 90, r: 32, definition: 'Supervisión y auditoría social recíproca entre los miembros de la comunidad para verificar el cumplimiento de las normas colectivas.' },
      { id: 'Revocatoria', label: 'Revocatoria', x: 460, y: 50, r: 32, definition: 'Reglas y umbrales claros que permiten a la asamblea de miembros remover a los directivos de sus cargos antes de terminar su mandato.' },
      { id: 'Mediación', label: 'Mediación', x: 550, y: 70, r: 32, definition: 'Mecanismos internos de resolución de conflictos vecinales o discrepancias comerciales antes de recurrir a la justicia estatal.' },
      { id: 'Planificación', label: 'Planificación', x: 180, y: 130, r: 32, definition: 'Fase inicial de constitución de la comunidad energética, asamblea fundacional, redacción de estatutos y captación inicial.' },
      { id: 'Operación', label: 'Operación', x: 150, y: 200, r: 32, definition: 'Fase de operación cotidiana del sistema de energía, cobros, balances y mantenimiento de activos.' },
      { id: 'Escalamiento', label: 'Escalamiento', x: 210, y: 270, r: 32, definition: 'El proceso de admitir nuevos socios, integrar nuevos nodos de generación o ampliar el alcance sin perder la calidad democrática.' }
    ]
  },
  // ==========================================
  // 3. DIMENSIÓN REGULATORIA Y FINANCIERA (RF)
  // ==========================================
  {
    id: 'RF',
    title: 'Dimensión Regulatoria y Financiera (RF)',
    colorTheme: {
      primary: '#C1A86B', // Dorado CYTED
      primaryText: 'text-[#C1A86B]',
      border: 'border-[#C1A86B]',
      bg: 'bg-[#C1A86B]/10',
      glow: '#C1A86B',
      lineStroke: '#C1A86B',
      nodeFill: '#FDFBF7',
      nodeStroke: '#C1A86B'
    },
    categories: [
      { id: 'Enabling Legal Framework', label: 'Marco Legal Habilitador', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
      { id: 'Financing', label: 'Financiamiento', color: 'bg-blue-50 text-blue-700 border-blue-200' },
      { id: 'DSO Relationship', label: 'Relación con el Distribuidor', color: 'bg-purple-50 text-purple-700 border-purple-200' },
      { id: 'Regulatory Stability Predictability', label: 'Estabilidad Regulatoria', color: 'bg-amber-50 text-amber-700 border-amber-200' }
    ],
    connections: [
      // Centro a Ramas
      { fromX: 480, fromY: 310, toX: 270, toY: 410, isCurve: true },
      { fromX: 480, fromY: 310, toX: 480, toY: 490, isCurve: true },
      { fromX: 480, fromY: 310, toX: 690, toY: 410, isCurve: true },
      { fromX: 480, fromY: 310, toX: 310, toY: 200, isCurve: true },
      // Ramas a Subnodos
      { fromX: 270, fromY: 410, toX: 160, toY: 350 },
      { fromX: 270, fromY: 410, toX: 120, toY: 415 },
      { fromX: 270, fromY: 410, toX: 130, toY: 480 },
      { fromX: 270, fromY: 410, toX: 180, toY: 530 },
      { fromX: 480, fromY: 490, toX: 370, toY: 560 },
      { fromX: 480, fromY: 490, toX: 480, toY: 570 },
      { fromX: 480, fromY: 490, toX: 590, toY: 560 },
      { fromX: 480, fromY: 490, toX: 620, toY: 490 },
      { fromX: 690, fromY: 410, toX: 810, toY: 350 },
      { fromX: 690, fromY: 410, toX: 830, toY: 410 },
      { fromX: 690, fromY: 410, toX: 815, toY: 470 },
      { fromX: 310, fromY: 200, toX: 180, toY: 130 },
      { fromX: 310, fromY: 200, toX: 150, toY: 200 }
    ],
    nodes: [
      { id: 'center', label: 'Regulación y Finanzas', x: 480, y: 310, r: 68, isMain: true, definition: 'Analiza la viabilidad económica, los modelos de financiamiento y la adecuación legal del proyecto, evaluando las barreras regulatorias nacionales y la retribución económica.' },
      { id: 'branch-law', label: 'Marco Legal Habilitador', x: 270, y: 410, r: 48, isMain: true, definition: 'El conjunto de leyes generales y ordenanzas que reconocen formalmente a las comunidades energéticas en el territorio.' },
      { id: 'branch-fin', label: 'Mecanismos Financieros', x: 480, y: 490, r: 48, isMain: true, definition: 'Modelos de negocio y de fondeo aplicados para sufragar el capital inicial y mantener operativas las instalaciones.' },
      { id: 'branch-dso', label: 'Relación con el Distribuidor', x: 690, y: 410, r: 48, isMain: true, definition: 'Condiciones de conexión con el Operador de Red de Distribución (DSO), esquemas de retribución e inyección.' },
      { id: 'branch-stab', label: 'Estabilidad Predictabilidad', x: 310, y: 200, r: 48, isMain: true, definition: 'Previsión sobre cambios de normativas y el nivel de diálogo entre las organizaciones y el ente gubernamental.' },
      { id: 'Marco Legal', label: 'Marco Legal', x: 160, y: 350, r: 32, definition: 'Marco legal que reconoce de forma explícita las comunidades de energía, habilita el autoconsumo colectivo y facilita la comercialización regulada de excedentes.' },
      { id: 'Autoconsumo Col.', label: 'Autoconsumo Col.', x: 120, y: 415, r: 32, definition: 'Habilitación reglamentaria que faculta a un grupo de consumidores a producir conjuntamente energía solar/renovables e intercambiarla localmente.' },
      { id: 'Venta Excedentes', label: 'Venta Excedentes', x: 130, y: 480, r: 32, definition: 'El derecho de las comunidades energéticas a vender su electricidad excedente a terceros o inyectarla a la red.' },
      { id: 'Armonía Regional', label: 'Armonía Regional', x: 180, y: 530, r: 32, definition: 'Alineación de normas y regulaciones entre diferentes países de Iberoamérica para compartir mejores prácticas regulatorias.' },
      { id: 'Crowdfunding', label: 'Crowdfunding', x: 370, y: 560, r: 32, definition: 'Financiamiento colectivo a través de aportes económicos de vecinos mediante plataformas de internet.' },
      { id: 'Bonos Verdes', label: 'Bonos Verdes', x: 480, y: 570, r: 32, definition: 'Instrumentos de deuda y bonos emitidos por la comunidad o intermediarios cuyos fondos van exclusivamente a proyectos verdes.' },
      { id: 'Subsidios', label: 'Subsidios', x: 590, y: 560, r: 32, definition: 'Aportaciones y financiamiento público no reembolsable del Estado para sufragar la inversión de capital inicial.' },
      { id: 'Inversión Privada', label: 'Inversión Privada', x: 620, y: 490, r: 32, definition: 'Fondos de inversión privados que buscan, además de rentabilidad, impactos ambientales y sociales medibles.' },
      { id: 'Net Billing', label: 'Net Billing', x: 810, y: 350, r: 32, definition: 'Esquemas de compensación por inyección de excedentes energéticos a la red, sea por compensación 1:1 o valorización.' },
      { id: 'Mercados Flex.', label: 'Mercados Flex.', x: 830, y: 410, r: 32, definition: 'Participación en mercados para brindar servicios de soporte local a la red general del distribuidor (DSO).' },
      { id: 'Resolución Conflictos', label: 'Resolución Conflictos', x: 815, y: 470, r: 32, definition: 'Procedimientos y mesas de arbitraje para resolver desacuerdos técnicos o comerciales entre la comunidad y el distribuidor (DSO).' },
      { id: 'Inestabilidad Reg.', label: 'Inestabilidad Reg.', x: 180, y: 130, r: 32, definition: 'Métrica de frecuencia de cambios en las leyes de autoconsumo; tasas altas aumentan la incertidumbre de inversión.' },
      { id: 'Diálogo Público', label: 'Diálogo Público', x: 150, y: 200, r: 32, definition: 'Canales de diálogo institucionalizados entre reguladores gubernamentales y representantes de las comunidades energéticas.' }
    ]
  },
  // ==========================================
  // 4. DIMENSIÓN DE APROPIACIÓN SOCIAL (AS)
  // ==========================================
  {
    id: 'AS',
    title: 'Apropiación Social y Justicia (AS)',
    colorTheme: {
      primary: '#A78BFA', // Violeta / Púrpura
      primaryText: 'text-[#A78BFA]',
      border: 'border-[#A78BFA]',
      bg: 'bg-[#A78BFA]/10',
      glow: '#A78BFA',
      lineStroke: '#A78BFA',
      nodeFill: '#FAF5FF',
      nodeStroke: '#A78BFA'
    },
    categories: [
      { id: 'Distributive Justice', label: 'Justicia Distributiva', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
      { id: 'Procedural Justice', label: 'Justicia Procedimental', color: 'bg-blue-50 text-blue-700 border-blue-200' },
      { id: 'Recognition Justice', label: 'Justicia de Reconocimiento', color: 'bg-amber-50 text-amber-700 border-amber-200' },
      { id: 'Restorative Justice', label: 'Justicia Restaurativa', color: 'bg-rose-50 text-rose-700 border-rose-200' },
      { id: 'Community Agency & Empowerment', label: 'Empoderamiento Comunitario', color: 'bg-purple-50 text-purple-700 border-purple-200' }
    ],
    connections: [
      // Centro a Ramas
      { fromX: 480, fromY: 310, toX: 270, toY: 410, isCurve: true },
      { fromX: 480, fromY: 310, toX: 480, toY: 490, isCurve: true },
      { fromX: 480, fromY: 310, toX: 690, toY: 410, isCurve: true },
      { fromX: 480, fromY: 310, toX: 580, toY: 200, isCurve: true },
      { fromX: 480, fromY: 310, toX: 340, toY: 200, isCurve: true },
      // Ramas a Subnodos
      { fromX: 270, fromY: 410, toX: 160, toY: 350 },
      { fromX: 270, fromY: 410, toX: 120, toY: 415 },
      { fromX: 270, fromY: 410, toX: 130, toY: 480 },
      { fromX: 480, fromY: 490, toX: 370, toY: 560 },
      { fromX: 480, fromY: 490, toX: 480, toY: 570 },
      { fromX: 480, fromY: 490, toX: 590, toY: 560 },
      { fromX: 690, fromY: 410, toX: 810, toY: 350 },
      { fromX: 690, fromY: 410, toX: 830, toY: 410 },
      { fromX: 690, fromY: 410, toX: 815, toY: 470 },
      { fromX: 580, fromY: 200, toX: 670, toY: 120 },
      { fromX: 580, fromY: 200, toX: 580, toY: 90 },
      { fromX: 340, fromY: 200, toX: 240, toY: 130 },
      { fromX: 340, fromY: 200, toX: 190, toY: 200 },
      { fromX: 340, fromY: 200, toX: 260, toY: 270 },
      { fromX: 340, fromY: 200, toX: 380, toY: 90 }
    ],
    nodes: [
      { id: 'center', label: 'Apropiación Social y Justicia', x: 480, y: 310, r: 68, isMain: true, definition: 'Estudia el empoderamiento y los aspectos éticos de la energía, midiendo el alivio de la pobreza energética, la participación sustantiva de los vecinos en el diseño de reglas y el respeto a derechos territoriales.' },
      { id: 'branch-dist', label: 'Justicia Distributiva', x: 270, y: 410, r: 48, isMain: true, definition: 'Reparto justo y equitativo de los costos, beneficios y la energía generada colectivamente para combatir la desigualdad.' },
      { id: 'branch-proc', label: 'Justicia Procedimental', x: 480, y: 490, r: 48, isMain: true, definition: 'Participación ciudadana en el codiseño tecnológico y en la asamblea de formulación de reglamentos de la comunidad.' },
      { id: 'branch-recog', label: 'Justicia de Reconocimiento', x: 690, y: 410, r: 48, isMain: true, definition: 'Reconocimiento y respeto a las autoridades tradicionales, diversidad de lenguas nativas y derechos de pueblos indígenas o vulnerables.' },
      { id: 'branch-rest', label: 'Justicia Restaurativa', x: 580, y: 200, r: 48, isMain: true, definition: 'Acciones encaminadas a reparar y remediar pasivos históricos, ambientales y de exclusión causados por monopolios fósiles.' },
      { id: 'branch-emp', label: 'Empoderamiento Comunitario', x: 340, y: 200, r: 48, isMain: true, definition: 'Construcción de la soberanía energética, cierre de brecha digital y mejora en la alfabetización y apropiación digna de tecnologías.' },
      { id: 'Pobreza Energ.', label: 'Pobreza Energ.', x: 160, y: 350, r: 32, definition: 'Situación en la cual un hogar no puede cubrir sus necesidades energéticas mínimas debido a bajos ingresos o ineficiencia.' },
      { id: 'Tarifas Sociales', label: 'Tarifas Sociales', x: 120, y: 415, r: 32, definition: 'Tarifas rebajadas internamente para socios vulnerables, subsidiadas de forma solidaria por la asamblea.' },
      { id: 'Reparto Excedentes', label: 'Reparto Excedentes', x: 130, y: 480, r: 32, definition: 'Criterio para distribuir los beneficios financieros de las ventas de excedentes, priorizando la equidad o necesidades colectivas.' },
      { id: 'Co-diseño Tecnol.', label: 'Co-diseño Tecnol.', x: 370, y: 560, r: 32, definition: 'Proceso de codiseño conjunto e instalación física donde los miembros eligen los tipos y ubicaciones de tecnologías.' },
      { id: 'Voto Vinculante', label: 'Voto Vinculante', x: 480, y: 570, r: 32, definition: 'Poder vinculante y voto de la asamblea vecinal en la formulación del reglamento interno, evitando la mera consulta formal.' },
      { id: 'Derecho Veto', label: 'Derecho Veto', x: 590, y: 560, r: 32, definition: 'Poder estatutario de asambleas étnicas o de comités minoritarios vulnerables para bloquear decisiones generales que puedan perjudicar sus derechos.' },
      { id: 'Enfoque Étnico', label: 'Enfoque Étnico', x: 810, y: 350, r: 32, definition: 'Reconocimiento y respeto a las estructuras y formas de gobierno de pueblos originarios y afrodescendientes.' },
      { id: 'Derechos Territ.', label: 'Derechos Territ.', x: 830, y: 410, r: 32, definition: 'Respeto a la consulta previa, libre e informada al instalar sistemas de energía comunitarios en resguardos ancestrales.' },
      { id: 'Lengua y Comunic.', label: 'Lengua y Comunic.', x: 815, y: 470, r: 32, definition: 'Uso de las lenguas nativas locales y formatos accesibles (audios, lectura fácil) en la comunicación del proyecto.' },
      { id: 'Reparación Histórica', label: 'Reparación Histórica', x: 670, y: 120, r: 32, definition: 'Acciones de reparación por los daños y exclusión histórica generados por megaproyectos energéticos convencionales.' },
      { id: 'Reinversión Social', label: 'Reinversión Social', x: 580, y: 90, r: 32, definition: 'Destinar una parte de los dividendos de la comunidad a proyectos del barrio (salud, educación, cooperativas locales).' },
      { id: 'Alfabetización', label: 'Alfabetización', x: 240, y: 130, r: 32, definition: 'Educación popular energética para capacitar a los vecinos en entender facturas de luz y hábitos eficientes.' },
      { id: 'Brecha Digital', label: 'Brecha Digital', x: 190, y: 200, r: 32, definition: 'Acciones de alfabetización digital y conectividad para evitar la exclusión de los miembros en la gestión digital.' },
      { id: 'Apropiación Digna', label: 'Apropiación Digna', x: 260, y: 270, r: 32, definition: 'Capacidad de autonomía para mantener y reparar los sistemas, rechazando tecnologías cerradas de control corporativo.' },
      { id: 'Empoderamiento', label: 'Empoderamiento', x: 380, y: 90, r: 32, definition: 'Soberanía energética para establecer prioridades y gobernar autónomamente la transición energética territorial.' }
    ]
  }
];

export const Glossary: React.FC = () => {
  const { t } = useLanguage();
  const [activeDim, setActiveDim] = useState<'TE' | 'GO' | 'RF' | 'AS'>('TE');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);
  const [activeTooltip, setActiveTooltip] = useState<MindMapNode | null>(null);

  const currentDim = dimensions.find(d => d.id === activeDim) || dimensions[0];

  const handleTabChange = (dimId: 'TE' | 'GO' | 'RF' | 'AS') => {
    setActiveDim(dimId);
    setSearch('');
    setSelectedCategory(null);
    setHoveredTerm(null);
    setActiveTooltip(null);
  };

  const filteredGlossary = glossaryData.filter(entry => {
    if (entry.dimension !== activeDim) return false;
    const matchesSearch = entry.term.toLowerCase().includes(search.toLowerCase()) ||
                          entry.definition.toLowerCase().includes(search.toLowerCase()) ||
                          entry.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || entry.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (cat: string) => {
    const matched = currentDim.categories.find(c => c.id === cat);
    return matched ? matched.color : 'bg-stone-50 text-stone-700';
  };

  const handleNodeHover = (termId: string | null) => {
    setHoveredTerm(termId);
    if (!termId) {
      setActiveTooltip(null);
    } else {
      const node = currentDim.nodes.find(n => n.id === termId);
      if (node) setActiveTooltip(node);
    }
  };

  const handleNodeClick = (node: MindMapNode) => {
    setActiveTooltip(activeTooltip?.id === node.id ? null : node);
    setHoveredTerm(activeTooltip?.id === node.id ? null : node.id);
  };

  const renderNodeText = (node: MindMapNode, isHovered: boolean) => {
    const isCenter = node.id === 'center';
    const isBranch = node.isMain && !isCenter;
    
    // Custom larger font size and styling for premium vector aesthetics
    const fontSize = isCenter ? "13" : isBranch ? "11" : "10";
    const fontWeight = "bold";
    const fontFamily = isCenter || isBranch ? "Georgia, serif" : "system-ui, sans-serif";
    const fill = isCenter ? "#E5D3A2" : isBranch ? "#FFFFFF" : isHovered ? "#FFFFFF" : "#122E3A";
    
    // Smart label split into lines to prevent overflow and align perfectly
    let lines: string[] = [];
    
    if (isCenter) {
      if (node.label.includes('Gobernanza')) {
        lines = ['Gobernanza', 'Comunitaria'];
      } else if (node.label.includes('Regulación')) {
        lines = ['Regulación y', 'Finanzas'];
      } else if (node.label.includes('Apropiación')) {
        lines = ['Apropiación', 'y Justicia'];
      } else {
        lines = ['Dimensión', 'Tecnológica'];
      }
    } else if (isBranch) {
      if (node.label === 'Hardware de Generación') {
        lines = ['Generación', 'Hardware'];
      } else if (node.label === 'Mecanismos Financieros') {
        lines = ['Finanzas y', 'Fondeo'];
      } else if (node.label === 'Relación con el Distribuidor') {
        lines = ['Relación', 'con DSO'];
      } else if (node.label === 'Estabilidad Predictabilidad') {
        lines = ['Estabilidad', 'Normativa'];
      } else if (node.label === 'Rendición y Resolución') {
        lines = ['Rendición y', 'Resolución'];
      } else if (node.label === 'Empoderamiento Comunitario') {
        lines = ['Agencia y', 'Empoderamiento'];
      } else if (node.label === 'Equidad de Participación') {
        lines = ['Equidad de', 'Participación'];
      } else {
        lines = node.label.split(' ');
      }
    } else {
      // Subnodes text wrapping: split nicely on spaces or slashes
      if (node.label.includes(' / ')) {
        lines = node.label.split(' / ');
      } else if (node.label.includes(' ') && node.label.length > 8) {
        lines = node.label.split(' ');
      } else {
        lines = [node.label];
      }
    }
    
    // Calculate startY to keep text block perfectly vertically centered inside circle
    const lineCount = lines.length;
    const lineSpacing = 11;
    const startY = node.y - ((lineCount - 1) * lineSpacing) / 2 + 3.5;
    
    return (
      <>
        {lines.map((line, idx) => (
          <text
            key={idx}
            x={node.x}
            y={startY + (idx * lineSpacing)}
            fontFamily={fontFamily}
            fontSize={fontSize}
            fontWeight={fontWeight}
            fill={fill}
            textAnchor="middle"
            className="transition-all duration-300"
          >
            {line}
          </text>
        ))}
      </>
    );
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
            Explora las definiciones científicas del protocolo RIPCEL. 
            Navega por las cuatro dimensiones de la taxonomía oficial del Observatorio.
          </p>
        </div>

        {/* Dimension Selector Tabs */}
        <div className="flex border-b border-stone-200 overflow-x-auto hide-scrollbar mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          {dimensions.map(dim => {
            const isActive = activeDim === dim.id;
            return (
              <button
                key={dim.id}
                onClick={() => handleTabChange(dim.id)}
                className={`py-3 px-6 text-sm font-semibold whitespace-nowrap transition-all border-b-2 font-display flex items-center gap-2 ${
                  isActive
                    ? 'text-ink bg-white rounded-t-xl'
                    : 'border-transparent text-stone-500 hover:text-stone-700 hover:bg-stone-100/50'
                }`}
                style={{
                  borderBottomColor: isActive ? dim.colorTheme.primary : 'transparent',
                  color: isActive ? '#1C1917' : undefined
                }}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dim.colorTheme.primary }} />
                {dim.title}
              </button>
            );
          })}
        </div>

        {/* Map Visualization Box */}
        <div className="bg-white border border-stone-200 shadow-editorial rounded-2xl p-6 mb-10 overflow-hidden">
          <div className="flex items-center gap-3 border-b hairline pb-3 mb-6">
            <BookOpenIcon className="h-5 w-5" style={{ color: currentDim.colorTheme.primary }} />
            <h3 className="font-display text-xl text-ink font-semibold">
              Mapa Mental de la {currentDim.title}
            </h3>
          </div>
          
          <p className="text-xs text-ink/60 mb-6 max-w-2xl leading-normal font-sans">
            Toca o pasa el cursor sobre **cualquier nodo** (incluyendo el centro y las categorías principales) para ver su definición científica flotante.
          </p>

          <div className="relative w-full overflow-x-auto flex justify-center py-4 bg-stone-50/50 border border-stone-100 rounded-xl">
            <div className="relative w-full max-w-[860px] aspect-[960/620]">
              <svg viewBox="0 0 960 620" className="w-full h-full select-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="center-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1F4A5C" />
                    <stop offset="100%" stopColor="#122E3A" />
                  </linearGradient>
                  <linearGradient id="branch-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={currentDim.colorTheme.primary} />
                    <stop offset="100%" stopColor="#2D6B84" />
                  </linearGradient>
                </defs>

                {/* Connections rendered dynamically */}
                {currentDim.connections.map((conn, idx) => (
                  <path
                    key={idx}
                    d={conn.isCurve 
                      ? `M ${conn.fromX} ${conn.fromY} Q ${(conn.fromX + conn.toX)/2 + (conn.fromX > conn.toX ? 30 : -30)} ${(conn.fromY + conn.toY)/2} ${conn.toX} ${conn.toY}`
                      : `M ${conn.fromX} ${conn.fromY} L ${conn.toX} ${conn.toY}`
                    }
                    stroke={currentDim.colorTheme.lineStroke}
                    strokeOpacity={conn.isCurve ? "0.25" : "0.15"}
                    strokeWidth={conn.isCurve ? "2.5" : "2"}
                    fill="none"
                  />
                ))}

                {/* Nodes rendered dynamically */}
                {currentDim.nodes.map(node => {
                  const isHovered = hoveredTerm === node.id;
                  const isNodeMain = node.isMain;
                  const isCenter = node.id === 'center';
                  
                  return (
                    <g
                      key={node.id}
                      onMouseEnter={() => handleNodeHover(node.id)}
                      onMouseLeave={() => handleNodeHover(null)}
                      onClick={() => handleNodeClick(node)}
                      cursor="pointer"
                    >
                      {/* Outer pulse animation on hover */}
                      {isHovered && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={node.r + 3}
                          fill="none"
                          stroke={currentDim.colorTheme.primary}
                          strokeOpacity="0.4"
                          strokeWidth="3"
                          className="animate-pulse"
                        />
                      )}
                      
                      {/* Main Node Circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.r}
                        fill={isCenter ? 'url(#center-grad)' : isNodeMain ? 'url(#branch-grad)' : isHovered ? currentDim.colorTheme.primary : currentDim.colorTheme.nodeFill}
                        stroke={isCenter ? currentDim.colorTheme.primary : isNodeMain ? '#1F4A5C' : isHovered ? currentDim.colorTheme.primary : currentDim.colorTheme.nodeStroke}
                        strokeWidth={isCenter ? 2.5 : isNodeMain ? 1.5 : 2}
                        className="transition-all duration-300"
                      />

                      {/* Unified vertically-centered multi-line text renderer */}
                      {renderNodeText(node, isHovered)}
                    </g>
                  );
                })}
              </svg>

              {/* Dynamic Absolute HTML Tooltip Overlay */}
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
                      {activeTooltip.id === 'center' ? 'Núcleo' : activeTooltip.isMain ? 'Categoría' : 'Sub-Indicador'}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-100 leading-relaxed">
                    {activeTooltip.definition}
                  </p>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search & Filters */}
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
            
            {/* Category selection filters */}
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
              {currentDim.categories.map(cat => (
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

        {/* Glossary Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredGlossary.map((entry, index) => {
            const isHovered = hoveredTerm === entry.term;
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
                    {currentDim.categories.find(c => c.id === entry.category)?.label || entry.category}
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
