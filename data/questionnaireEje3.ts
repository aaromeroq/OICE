export type ScaleRating = 0 | 1 | 2 | 3 | 4;

export const SCALE_LABELS: Record<ScaleRating, { title: string; desc: string; badge: string; color: string }> = {
  0: { title: '0 — Ausente', desc: 'Sin reconocimiento formal ni figuras análogas.', badge: 'bg-stone-100 text-stone-700 border-stone-300', color: '#78716C' },
  1: { title: '1 — Incipiente', desc: 'En debate, anteproyecto o piloto aislado sin marco firme.', badge: 'bg-amber-100 text-amber-800 border-amber-300', color: '#D97706' },
  2: { title: '2 — Operativo con restricciones', desc: 'Permitido pero con barreras administrativas, técnicas o de escala.', badge: 'bg-yellow-100 text-yellow-800 border-yellow-300', color: '#CA8A04' },
  3: { title: '3 — Habilitante', desc: 'Marco claro, operativo y con procedimientos estandarizados.', badge: 'bg-teal-100 text-teal-800 border-teal-300', color: '#0D9488' },
  4: { title: '4 — Consolidado e inclusivo', desc: 'Maduro, con incentivos estables, equidad y amplia difusión.', badge: 'bg-emerald-100 text-emerald-800 border-emerald-300', color: '#059669' }
};

export type ModalityStatus = 'permitida' | 'restringida' | 'piloto' | 'no_permitida';

