import { EnergyCommunity } from '../types';

export const communitiesData: EnergyCommunity[] = [
  // ═══════════════════════════════════════════════════
  // SPAIN
  // ═══════════════════════════════════════════════════
  {
    id: 'eco-som-energia',
    name: 'Som Energia',
    region: 'Europe',
    countries: ['España'],
    summary: 'Mayor cooperativa de consumo de energia verde de Europa, con mas de 86.000 socias y 124.000 contratos de suministro renovable. Modelo pionero de capital social voluntario que financia plantas de generacion sin recurrir a la banca tradicional.',
    mapCoordinates: [2.8214, 41.9794],
    status: 'activa',
    dimensionTE: {
      technology: 'Comercializacion y Generacion Renovable Mixta (Solar, Eolica, Biogas)',
      capacityMW: 17,
      description: 'Más de 17 MW de potencia propia instalada. 210 plantas representadas en el mercado (incremento del 13% interanual en 2024). Opera a nivel nacional en comercializacion de energia 100% renovable.',
      tisScore: [5, 4, 5, 4, 5, 4, 3]
    },
    dimensionGO: {
      model: 'Cooperativa de Consumidores y Usuarios',
      membersCount: 86000,
      description: 'Organizacion asamblearia descentralizada con grupos locales. Un socio, un voto, independientemente del capital social aportado. Escuela de Som Energia para alfabetizacion energetica.',
      ostromChecklist: [true, true, true, true, true, true, true, false]
    },
    dimensionRF: {
      legalStatus: 'Cooperativa de Servicios (CER/CCE)',
      financingMechanism: 'Aportaciones voluntarias de capital social, crowdlending, tarifas cooperativas.',
      description: 'Adaptacion a las directivas de la UE (RED II / IEMD). Lider en impulsar cambios normativos de la figura de Comunidad Ciudadana de Energia en España.',
      isRegulatoryDivideAffected: false,
      regulatoryNotes: 'Beneficiaria del RDL 23/2020 y las leyes autonomicas de comunidades energeticas. 659 CEs registradas en España a finales de 2024.'
    },
    dimensionAS: {
      localImpact: 'Fuerte empoderamiento asambleario',
      description: 'Plataformas como la "Escuela de Som Energia" para alfabetizacion energetica y emancipacion de los consumidores del oligopolio.',
      emancipationLevel: 5
    }
  },
  {
    id: 'eco-goiener',
    name: 'GoiEner',
    region: 'Europe',
    countries: ['España'],
    summary: 'Cooperativa de generacion y consumo participativo del Pais Vasco con 17.611 socios. Estrategia 2024-2025 centrada en reducir dependencia del mercado mayorista mediante acuerdos bilaterales de compra de energia (PPA).',
    mapCoordinates: [-2.1788, 43.0543],
    status: 'activa',
    dimensionTE: {
      technology: 'Generacion Distribuida, Comercializacion y PPA',
      description: 'Gestion de plantas fotovoltaicas en tejados publicos e industriales. Oficina tecnica que acompaña la creacion de comunidades energeticas locales en municipios pequeños.',
      tisScore: [4, 5, 4, 3, 4, 4, 4]
    },
    dimensionGO: {
      model: 'Cooperativa de Consumo',
      membersCount: 17611,
      description: 'Fomento intenso del tejido social local ("herrilan") y asambleas, integrando modelos de gobernanza participativa vasca.',
      ostromChecklist: [true, true, true, true, true, true, false, true]
    },
    dimensionRF: {
      legalStatus: 'Sociedad Cooperativa',
      financingMechanism: 'Capital colectivo local, pequeñas subscripciones por proyectos, PPA bilaterales.',
      description: 'Se apoya en la legislacion autonomica vasca e incidencias en la transposicion nacional de las directivas europeas.',
      isRegulatoryDivideAffected: false,
      regulatoryNotes: 'Dificultades burocraticas en acceso a red para plantas de tamaño medio (100kW - 1MW).'
    },
    dimensionAS: {
      localImpact: 'Resiliencia territorial y erradicacion de pobreza energetica',
      description: 'Goiener Elkartea (brazo social) trabaja para apoyar a poblacion vulnerable coordinando presupuestos municipales participativos.',
      emancipationLevel: 5
    }
  },
  {
    id: 'eco-enercoop',
    name: 'Grupo Enercoop (COMPTEM)',
    region: 'Europe',
    countries: ['España'],
    summary: 'Cooperativa electrica centenaria (c. 1925) propietaria de la red de distribucion local en Crevillent, Alicante. Modelo COMPTEM de comunidad energetica integral con beneficio neto de 2.11M EUR en 2024.',
    mapCoordinates: [-0.8093, 38.2492],
    status: 'activa',
    dimensionTE: {
      technology: 'Solar FV, Redes Inteligentes (Smart Grids), Almacenamiento',
      description: 'Instalaciones FV en autoconsumo colectivo sobre tejados municipales e industriales, abarcando toda la ciudad. Propietaria de red de distribucion local.',
      tisScore: [5, 4, 5, 5, 5, 5, 4]
    },
    dimensionGO: {
      model: 'Cooperativa Centenaria + Consorcio Local',
      membersCount: 14000,
      description: 'Integracion en el modelo COMPTEM de alianzas publico-privadas-ciudadanas bajo esquema de cooperativa intergeneracional. Tarifas electricas mas competitivas de España.',
      ostromChecklist: [true, true, true, true, false, true, true, true]
    },
    dimensionRF: {
      legalStatus: 'Cooperativa Concesionaria de Distribucion',
      financingMechanism: 'Fondos FEDER, IDAE y recursos propios de la cooperativa.',
      description: 'Aprovecha el RD 244/2019 de autoconsumo colectivo. Pionera del concepto de CCE/CER local mediante "sandboxes" normativos.',
      isRegulatoryDivideAffected: false,
      regulatoryNotes: 'Desarrolla proyectos piloto regulatorios a nivel europeo (H2020: MERLON). Beneficio neto de 2.11M EUR en 2024.'
    },
    dimensionAS: {
      localImpact: 'Pueblo totalmente involucrado',
      description: 'Conversion de la comunidad entera como "laboratorio viviente" para transicion energetica.',
      emancipationLevel: 4
    }
  },
  {
    id: 'eco-nosa-enerxia',
    name: 'Nosa Enerxia',
    region: 'Europe',
    countries: ['España'],
    summary: 'Cooperativa gallega de comercializacion de electricidad verde, con enfoque en la revitalizacion economica de zonas rurales despobladas del noroeste peninsular.',
    mapCoordinates: [-8.4115, 42.8805],
    status: 'activa',
    dimensionTE: {
      technology: 'Comercializacion de energia 100% renovable',
      description: 'Suministro de electricidad verde a hogares y pymes gallegas. Colabora con proyectos de autoconsumo colectivo fotovoltaico en la region.',
      tisScore: [3, 4, 4, 3, 3, 3, 4]
    },
    dimensionGO: {
      model: 'Cooperativa de Consumo',
      membersCount: 2500,
      description: 'Economia social y solidaria. Toma de decisiones asamblearia con enfasis en identidad territorial gallega.',
      ostromChecklist: [true, true, true, true, false, true, false, false]
    },
    dimensionRF: {
      legalStatus: 'Cooperativa de Servicios',
      financingMechanism: 'Cuotas de socios y tarifas de comercializacion.',
      description: 'Opera bajo el marco regulatorio español de comercializacion libre.',
      isRegulatoryDivideAffected: false,
      regulatoryNotes: 'Parte de la red de cooperativas energeticas españolas.'
    },
    dimensionAS: {
      localImpact: 'Revitalizacion rural y soberania energetica local',
      description: 'Enfoque en comunidades rurales con riesgo de despoblacion, donde la energia comunitaria es herramienta contra la exclusion territorial.',
      emancipationLevel: 4
    }
  },
  {
    id: 'eco-begonte-genera',
    name: 'Begonte Genera',
    region: 'Europe',
    countries: ['España'],
    summary: 'Asociacion de autoconsumo colectivo fotovoltaico en el municipio de Begonte (Lugo), centrada en la reduccion de la factura electrica de los hogares gallegos rurales.',
    mapCoordinates: [-7.6872, 43.1175],
    status: 'activa',
    dimensionTE: {
      technology: 'Autoconsumo Colectivo Solar FV',
      description: 'Instalacion fotovoltaica compartida entre vecinos del municipio para reduccion directa de la factura electrica.',
      tisScore: [3, 3, 3, 2, 3, 2, 3]
    },
    dimensionGO: {
      model: 'Asociacion Vecinal',
      membersCount: 80,
      description: 'Gestion comunitaria a nivel municipal con participacion directa de los vecinos en decisiones operativas.',
      ostromChecklist: [true, true, true, false, false, true, false, false]
    },
    dimensionRF: {
      legalStatus: 'Asociacion',
      financingMechanism: 'Cuotas de socios y subvenciones publicas (IDAE/Xunta).',
      description: 'Se beneficia del RD 244/2019 de autoconsumo colectivo y de las ayudas autonomicas gallegas.',
      isRegulatoryDivideAffected: false,
      regulatoryNotes: 'Ejemplo de CE rural de pequeña escala en la España vaciada.'
    },
    dimensionAS: {
      localImpact: 'Ahorro energetico colectivo en entorno rural',
      description: 'Reduce la pobreza energetica en hogares rurales mediante el autoconsumo compartido.',
      emancipationLevel: 3
    }
  },
  {
    id: 'eco-candela',
    name: 'Candela Cooperativa',
    region: 'Europe',
    countries: ['España'],
    summary: 'Cooperativa energetica andaluza enfocada en la comercializacion de electricidad alternativa con fuerte componente de economia social y solidaria.',
    mapCoordinates: [-5.9845, 37.3891],
    status: 'activa',
    dimensionTE: {
      technology: 'Comercializacion renovable',
      description: 'Suministro de electricidad de origen renovable certificado a hogares y organizaciones sociales en Andalucia.',
      tisScore: [3, 3, 4, 3, 3, 3, 4]
    },
    dimensionGO: {
      model: 'Cooperativa de Economia Social',
      membersCount: 1500,
      description: 'Gestion horizontal con enfasis en justicia energetica y accesibilidad para colectivos vulnerables.',
      ostromChecklist: [true, true, true, true, false, true, false, false]
    },
    dimensionRF: {
      legalStatus: 'Cooperativa de Servicios',
      financingMechanism: 'Tarifas cooperativas y apoyo de redes de economia solidaria.',
      description: 'Opera bajo la regulacion española de libre comercializacion con enfoque en tarifas sociales.',
      isRegulatoryDivideAffected: false,
      regulatoryNotes: 'Vinculada a la Red de Economia Alternativa y Solidaria (REAS).'
    },
    dimensionAS: {
      localImpact: 'Justicia energetica en contextos de vulnerabilidad',
      description: 'Prioriza el acceso a energia limpia para colectivos en riesgo de exclusion social en Andalucia.',
      emancipationLevel: 5
    }
  },

  // ═══════════════════════════════════════════════════
  // PORTUGAL
  // ═══════════════════════════════════════════════════
  {
    id: 'eco-coopernico',
    name: 'Coopernico',
    region: 'Europe',
    countries: ['Portugal'],
    summary: 'Primera cooperativa de energia renovable de Portugal, pionera en crowdfunding energetico y en la transposicion de las directivas europeas al contexto portugues.',
    mapCoordinates: [-9.1393, 38.7223],
    status: 'activa',
    dimensionTE: {
      technology: 'Solar FV (Crowdfunding + Autoconsumo Colectivo)',
      description: 'Financiacion colectiva de plantas solares en tejados publicos y privados. Modelo de rentabilidad social y ambiental para los inversores cooperativistas.',
      tisScore: [4, 4, 4, 3, 4, 3, 4]
    },
    dimensionGO: {
      model: 'Cooperativa de Energia Renovable',
      membersCount: 3000,
      description: 'Estructura asamblearia inspirada en el modelo cooperativo iberico. Transparencia total en la gestion financiera de los proyectos.',
      ostromChecklist: [true, true, true, true, true, true, false, false]
    },
    dimensionRF: {
      legalStatus: 'Cooperativa (CER bajo RED II)',
      financingMechanism: 'Crowdfunding cooperativo, cuotas de socios.',
      description: 'Pionera en la transposicion de la directiva RED II en Portugal. Trabaja con el gobierno portugues en el desarrollo del marco regulatorio de CERs.',
      isRegulatoryDivideAffected: false,
      regulatoryNotes: 'Portugal aun esta en proceso de completar la transposicion de la figura de CER.'
    },
    dimensionAS: {
      localImpact: 'Democratizacion del acceso a la energia limpia',
      description: 'Permite a ciudadanos sin tejado propio invertir en energia solar y recibir retorno economico y ambiental.',
      emancipationLevel: 4
    }
  },

  // ═══════════════════════════════════════════════════
  // COLOMBIA
  // ═══════════════════════════════════════════════════
  {
    id: 'eco-la-estrecha',
    name: 'Comunidad Solar La Estrecha',
    region: 'South America',
    countries: ['Colombia'],
    summary: 'Primera comunidad energetica conectada a la red en Colombia. Nacida de la investigacion de la Universidad EIA junto con EPM y ERCO en Medellin, valida el concepto de empoderamiento del usuario.',
    mapCoordinates: [-75.5812, 6.2442],
    status: 'activa',
    dimensionTE: {
      technology: 'Autoconsumo Solar Colectivo Urbano',
      description: 'Planta de 21 paneles solares (~9kWp) montada en una junta de accion comunal, conectada bajo figura de autogenerador a pequeña escala.',
      tisScore: [3, 2, 4, 2, 5, 2, 2]
    },
    dimensionGO: {
      model: 'Red de Apoyo Barrial',
      membersCount: 30,
      description: 'A traves de la Corporacion Picacho Con Futuro. Esquema de toma de decisiones asimilado al tejido barrial. Validacion del concepto de "empoderamiento del usuario".',
      ostromChecklist: [true, false, true, false, false, true, false, false]
    },
    dimensionRF: {
      legalStatus: 'Junta de Accion Comunal / Organizacion de Base',
      financingMechanism: 'Apoyo internacional, ONG, crowdfunding, Universidad EIA, EPM.',
      description: 'La regulacion CREG vigente restringe el autoconsumo "colectivo" con cesion de excedentes. Decreto 2236/2023 define comunidades energeticas.',
      isRegulatoryDivideAffected: true,
      regulatoryNotes: 'Pionera en Colombia. RUCE (Registro Unico de Comunidades Energeticas) ya identifica mas de 1.000 comunidades priorizadas a mediados de 2024.'
    },
    dimensionAS: {
      localImpact: 'Justicia Energetica Urbana y Visibilidad',
      description: 'Ha creado apropiacion en el pago solidario e impacto simbolico gigante en el debate nacional de justicia tarifaria.',
      emancipationLevel: 4
    }
  },
  {
    id: 'eco-choco',
    name: 'Comunidades Educativas Energeticas del Choco',
    region: 'South America',
    countries: ['Colombia'],
    summary: '23 comunidades educativas energeticas inauguradas en 2024 en el departamento del Choco (ZNI), beneficiando a mas de 1.400 estudiantes y docentes con energia solar permanente.',
    mapCoordinates: [-76.5167, 5.7333],
    status: 'activa',
    dimensionTE: {
      technology: 'Solar PV + Almacenamiento Aislado (ZNI)',
      description: 'Sistemas solares en escuelas sin conexion a red. Alianza entre MinMinas, MinEducacion y FENOGE. Proveen luz, conectividad y refrigeracion.',
      tisScore: [2, 1, 3, 2, 4, 1, 1]
    },
    dimensionGO: {
      model: 'Gestion Institucional/Comunal',
      membersCount: 1400,
      description: 'Liderada por rectores y comites de padres de familia. Modelo de gestion delegado sobre bienes publicos educativos.',
      ostromChecklist: [false, true, true, false, false, true, false, false]
    },
    dimensionRF: {
      legalStatus: 'Convenio Interinstitucional / Proyecto FENOGE',
      financingMechanism: 'Subsidios Estatales (IPSE, FENOGE), Cooperacion Internacional (USAID).',
      description: 'El marco prioriza la cobertura universal pero falla en el diseño del modelo de O&M financiero a largo plazo post-provision.',
      isRegulatoryDivideAffected: true,
      regulatoryNotes: 'Dificultades con el esquema tarifario en ZNI para cubrir costos de recambio de baterias. Pobreza energetica nacional: 16.1% (2023).'
    },
    dimensionAS: {
      localImpact: 'Conectividad y Educacion en comunidades etnicas',
      description: 'Energiza salas de informatica y refrigeracion de alimentos para estudiantes. Impacto directo en instituciones como I.E. Cristo Rey (Tutunendo) y centros educativos indigenas.',
      emancipationLevel: 3
    }
  },

  // ═══════════════════════════════════════════════════
  // CHILE
  // ═══════════════════════════════════════════════════
  {
    id: 'eco-fae-chile',
    name: 'Proyectos FAE (Araucania / Mapuche)',
    region: 'South America',
    countries: ['Chile'],
    summary: 'Proyectos del Fondo de Acceso a la Energia (FAE) en La Araucania. 48 proyectos adjudicados en 2024, con 8 ganadores en la region, incluyendo comunidades indigenas y adultos mayores.',
    mapCoordinates: [-72.6347, -38.7416],
    status: 'incubacion',
    dimensionTE: {
      technology: 'Hibrida (Solar Autoconsumo, Biogas, Eolica)',
      description: 'Sistemas FV de hasta 10 kWp con baterias para zonas propensas a interrupciones. Configuracion para ahorro economico y continuidad de servicio.',
      tisScore: [3, 2, 4, 3, 4, 2, 2]
    },
    dimensionGO: {
      model: 'Juntas de Vecinos / Comunidades Indigenas',
      description: 'La toma de decisiones pasa por las asambleas territoriales tradicionales. Beneficiarios incluyen Club Adulto Mayor Verde Esperanza (Lumaco), Comunidad Indigena Juan Huenchuman (Teodoro Schmidt).',
      ostromChecklist: [true, true, true, true, true, false, true, false]
    },
    dimensionRF: {
      legalStatus: 'Subvencion a Personalidad Juridica Sin Fines de Lucro',
      financingMechanism: 'Fondo Concursable Estatal (FAE), AgenciaSE.',
      description: 'Al amparo de la legislacion chilena (Net Billing). Carecen de figura de generacion compartida extendida.',
      isRegulatoryDivideAffected: true,
      regulatoryNotes: 'Sujetos a brecha entre donacion inicial de equipos vs escalamiento. Ley 21.118 de Generacion Distribuida (2018).'
    },
    dimensionAS: {
      localImpact: 'Soberania y Pertinencia Cultural',
      description: 'Se integra la vision cosmologica (buen vivir / kume mogen) al concepto tecnico de energia.',
      emancipationLevel: 4
    }
  },
  {
    id: 'eco-kume-mogen',
    name: 'Cooperativa Mapuche Kume Mogen',
    region: 'South America',
    countries: ['Chile'],
    summary: 'Cooperativa de Ahorro y Credito Endogena Mapuche con 943 socios activos y 10 años de trayectoria. Piloto de energia solar comunitaria que integra soberania energetica con identidad cultural.',
    mapCoordinates: [-72.4521, -38.5985],
    status: 'incubacion',
    dimensionTE: {
      technology: 'Solar FV Comunitaria (10 kWp)',
      description: 'Sistema de 10 kWp en oficinas de la cooperativa para reducir costos electricos de sus miembros. Enfoque en soberania energetica con identidad cultural.',
      tisScore: [3, 3, 3, 3, 5, 2, 3]
    },
    dimensionGO: {
      model: 'Cooperativa Indigena de Ahorro y Credito',
      membersCount: 943,
      description: 'Modelo endogeno mapuche: integracion de valores culturales del pueblo Mapuche con la tecnologia de vanguardia. Autodesarrollo sostenible.',
      ostromChecklist: [true, true, true, true, true, true, true, false]
    },
    dimensionRF: {
      legalStatus: 'Cooperativa de Ahorro y Credito',
      financingMechanism: 'FAE (Fondo de Acceso a la Energia), recursos propios cooperativos.',
      description: 'Hito historico en Chile: primera cooperativa indigena adjudicataria de piloto de energia solar comunitaria.',
      isRegulatoryDivideAffected: true,
      regulatoryNotes: 'Desafio: escalar de piloto a modelo replicable sin la figura regulatoria de generacion compartida.'
    },
    dimensionAS: {
      localImpact: 'Soberania energetica con identidad Mapuche',
      description: 'Desarrollo sostenible autogestionado que vincula valores del pueblo Mapuche con tecnologia renovable.',
      emancipationLevel: 5
    }
  },

  // ═══════════════════════════════════════════════════
  // COSTA RICA
  // ═══════════════════════════════════════════════════
  {
    id: 'eco-coopeguanacaste',
    name: 'CoopeGuanacaste R.L.',
    region: 'Central & North America',
    countries: ['Costa Rica'],
    summary: 'Tercera empresa electrica de Costa Rica, fundada en 1965. Cobertura del 99.51% en 3.760 km2. Modelo de excelencia con medidores inteligentes (90% AMI), bonos verdes y gasificacion de residuos.',
    mapCoordinates: [-85.5804, 10.2604],
    status: 'activa',
    dimensionTE: {
      technology: 'Hidroelectrica, Solar (5MW), Eolica, Gasificacion de Residuos',
      description: 'Parque Solar Huacas (5MW, 9 GWh/año). Proyecto pionero de gasificacion de 150 t/dia de residuos solidos. 90% de asociados con medidores inteligentes AMI.',
      tisScore: [5, 5, 4, 5, 5, 5, 5]
    },
    dimensionGO: {
      model: 'Cooperativa de Electrificacion Rural Consolidada',
      membersCount: 88000,
      description: 'Estructura delegada madura (delegados -> asamblea -> consejo rector). Altamente profesionalizada. Indice DPIR: solo 7.67 horas anuales de interrupcion.',
      ostromChecklist: [true, true, true, true, true, true, true, true]
    },
    dimensionRF: {
      legalStatus: 'Sociedad Cooperativa Concesionaria',
      financingMechanism: 'Bonos Verdes en mercado financiero, BID, tarifas reguladas a usuarios.',
      description: 'Opera bajo exclusividad del sistema costarricense regulado por ARESEP. Participa como una pequeña "utility" integrada.',
      isRegulatoryDivideAffected: false,
      regulatoryNotes: 'Marco regulatorio robusto. Desafio actual: venta de excedentes de modelo distribuido a ICE. Perdidas de red: solo 5.6%.'
    },
    dimensionAS: {
      localImpact: 'Desarrollo Territorial Total',
      description: 'Inversiones en comercio local, becas universitarias, reforestacion, servicios sanitarios y programa Hogares Conectados (reduccion brecha digital).',
      emancipationLevel: 4
    }
  },

  // ═══════════════════════════════════════════════════
  // MEXICO
  // ═══════════════════════════════════════════════════
  {
    id: 'eco-onergia',
    name: 'Onergia Cooperativa',
    region: 'Central & North America',
    countries: ['Mexico'],
    summary: 'Cooperativa de servicios energeticos (ESCO) que implementa proyectos de eficiencia y energia renovable bajo principios de economia solidaria. Las comunidades poseen y controlan sus activos de generacion.',
    mapCoordinates: [-98.2063, 19.0414],
    status: 'activa',
    dimensionTE: {
      technology: 'Energia Solar FV en Generador Exento',
      description: 'Instalacion de techos FV (< 500kW) mediante cooperativismo para casas y pymes. Modelo ESCO que asegura que los beneficios economicos permanecen en la localidad.',
      tisScore: [3, 4, 3, 3, 3, 2, 3]
    },
    dimensionGO: {
      model: 'Cooperativa de Trabajo / Asesoramiento (ESCO)',
      membersCount: 20,
      description: 'Asesoramiento y formacion popular asamblearia con grupos originarios y urbanos. Escuela de Energia Comunitaria.',
      ostromChecklist: [true, true, true, true, false, true, false, true]
    },
    dimensionRF: {
      legalStatus: 'Cooperativa Limitada',
      financingMechanism: 'Auto-gestion, Crowdfunding, Prestacion de servicios de consultoria e instalacion.',
      description: 'Se enfrenta al marco energetico centralizado regulado por CRE/CFE. Emplea la figura de "Generacion Exenta" legalmente permitida.',
      isRegulatoryDivideAffected: true,
      regulatoryNotes: 'Luchan por la figura de consumo cooperativo colectivo que no esta reglamentado solidamente en Mexico.'
    },
    dimensionAS: {
      localImpact: 'Resistencia contra el despojo territorial',
      description: 'Genera una narrativa critica que redefine la energia local como un derecho humano y no una mercancia.',
      emancipationLevel: 5
    }
  },
  {
    id: 'eco-red-girasol',
    name: 'Red Girasol',
    region: 'Central & North America',
    countries: ['Mexico'],
    summary: 'Plataforma de financiamiento colectivo para sistemas solares en Mexico. Facilita la transicion energetica a traves de crowdfunding y prestamos accesibles para instalaciones renovables.',
    mapCoordinates: [-99.1332, 19.4326],
    status: 'activa',
    dimensionTE: {
      technology: 'Solar FV Residencial y Comercial (Crowdfunding)',
      description: 'Financiamiento colectivo para sistemas solares en techos de hogares y negocios. Modelo de prestamos accesibles que democratiza el acceso a energia solar.',
      tisScore: [3, 3, 4, 3, 4, 3, 3]
    },
    dimensionGO: {
      model: 'Plataforma de Financiamiento Colectivo',
      membersCount: 500,
      description: 'Plataforma digital que conecta inversores ciudadanos con proyectos solares. Transparencia en retornos y impacto ambiental.',
      ostromChecklist: [true, false, true, true, false, false, false, false]
    },
    dimensionRF: {
      legalStatus: 'Empresa Social / Fintech Energetica',
      financingMechanism: 'Crowdfunding, prestamos ciudadanos, microfinanzas verdes.',
      description: 'Opera bajo la Guia de Cooperativas de Energia Sustentable (GIZ/INAES/DGRV). Innovacion financiera para superar barreras de acceso al capital.',
      isRegulatoryDivideAffected: true,
      regulatoryNotes: 'Beneficiaria de la figura de Generacion Exenta pero limitada por la centralizacion del sistema electrico mexicano.'
    },
    dimensionAS: {
      localImpact: 'Democratizacion financiera de la energia solar',
      description: 'Reduce la barrera de inversion inicial para familias de ingresos medios, generando conciencia sobre la soberania energetica.',
      emancipationLevel: 3
    }
  },

  // ═══════════════════════════════════════════════════
  // BRAZIL
  // ═══════════════════════════════════════════════════
  {
    id: 'eco-brasil-cooperativas',
    name: 'Cooperativas de Generacion Compartida (Ley 14.300)',
    region: 'South America',
    countries: ['Brasil'],
    summary: 'Marco legal brasileño de micro y minigeneracion distribuida (Ley 14.300/2022) que habilita consorcios, cooperativas y condominios de hasta 5 MW con sistema de creditos energeticos a 60 meses.',
    mapCoordinates: [-43.1729, -22.9068],
    status: 'activa',
    dimensionTE: {
      technology: 'Solar FV Distribuida (Micro y Minigeneracion hasta 5 MW)',
      description: 'Generacion compartida (Geracao Compartilhada) mediante consorcios, cooperativas o condominios. Sistema de creditos de energia con compensacion a 60 meses.',
      tisScore: [4, 3, 4, 3, 4, 3, 3]
    },
    dimensionGO: {
      model: 'Consorcios y Cooperativas de Generacion',
      membersCount: 5000,
      description: 'Multiples formatos: consorcios empresariales, cooperativas ciudadanas y condominios. La regulacion prohibe el fraccionamiento de plantas para evitar arbitraje regulatorio.',
      ostromChecklist: [true, true, true, false, false, true, false, false]
    },
    dimensionRF: {
      legalStatus: 'Consorcio / Cooperativa bajo Ley 14.300/2022',
      financingMechanism: 'Net metering, creditos energeticos, inversion privada.',
      description: 'Ley 14.300/2022 consolido el marco legal de micro y minigeneracion distribuida en Brasil. Resolucion ANEEL 482/2012 fue la base original.',
      isRegulatoryDivideAffected: true,
      regulatoryNotes: 'No existe reconocimiento formal de "comunidad energetica" como figura juridica. Reciente incertidumbre regulatoria sobre compensaciones.'
    },
    dimensionAS: {
      localImpact: 'Acceso a energia renovable para clase media urbana',
      description: 'Las cooperativas de generacion compartida permiten que ciudadanos sin espacio para paneles accedan a energia solar mediante cuotas.',
      emancipationLevel: 3
    }
  },

  // ═══════════════════════════════════════════════════
  // ARGENTINA
  // ═══════════════════════════════════════════════════
  {
    id: 'eco-mendoza-ped',
    name: 'Distrito de Energia Positiva - Mendoza',
    region: 'South America',
    countries: ['Argentina'],
    summary: 'Proyecto PED (Positive Energy District) en la Ciudad de Mendoza para mitigar islas de calor urbanas mediante edificios eficientes, transporte electrificado y generacion distribuida.',
    mapCoordinates: [-68.8272, -32.8908],
    status: 'incubacion',
    dimensionTE: {
      technology: 'Solar FV + Eficiencia Edilicia + Movilidad Electrica',
      description: 'Diseño de soluciones sostenibles apoyadas en pilares tecnicos y de movilidad para reducir pobreza energetica a traves de edificios mas eficientes.',
      tisScore: [3, 2, 3, 3, 3, 2, 2]
    },
    dimensionGO: {
      model: 'Alianza Municipio-Universidad',
      description: 'Planificacion urbana integral con participacion de la universidad y el gobierno municipal. Modelo PED adaptado al contexto latinoamericano.',
      ostromChecklist: [true, false, true, false, false, true, false, false]
    },
    dimensionRF: {
      legalStatus: 'Proyecto Municipal / Cooperacion Internacional',
      financingMechanism: 'Cooperacion internacional (AECID), fondos municipales, Ley 27.191.',
      description: 'Se ampara en la Ley 27.191 y leyes provinciales de net metering. Generacion distribuida virtual comunitaria ≤12 MW.',
      isRegulatoryDivideAffected: true,
      regulatoryNotes: 'Fragmentacion provincial e inestabilidad economica como principales barreras. Argentina en etapa "Activa" de regulacion.'
    },
    dimensionAS: {
      localImpact: 'Mitigacion de islas de calor y pobreza energetica',
      description: 'Reduccion de vulnerabilidad climatica urbana mediante integracion de eficiencia energetica, renovables y movilidad electrica.',
      emancipationLevel: 2
    }
  },

  // ═══════════════════════════════════════════════════
  // HONDURAS
  // ═══════════════════════════════════════════════════
  {
    id: 'eco-gloria-dios-honduras',
    name: 'Residencial Gloria a Dios (PED)',
    region: 'Central & North America',
    countries: ['Honduras'],
    summary: 'Proyecto de Distrito de Energia Positiva en Tegucigalpa enfocado en sostenibilidad social, drenaje y resiliencia climatica, con participacion activa de jovenes y juntas directivas locales.',
    mapCoordinates: [-87.2068, 14.0723],
    status: 'incubacion',
    dimensionTE: {
      technology: 'Solar FV + Gestion de Agua y Drenaje',
      description: 'Integracion de energia solar con infraestructura de drenaje y gestion de aguas. Enfoque en resiliencia ante eventos climaticos extremos.',
      tisScore: [2, 2, 3, 2, 3, 2, 2]
    },
    dimensionGO: {
      model: 'Junta Directiva Residencial + Juventud Local',
      description: 'Involucra a la junta directiva y a jovenes locales en la planificacion. Sostenibilidad a largo plazo mediante cuotas comunitarias.',
      ostromChecklist: [true, true, true, false, false, true, false, false]
    },
    dimensionRF: {
      legalStatus: 'Proyecto PED / Cooperacion Internacional',
      financingMechanism: 'Cooperacion internacional (AECID), cuotas comunitarias.',
      description: 'Marco regulatorio hondureño aun emergente para comunidades energeticas. Proyecto demostrativo de adaptacion del concepto PED europeo.',
      isRegulatoryDivideAffected: true,
      regulatoryNotes: 'Alta vulnerabilidad climatica. Modelo PED requiere adaptacion significativa al contexto centroamericano.'
    },
    dimensionAS: {
      localImpact: 'Resiliencia climatica comunitaria',
      description: 'Empoderamiento juvenil en planificacion energetica y gestion de riesgos. Cuotas comunitarias aseguran sostenibilidad.',
      emancipationLevel: 3
    }
  },

  // ═══════════════════════════════════════════════════
  // DOMINICAN REPUBLIC
  // ═══════════════════════════════════════════════════
  {
    id: 'eco-rd-ped',
    name: 'Distrito Nacional PED (Rep. Dominicana)',
    region: 'Central & North America',
    countries: ['Republica Dominicana'],
    summary: 'Proyecto de Distrito de Energia Positiva en Santo Domingo basado en TICs y Big Data energetica para mejorar la fiabilidad del suministro electrico en el Caribe.',
    mapCoordinates: [-69.9312, 18.4861],
    status: 'incubacion',
    dimensionTE: {
      technology: 'Solar FV + TICs + Big Data Energetica',
      description: 'Integracion de tecnologias de informacion con generacion distribuida para optimizar la gestion energetica urbana en contexto caribeno.',
      tisScore: [3, 2, 3, 2, 3, 2, 2]
    },
    dimensionGO: {
      model: 'Alianza Gobierno-Academia-Tecnologia',
      description: 'Colaboracion entre instituciones gubernamentales, universidades y empresas de tecnologia para diseñar un distrito energetico inteligente.',
      ostromChecklist: [true, false, true, false, false, false, false, false]
    },
    dimensionRF: {
      legalStatus: 'Proyecto PED / Cooperacion Internacional',
      financingMechanism: 'Cooperacion internacional (AECID), fondos publicos.',
      description: 'Republica Dominicana enfrenta desafios de fiabilidad del suministro electrico. El proyecto busca demostrar la viabilidad de distritos energeticos positivos.',
      isRegulatoryDivideAffected: true,
      regulatoryNotes: 'Fiabilidad en el Caribe como principal desafio tecnico y regulatorio.'
    },
    dimensionAS: {
      localImpact: 'Mejora de fiabilidad y resiliencia urbana',
      description: 'Uso de Big Data para anticipar y gestionar interrupciones del suministro, mejorando la calidad de vida urbana.',
      emancipationLevel: 2
    }
  },
];