export const MODALITY_LABELS: Record<ModalityStatus, { label: string; badge: string }> = {
  permitida: { label: 'Permitida', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  restringida: { label: 'Permitida con restricciones', badge: 'bg-amber-50 text-amber-700 border-amber-200' },
  piloto: { label: 'En proyecto / piloto', badge: 'bg-blue-50 text-blue-700 border-blue-200' },
  no_permitida: { label: 'No permitida', badge: 'bg-rose-50 text-rose-700 border-rose-200' }
};

export type BarrierPriority = 'alta' | 'media' | 'baja';
export type BarrierType = 'regulatoria' | 'institucional' | 'financiera' | 'tecnica' | 'social' | 'informacion';

export const BARRIER_TYPE_LABELS: Record<BarrierType, string> = {
  regulatoria: 'Regulatoria',
  institucional: 'Institucional',
  financiera: 'Financiera',
  tecnica: 'Técnica',
  social: 'Social / Organizativa',
  informacion: 'Información / Capacidades'
};

export interface QuestionnaireData {
  country: string;
  responsible: string;
  updateDate: string;
  // 1. Marco regulatorio
  q1_definition: {
    score: ScaleRating;
    law: string;
    status: string;
    text: string;
  };
  q2_modalities: Record<string, ModalityStatus>;
  q3_connection: {
    responsible: string;
    steps: string;
    estimatedTime: string;
    approxCost: string;
    mainDifficulty: string;
  };
  q4_compensation: {
    mechanism: string;
    description: string;
  };
  // 2. Políticas públicas y equidad
  q5_incentives: string[];
  q6_socialTariffs: string;
  q7_exclusionRisk: string;
  // 3. Financiamiento
  q8_multilateral: string;
  q9_financialBarriers: string;
  q10_businessModel: string;
  // 4. Gobernanza
  q11_actors: string;
  q12_barriers: Array<{ text: string; type: BarrierType; priority: BarrierPriority }>;
  q12_opportunities: Array<{ text: string; type: BarrierType; priority: BarrierPriority }>;
  q13_priorityReform: {
    responsible: string;
    instrument: string;
    estimatedTime: string;
    description: string;
  };
  // Cierre
  synthesis: {
    generalScore: ScaleRating;
    strength: string;
    barrier: string;
    fundingOpportunity: string;
    pilotTerritory: string;
    priorityAction: string;
    verificationLinks: string;
  };
}

export const RIPCEL_COUNTRIES = [
  'Argentina',
  'Bolivia',
  'Brasil',
  'Chile',
  'Colombia',
  'Costa Rica',
  'Cuba',
  'Ecuador',
  'El Salvador',
  'España',
  'Guatemala',
  'Honduras',
  'México',
  'Panamá',
  'Perú',
  'Portugal',
  'República Dominicana',
  'Uruguay'
];

export const MODALITIES_LIST = [
  'Generación distribuida',
  'Autoconsumo colectivo',
  'Reparto de energía (coeficientes)',
  'Generación remota / virtual',
  'Intercambio entre pares (P2P)',
  'Microrredes comunitarias',
  'Almacenamiento comunitario'
];

export const createEmptyQuestionnaire = (country: string = 'Colombia'): QuestionnaireData => ({
  country,
  responsible: '',
  updateDate: new Date().toISOString().split('T')[0],
  q1_definition: {
    score: 1,
    law: '',
    status: 'Vigente',
    text: ''
  },
  q2_modalities: {
    'Generación distribuida': 'permitida',
    'Autoconsumo colectivo': 'restringida',
    'Reparto de energía (coeficientes)': 'restringida',
    'Generación remota / virtual': 'piloto',
    'Intercambio entre pares (P2P)': 'no_permitida',
    'Microrredes comunitarias': 'restringida',
    'Almacenamiento comunitario': 'piloto'
  },
  q3_connection: {
    responsible: '',
    steps: '',
    estimatedTime: '',
    approxCost: '',
    mainDifficulty: ''
  },
  q4_compensation: {
    mechanism: '',
    description: ''
  },
  q5_incentives: ['', '', '', '', ''],
  q6_socialTariffs: '',
  q7_exclusionRisk: '',
  q8_multilateral: '',
  q9_financialBarriers: '',
  q10_businessModel: '',
  q11_actors: '',
  q12_barriers: [
    { text: '', type: 'regulatoria', priority: 'alta' },
    { text: '', type: 'financiera', priority: 'alta' },
    { text: '', type: 'institucional', priority: 'media' }
  ],
  q12_opportunities: [
    { text: '', type: 'social', priority: 'alta' },
    { text: '', type: 'tecnica', priority: 'media' },
    { text: '', type: 'informacion', priority: 'alta' }
  ],
  q13_priorityReform: {
    responsible: '',
    instrument: '',
    estimatedTime: '',
    description: ''
  },
  synthesis: {
    generalScore: 2,
    strength: '',
    barrier: '',
    fundingOpportunity: '',
    pilotTerritory: '',
    priorityAction: '',
    verificationLinks: ''
  }
});

// Benchmark pre-filled templates for initial demonstration
export const BENCHMARK_QUESTIONNAIRES: Record<string, QuestionnaireData> = {
  Colombia: {
    country: 'Colombia',
    responsible: 'Nodo RIPCEL Colombia / MinMinas & UPME',
    updateDate: '2026-08-18',
    q1_definition: {
      score: 3,
      law: 'Ley 2294 de 2023 (Art. 235), Decreto 2236 de 2023, Res. CREG 101 072 de 2025',
      status: 'Vigente y reglamentada',
      text: 'Se define la figura expresa de "Comunidades Energéticas" (CE) integrando personas naturales y/o jurídicas, resguardos indígenas y comunidades afrodescendientes. Se habilitan dos modalidades operativas: Autogeneración Colectiva (AGRC) y Generación Distribuida Colectiva (GDC) con un tope de hasta 5 MW (Res. UPME 501 de 2024).'
    },
    q2_modalities: {
      'Generación distribuida': 'permitida',
      'Autoconsumo colectivo': 'permitida',
      'Reparto de energía (coeficientes)': 'permitida',
      'Generación remota / virtual': 'restringida',
      'Intercambio entre pares (P2P)': 'piloto',
      'Microrredes comunitarias': 'permitida con restricciones' as ModalityStatus,
      'Almacenamiento comunitario': 'restringida'
    },
    q3_connection: {
      responsible: 'Operador de Red (OR / DSO local, ej. Enel, EPM, Celsia, Air-e)',
      steps: '1) Solicitud de punto de conexión simplificado vía web; 2) Estudio de viabilidad técnica si supera umbral de red; 3) Aprobación de medidor bidireccional; 4) Firma de Acuerdo de Conformación Energética (ACE); 5) Entrada en operación comercial.',
      estimatedTime: '3 a 6 meses según capacidad y operador',
      approxCost: 'Variable: costos de acometida, medidor avanzado e inspección RETIE',
      mainDifficulty: 'Falta de medidores inteligentes (AMI) generalizados y demoras administrativas por parte de los operadores de red en la aprobación de puntos de inyección.'
    },
    q4_compensation: {
      mechanism: 'Compensación horaria de excedentes valorizados (Net Billing) y Factor PDE',
      description: 'El Acuerdo de Conformación Energética (ACE) exige formalizar el Porcentaje de Distribución de Excedentes (Factor PDE) registrado ante el comercializador integrado para asignar los créditos horarios de energía entre los miembros.'
    },
    q5_incentives: [
      'Beneficios tributarios de la Ley 1715 de 2014 (deducción del 50% de renta, exclusión de IVA, exención arancelaria)',
      'Fondos públicos del Fondo de Energías No Convencionales y Gestión Eficiente de la Energía (FENOGE)',
      'Cesión de infraestructura a título gratuito financiada con recursos del Estado para poblaciones vulnerables',
      'Registro Único de Comunidades Energéticas (RUCE) con prioridad de convocatorias',
      'Líneas de crédito blando a través de Findeter y Bancóldex'
    ],
    q6_socialTariffs: 'Sí. Articulación directa con subsidios a estratos 1, 2 y 3. El excedente generado en la CE puede ser asignado como crédito virtual a las facturas de hogares en pobreza energética.',
    q7_exclusionRisk: 'Hogares en condición de informalidad predial (sin títulos de propiedad), comunidades en zonas no interconectadas (ZNI) con fallas crónicas de telecomunicaciones para telemetría, y pequeños inquilinos.',
    q8_multilateral: 'BID Lab (programa de apoyo a CEs en transición justa), CAF (banco de desarrollo de América Latina), Banco Mundial (asistencia técnica para microrredes). Enlace nacional: MinMinas y APC Colombia.',
    q9_financialBarriers: '1) Dificultad para acceder a garantías bancarias comerciales; 2) Falta de historial crediticio corporativo de las asociaciones comunitarias; 3) Elevados costos de transacción para proyectos menores a 200 kW.',
    q10_businessModel: 'Alianza Público-Comunitaria (municipio cede cubiertas públicas y FENOGE aporta capital semilla, mientras una cooperativa de usuarios opera y distribuye ahorros netos con factor PDE).',
    q11_actors: 'Liderazgo de asociaciones comunitarias y cooperativas locales, acompañados técnicamente por universidades públicas y el SENA, con supervisión de la Superservicios y apoyo de alcaldías locales.',
    q12_barriers: [
      { text: 'Demora en la reglamentación operativa de contratos P2P y medición inteligente obligatoria', type: 'regulatoria', priority: 'alta' },
      { text: 'Ausencia de garantías bancarias adaptadas a organizaciones comunitarias de base', type: 'financiera', priority: 'alta' },
      { text: 'Capacidad técnica dispar de los municipios para formular proyectos bancables', type: 'institucional', priority: 'media' }
    ],
    q12_opportunities: [
      { text: 'Voluntad política y respaldo normativo explícito en el Plan Nacional de Desarrollo', type: 'regulatoria', priority: 'alta' },
      { text: 'Gran disponibilidad de recurso solar en regiones prioritarias como el Caribe y Valle', type: 'tecnica', priority: 'alta' },
      { text: 'Tejido social robusto y asociatividad tradicional en resguardos y cooperativas', type: 'social', priority: 'alta' }
    ],
    q13_priorityReform: {
      responsible: 'Comisión de Regulación de Energía y Gas (CREG) y MinMinas',
      instrument: 'Resolución de despliegue y estandarización obligatoria de Infraestructura de Medición Avanzada (AMI)',
      estimatedTime: '12 meses',
      description: 'Establecer que los operadores de red deban suministrar e instalar medidores bidireccionales inteligentes sin trasladar costos lesivos a las comunidades energéticas en estratos bajos.'
    },
    synthesis: {
      generalScore: 3,
      strength: 'Marco legal explícito de vanguardia (Ley 2294/23, CREG 101 072/25) con topes amplios de hasta 5 MW.',
      barrier: 'Cuello de botella en interconexión física y baja penetración de medición inteligente (AMI).',
      fundingOpportunity: 'Recursos no reembolsables de FENOGE y cooperación internacional (BID / CAF).',
      pilotTerritory: 'La Guajira (comunidades Wayuu) y municipios PDET con alto índice de vulnerabilidad.',
      priorityAction: 'Estandarizar el procedimiento de radicación del Acuerdo de Conformación (ACE) ante distribuidores.',
      verificationLinks: 'https://www.minenergia.gov.co/es/comunidades-energeticas/ | Res. CREG 101 072 de 2025'
    }
  },
  España: {
    country: 'España',
    responsible: 'Nodo RIPCEL España / IDAE & MITECO',
    updateDate: '2026-08-18',
    q1_definition: {
      score: 3,
      law: 'Real Decreto-ley 23/2020 (Art. 6.j Ley 24/2013), RD 244/2019, Directivas UE 2018/2001 y 2019/944',
      status: 'Vigente',
      text: 'Reconoce legalmente las figuras de Comunidades de Energías Renovables (CER) y Comunidades Ciudadanas de Energía (CCE) transponiendo el marco europeo, con base en control democrático y finalidad no lucrativa.'
    },
    q2_modalities: {
      'Generación distribuida': 'permitida',
      'Autoconsumo colectivo': 'permitida',
      'Reparto de energía (coeficientes)': 'permitida',
      'Generación remota / virtual': 'permitida',
      'Intercambio entre pares (P2P)': 'piloto',
      'Microrredes comunitarias': 'restringida',
      'Almacenamiento comunitario': 'restringida'
    },
    q3_connection: {
      responsible: 'Empresa distribuidora eléctrica territorial (i-DE, E-Distribución, etc.) y CCAA',
      steps: '1) Solicitud de acceso y conexión; 2) Autorización administrativa previa y de construcción (CCAA); 3) Certificado de instalación eléctrica; 4) Inscripción en RAIPRE; 5) Acuerdo de reparto y contrato técnico de acceso con comercializadora.',
      estimatedTime: '6 a 14 meses (según CCAA y potencia)',
      approxCost: 'Costos de avales (si >15 kW), tasas autonómicas y acometida',
      mainDifficulty: 'Retrasos crónicos de las distribuidoras en la activación del autoconsumo colectivo y la limitación geográfica inicial de radio de 2 km en baja tensión.'
    },
    q4_compensation: {
      mechanism: 'Compensación simplificada de excedentes horaria o venta a mercado',
      description: 'Mecanismo de coeficientes de reparto estáticos o dinámicos horarios (código CAU) entre consumidores asociados a una misma instalación de generación dentro del perímetro autorizado.'
    },
    q5_incentives: [
      'Programa CE IMPLEMENTA (fondos NextGenerationEU canalizados por IDAE)',
      'Bonificaciones locales en el IBI (Impuesto sobre Bienes Inmuebles) del 30% al 50%',
      'Bonificaciones en el ICIO (Impuesto de Construcciones)',
      'Deducciones autonómicas en el IRPF por inversión en renovables',
      'Oficinas de Transformación Comunitaria (OTC) para asistencia técnica gratuita'
    ],
    q6_socialTariffs: 'Articulación viable a través de la cesión de coeficientes de reparto de generación municipal a familias perceptoras del Bono Social Eléctrico en situación de vulnerabilidad severa.',
    q7_exclusionRisk: 'Inquilinos sin derecho de decisión en juntas de propietarios de edificios residenciales, y hogares vulnerables sin capacidad económica inicial para adquirir participaciones sociales.',
    q8_multilateral: 'Fondos de Recuperación y Resiliencia NextGenEU, programas LIFE de la Comisión Europea, Banco Europeo de Inversiones (BEI).',
    q9_financialBarriers: '1) Financiación puente ante las demoras en el desembolso de subvenciones públicas aprobadas; 2) Dificultades de las cooperativas de reciente creación para obtener avales sin responsabilidad patrimonial solidaria.',
    q10_businessModel: 'Cooperativa de consumo de energía renovable sin ánimo de lucro en colaboración público-privada con el Ayuntamiento (cesión de tejados públicos de escuelas y polideportivos a 25 años).',
    q11_actors: 'Ayuntamientos rurales, cooperativas energéticas ciudadanas (Som Energia, GoiEner, etc.), grupos de desarrollo rural y agencias regionales de energía.',
    q12_barriers: [
      { text: 'Trabas burocráticas y retrasos en activación de contratos por parte de las grandes distribuidoras', type: 'institucional', priority: 'alta' },
      { text: 'Restricción perimétrica de distancia de 2 km para cubiertas fotovoltaicas', type: 'regulatoria', priority: 'media' },
      { text: 'Complejidad en la toma de decisiones dentro de comunidades de propietarios (Ley Propiedad Horizontal)', type: 'social', priority: 'alta' }
    ],
    q12_opportunities: [
      { text: 'Fuerte apoyo financiero del PRTR / IDAE mediante convocatorias CE IMPLEMENTA', type: 'financiera', priority: 'alta' },
      { text: 'Red consolidada de Oficinas de Transformación Comunitaria (OTC)', type: 'informacion', priority: 'alta' },
      { text: 'Gran madurez del movimiento cooperativo energético ciudadano', type: 'social', priority: 'alta' }
    ],
    q13_priorityReform: {
      responsible: 'Ministerio para la Transición Ecológica (MITECO) y CNMC',
      instrument: 'Aprobación del Estatuto Integral de las Comunidades Energéticas y régimen sancionador a distribuidoras',
      estimatedTime: '6 meses',
      description: 'Transponer de forma completa las Directivas europeas dotando a las CEs de derechos de acceso no discriminatorio a la red y penalizaciones por demoras del DSO.'
    },
    synthesis: {
      generalScore: 3,
      strength: 'Ecosistema cooperativo ciudadano consolidado y robusto apoyo de fondos de recuperación NextGenEU.',
      barrier: 'Inercias y trabas operativas de las distribuidoras en la activación de coeficientes de reparto.',
      fundingOpportunity: 'Convocatorias de concurrencia competitiva del IDAE (CE IMPLEMENTA) y fondos municipales.',
      pilotTerritory: 'Municipios en reto demográfico (España Vaciada) y polígonos industriales mancomunados.',
      priorityAction: 'Aprobar el marco reglamentario definitivo que sancione los retrasos injustificados en conexión de autoconsumo colectivo.',
      verificationLinks: 'https://www.idae.es/ayudas-y-financiacion/comunidades-energeticas | RDL 23/2020'
    }
  }
};
