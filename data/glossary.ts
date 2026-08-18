export interface GlossaryEntry {
  term: string;
  category: 'Generation Hardware' | 'Storage' | 'Grid Context' | 'Management Software' | 'Emerging Tech' | 'Cybersecurity' |
            'Organizational Model' | 'Decision Making' | 'Participation Equity' | 'Transparency' | 'Human Capacities' | 'Accountability Conflict Resolution' | 'Lifecycle' |
            'Enabling Legal Framework' | 'Financing' | 'DSO Relationship' | 'Regulatory Stability Predictability' |
            'Distributive Justice' | 'Procedural Justice' | 'Recognition Justice' | 'Restorative Justice' | 'Community Agency & Empowerment';
  dimension: 'TE' | 'GO' | 'RF' | 'AS';
  definition: string;
}

export const glossaryData: GlossaryEntry[] = [
  // ==========================================
  // A. DIMENSIÓN TECNOLÓGICA (TE)
  // ==========================================
  {
    term: 'Solar FV',
    dimension: 'TE',
    category: 'Generation Hardware',
    definition: 'Paneles fotovoltaicos que convierten la luz solar directamente en electricidad; la tecnología de generación más común en las comunidades energéticas (89% de los casos en la región).'
  },
  {
    term: 'Eólica',
    dimension: 'TE',
    category: 'Generation Hardware',
    definition: 'Aerogeneradores de pequeña escala utilizados para la generación eléctrica local, a menudo de forma complementaria a la tecnología solar fotovoltaica.'
  },
  {
    term: 'Biomasa',
    dimension: 'TE',
    category: 'Generation Hardware',
    definition: 'Materiales orgánicos (residuos agrícolas, madera, etc.) utilizados para la generación de calor o electricidad en comunidades energéticas rurales.'
  },
  {
    term: 'Mini-hidráulica',
    dimension: 'TE',
    category: 'Generation Hardware',
    definition: 'Centrales minihidráulicas o microhidráulicas (típicamente &lt;10 MW) que aprovechan las corrientes de agua locales sin necesidad de grandes embalses.'
  },
  {
    term: 'H2 Verde',
    dimension: 'TE',
    category: 'Storage',
    definition: 'Hidrógeno producido a partir de electricidad renovable mediante electrólisis; utilizado para almacenamiento a largo plazo o sectores difíciles de electrificar.'
  },
  {
    term: 'Baterías',
    dimension: 'TE',
    category: 'Storage',
    definition: 'Dispositivos de almacenamiento electroquímico (iones de litio, plomo-ácido, etc.) que proporcionan flexibilidad y regulación a corto y mediano plazo.'
  },
  {
    term: 'Alm. Térmico',
    dimension: 'TE',
    category: 'Storage',
    definition: 'Sistemas que almacenan calor (ej. sales fundidas, tanques de agua caliente) para su uso posterior en calefacción o generación de energía.'
  },
  {
    term: 'Alm. Hidrógeno',
    dimension: 'TE',
    category: 'Storage',
    definition: 'Almacenamiento de energía química en forma de gas hidrógeno, adecuado para respaldo estacional o de varios días.'
  },
  {
    term: 'Microrred',
    dimension: 'TE',
    category: 'Grid Context',
    definition: 'Una red local autocontrolada que puede funcionar conectada a la red principal o de forma aislada en modo de isla energética.'
  },
  {
    term: 'Red Urbana',
    dimension: 'TE',
    category: 'Grid Context',
    definition: 'Comunidades energéticas ubicadas en ciudades, típicamente conectadas a una red de distribución eléctrica fuerte y mallada.'
  },
  {
    term: 'Red Rural',
    dimension: 'TE',
    category: 'Grid Context',
    definition: 'Comunidades energéticas en áreas de baja densidad de población, a menudo con conexiones de red débiles, poco confiables o aisladas.'
  },
  {
    term: 'Red Aislada',
    dimension: 'TE',
    category: 'Grid Context',
    definition: 'Sistemas eléctricos aislados (geográfica o técnicamente) que requieren altos niveles de autosuficiencia y control de frecuencia/voltaje.'
  },
  {
    term: 'SGE Básico',
    dimension: 'TE',
    category: 'Management Software',
    definition: 'Sistema de Gestión de Energía (EMS) con funciones básicas de monitoreo de flujos, adquisición de datos y visualización de consumos.'
  },
  {
    term: 'SGE Inteligente',
    dimension: 'TE',
    category: 'Management Software',
    definition: 'Sistemas avanzados de gestión de energía que utilizan algoritmos de inteligencia artificial para control predictivo, estimación de demanda y optimización horaria.'
  },
  {
    term: 'Gemelos Digitales',
    dimension: 'TE',
    category: 'Emerging Tech',
    definition: 'Réplicas virtuales digitales de sistemas energéticos físicos reales, utilizadas para simulaciones de fallas, pruebas de control y entrenamiento.'
  },
  {
    term: 'Blockchain',
    dimension: 'TE',
    category: 'Emerging Tech',
    definition: 'Tecnología de registro distribuido descentralizado que habilita transacciones directas de energía peer-to-peer (P2P) y contratos inteligentes (smart contracts).'
  },
  {
    term: 'VPP / V2G',
    dimension: 'TE',
    category: 'Emerging Tech',
    definition: 'Planta de Energía Virtual (VPP - agregación digital de recursos distribuidos) y Vehículo a la Red (V2G - inyección bidireccional desde baterías de autos eléctricos).'
  },
  {
    term: 'Cifrado',
    dimension: 'TE',
    category: 'Cybersecurity',
    definition: 'Protección criptográfica de las comunicaciones digitales de control y datos telemétricos dentro de la red inteligente de la comunidad.'
  },
  {
    term: 'Control Acceso',
    dimension: 'TE',
    category: 'Cybersecurity',
    definition: 'Políticas y mecanismos de seguridad de red que restringen qué usuarios o dispositivos externos pueden ver o modificar parámetros críticos.'
  },
  {
    term: 'Ciberseguridad',
    dimension: 'TE',
    category: 'Cybersecurity',
    definition: 'Protección general de la infraestructura de hardware y software de la comunidad frente a hackeos, malware e intrusiones no autorizadas.'
  },

  // ==========================================
  // B. DIMENSIÓN DE GOBERNANZA (GO)
  // ==========================================
  {
    term: 'Cooperativa',
    dimension: 'GO',
    category: 'Organizational Model',
    definition: 'Forma jurídica donde los miembros poseen y controlan democráticamente la comunidad bajo el principio de un miembro, un voto.'
  },
  {
    term: 'Asociación',
    dimension: 'GO',
    category: 'Organizational Model',
    definition: 'Entidad legal sin fines de lucro común para iniciativas comunitarias; menos estricta que una cooperativa pero puede tener limitaciones para la comercialización de excedentes.'
  },
  {
    term: 'Autogobierno Indígena',
    dimension: 'GO',
    category: 'Organizational Model',
    definition: 'Estructuras de gobernanza basadas en autoridades tradicionales y normas consuetudinarias de pueblos indígenas, reconocidas formalmente dentro de la comunidad.'
  },
  {
    term: 'Iniciativa Informal',
    dimension: 'GO',
    category: 'Organizational Model',
    definition: 'Iniciativas y comunidades energéticas que operan sin una estructura jurídica o reconocimiento legal formal, basadas en la confianza y acuerdos de facto.'
  },
  {
    term: 'Un Socio Un Voto',
    dimension: 'GO',
    category: 'Decision Making',
    definition: 'La regla democrática básica de las comunidades y cooperativas donde cada miembro tiene el mismo poder de voto independientemente de su aporte de capital o consumo.'
  },
  {
    term: 'Voto por Consumo',
    dimension: 'GO',
    category: 'Decision Making',
    definition: 'Poder de voto proporcional al consumo anual de energía (o la inversión económica). Es un modelo menos igualitario que puede reflejar el nivel de riesgo financiero de cada socio.'
  },
  {
    term: 'Delegación Líquida',
    dimension: 'GO',
    category: 'Decision Making',
    definition: 'Sistema híbrido de democracia directa y representativa donde los miembros pueden votar sobre temas o delegar su voto en líderes expertos, revocando dicha delegación en cualquier momento.'
  },
  {
    term: 'Liderazgo Rotativo',
    dimension: 'GO',
    category: 'Decision Making',
    definition: 'Evalúa si las posiciones del consejo o junta administrativa cambian periódicamente (liderazgo rotativo) o permanecen asignadas a las mismas personas por tiempo prolongado (fijo).'
  },
  {
    term: 'Plan de Sucesión',
    dimension: 'GO',
    category: 'Decision Making',
    definition: 'Procedimiento documentado que devela la renovación ordenada de directivos o de roles técnicos clave, garantizando la continuidad operativa e institucional de la comunidad.'
  },
  {
    term: 'Equidad de Género',
    dimension: 'GO',
    category: 'Participation Equity',
    definition: 'Medidas organizativas aplicadas para asegurar una participación equilibrada entre géneros en asambleas y puestos directivos, tales como cuotas de género o protocolos específicos.'
  },
  {
    term: 'Inclusión Etaria',
    dimension: 'GO',
    category: 'Participation Equity',
    definition: 'Medidas para asegurar la representación activa y la toma de opinión de jóvenes y ancianos en las decisiones estratégicas de la comunidad energética.'
  },
  {
    term: 'Inclusión Vulnerabilidad',
    dimension: 'GO',
    category: 'Participation Equity',
    definition: 'Mecanismos específicos (subsidios de tarifa, asambleas de lectura fácil, inclusión social) diseñados para integrar activamente a hogares en situación de pobreza energética.'
  },
  {
    term: 'Canales Formales',
    dimension: 'GO',
    category: 'Transparency',
    definition: 'Medios de comunicación e información formales de la organización: asambleas generales grabadas, actas oficiales, cartas físicas dirigidas a los miembros.'
  },
  {
    term: 'Canales Informales',
    dimension: 'GO',
    category: 'Transparency',
    definition: 'Medios de comunicación ágiles e informales: grupos de mensajería (WhatsApp/Telegram), redes sociales, boletines o comunicación cara a cara.'
  },
  {
    term: 'Datos Abiertos',
    dimension: 'GO',
    category: 'Transparency',
    definition: 'Política que promueve que los datos de generación de energía, consumo agregado e informes financieros estén al alcance de todos los socios (respetando las leyes de protección de datos).'
  },
  {
    term: 'Capacitación',
    dimension: 'GO',
    category: 'Human Capacities',
    definition: 'Capacitación y educación continua de los miembros de la comunidad en habilidades técnicas (instalación, mantenimiento) y democrático-administrativas.'
  },
  {
    term: 'Profesional',
    dimension: 'GO',
    category: 'Human Capacities',
    definition: 'Nivel en el que la comunidad energética contrata especialistas o consultores profesionales externos frente a la dependencia exclusiva del trabajo voluntario de los socios.'
  },
  {
    term: 'Control Social',
    dimension: 'GO',
    category: 'Accountability Conflict Resolution',
    definition: 'Supervisión de control interno y auditoría social recíproca entre los miembros de la comunidad para verificar el cumplimiento de las normas colectivas acordadas.'
  },
  {
    term: 'Revocatoria',
    dimension: 'GO',
    category: 'Accountability Conflict Resolution',
    definition: 'Reglas y umbrales estatutarios claros que permiten a la asamblea de miembros remover a los directivos o miembros del comité directivo antes del fin de su mandato.'
  },
  {
    term: 'Mediación',
    dimension: 'GO',
    category: 'Accountability Conflict Resolution',
    definition: 'Mecanismos formales e informales de resolución de conflictos vecinales o discrepancias internas antes de recurrir a litigios judiciales estatales.'
  },
  {
    term: 'Planificación',
    dimension: 'GO',
    category: 'Lifecycle',
    definition: 'Etapa temprana de la comunidad energética donde se define la visión, se redactan los estatutos, se captan los primeros fondos y se constituye formalmente la organización.'
  },
  {
    term: 'Operación',
    dimension: 'GO',
    category: 'Lifecycle',
    definition: 'Etapa madura de gestión del día a día de la comunidad (mantenimiento técnico, cobro de cuotas, balances financieros), que suele delegarse a un comité administrador con reporte a asamblea.'
  },
  {
    term: 'Escalamiento',
    dimension: 'GO',
    category: 'Lifecycle',
    definition: 'El proceso de admitir nuevos socios, integrar nuevos nodos de generación o ampliar el alcance geográfico de la comunidad sin perder la gobernanza e implicación asamblearia.'
  },

  // ==========================================
  // C. DIMENSIÓN REGULATORIA Y FINANCIERA (RF)
  // ==========================================
  {
    term: 'Marco Legal',
    dimension: 'RF',
    category: 'Enabling Legal Framework',
    definition: 'Marco legal que reconoce de forma explícita las comunidades de energía, habilita el autoconsumo colectivo y facilita la comercialización regulada de excedentes.'
  },
  {
    term: 'Autoconsumo Col.',
    dimension: 'RF',
    category: 'Enabling Legal Framework',
    definition: 'Derecho y habilitación reglamentaria que faculta a un grupo de consumidores a producir su propia energía de forma conjunta e intercambiarla bajo esquemas de cercanía.'
  },
  {
    term: 'Venta Excedentes',
    dimension: 'RF',
    category: 'Enabling Legal Framework',
    definition: 'El derecho de las comunidades energéticas a comercializar o vender su excedente de electricidad a terceros, a comercializadoras o directamente a la red del mercado mayorista.'
  },
  {
    term: 'Armonía Regional',
    dimension: 'RF',
    category: 'Enabling Legal Framework',
    definition: 'Alineación de normas y regulaciones entre diferentes países de Iberoamérica para compartir mejores prácticas regulatorias y reducir barreras de adopción regional.'
  },
  {
    term: 'Crowdfunding',
    dimension: 'RF',
    category: 'Financing',
    definition: 'Mecanismo de financiamiento colectivo a través de aportes económicos de ciudadanos independientes, generalmente instrumentado mediante plataformas de internet.'
  },
  {
    term: 'Bonos Verdes',
    dimension: 'RF',
    category: 'Financing',
    definition: 'Instrumentos de deuda y bonos financieros emitidos por la comunidad o intermediarios financieros cuyos fondos se destinan exclusivamente a proyectos de energía renovable.'
  },
  {
    term: 'Subsidios',
    dimension: 'RF',
    category: 'Financing',
    definition: 'Aportaciones y financiamiento público no reembolsable destinado a sufragar inversiones de capital inicial, consultorías técnicas o abaratamiento de tasas de crédito.'
  },
  {
    term: 'Inversión Privada',
    dimension: 'RF',
    category: 'Financing',
    definition: 'Fondos de inversión privados que buscan, además de una rentabilidad financiera competitiva, impactos ambientales y sociales medibles en las comunidades locales.'
  },
  {
    term: 'Net Billing',
    dimension: 'RF',
    category: 'DSO Relationship',
    definition: 'Esquemas de compensación por inyección de excedentes energéticos a la red general. Net metering compensa kilovatios físicos (1:1), mientras net billing valoriza económicamente los excedentes.'
  },
  {
    term: 'Mercados Flex.',
    dimension: 'RF',
    category: 'DSO Relationship',
    definition: 'Participación en mercados para brindar servicios de soporte local a la red del Operador del Sistema (DSO) como gestión activa de demanda, regulación de tensión o frecuencia.'
  },
  {
    term: 'Resolución Conflictos',
    dimension: 'RF',
    category: 'DSO Relationship',
    definition: 'Canales normativos y administrativos establecidos para resolver desacuerdos técnicos o comerciales entre la comunidad energética y el operador de red de distribución (DSO).'
  },
  {
    term: 'Inestabilidad Reg.',
    dimension: 'RF',
    category: 'Regulatory Stability Predictability',
    definition: 'Métrica que evalúa la frecuencia de modificación del marco de leyes y decretos sobre autoconsumo; tasas altas de cambio aumentan el riesgo e incertidumbre de inversión.'
  },
  {
    term: 'Diálogo Público',
    dimension: 'RF',
    category: 'Regulatory Stability Predictability',
    definition: 'Canales institucionales y mesas de trabajo entre autoridades regulatorias del gobierno y representantes de comunidades de energía para sugerir reformas de leyes.'
  },

  // ==========================================
  // D. DIMENSIÓN DE APROPIACIÓN SOCIAL Y JUSTICIA (AS)
  // ==========================================
  {
    term: 'Pobreza Energ.',
    dimension: 'AS',
    category: 'Distributive Justice',
    definition: 'Situación en la cual un hogar no puede cubrir sus necesidades energéticas mínimas debido a bajos ingresos, altas tarifas de energía o ineficiencia de vivienda.'
  },
  {
    term: 'Tarifas Sociales',
    dimension: 'AS',
    category: 'Distributive Justice',
    definition: 'Estructura interna de tarifas con descuentos para familias vulnerables dentro de la comunidad, financiada mediante esquemas solidarios de subsidio cruzado de los socios de mayores ingresos.'
  },
  {
    term: 'Reparto Excedentes',
    dimension: 'AS',
    category: 'Distributive Justice',
    definition: 'Políticas adoptadas por la asamblea para repartir los ingresos por excedentes: reparto igualitario entre socios, en proporción al consumo, o reinversión en necesidades sociales del barrio.'
  },
  {
    term: 'Co-diseño Tecnol.',
    dimension: 'AS',
    category: 'Procedural Justice',
    definition: 'Metodología de diseño e instalación conjunta de las instalaciones físicas donde la comunidad decide activamente qué fuentes renovables usar y dónde ubicarlas.'
  },
  {
    term: 'Voto Vinculante',
    dimension: 'AS',
    category: 'Procedural Justice',
    definition: 'Nivel avanzado de participación ciudadana donde las asambleas locales tienen el poder vinculante de redactar, reformar y votar el código reglamentario interno de la comunidad.'
  },
  {
    term: 'Derecho Veto',
    dimension: 'AS',
    category: 'Procedural Justice',
    definition: 'Poder estatutario de asambleas étnicas o de comités minoritarios vulnerables para bloquear decisiones generales que puedan perjudicar sus derechos o su bienestar colectivo.'
  },
  {
    term: 'Enfoque Étnico',
    dimension: 'AS',
    category: 'Recognition Justice',
    definition: 'Reconocimiento y respeto a las autoridades tradicionales, estructuras indígenas, afrodescendientes o colectivos tradicionales como gestores y administradores autónomos de la energía.'
  },
  {
    term: 'Derechos Territ.',
    dimension: 'AS',
    category: 'Recognition Justice',
    definition: 'Respeto de la comunidad energética al derecho a la consulta previa, libre e informada y al derecho territorial, especialmente en tierras ancestrales o resguardos.'
  },
  {
    term: 'Lengua y Comunic.',
    dimension: 'AS',
    category: 'Recognition Justice',
    definition: 'Uso de las lenguas nativas e indígenas, adaptaciones de lectura fácil para personas analfabetas o mayores, y uso de canales de comunicación culturalmente apropiados.'
  },
  {
    term: 'Reparación Histórica',
    dimension: 'AS',
    category: 'Restorative Justice',
    definition: 'Medidas destinadas a reparar pasivos ambientales y sociales ocasionados a la zona o etnia por el modelo energético centralizado tradicional de extracción fósil.'
  },
  {
    term: 'Reinversión Social',
    dimension: 'AS',
    category: 'Restorative Justice',
    definition: 'Decisión asamblearia de destinar una cuota de los dividendos a fondos comunitarios de salud, educación vecinal, infraestructura pública del barrio o cooperativas locales.'
  },
  {
    term: 'Alfabetización',
    dimension: 'AS',
    category: 'Community Agency & Empowerment',
    definition: 'Educación popular energética para capacitar a los vecinos en entender facturas de luz, comprender dinámicas de consumo y tomar decisiones informadas sobre ahorro.'
  },
  {
    term: 'Brecha Digital',
    dimension: 'AS',
    category: 'Community Agency & Empowerment',
    definition: 'Acciones de alfabetización digital y dotación de conectividad a internet para evitar la exclusión en el uso de los sistemas AMI y aplicaciones inteligentes de la comunidad.'
  },
  {
    term: 'Apropiación Digna',
    dimension: 'AS',
    category: 'Community Agency & Empowerment',
    definition: 'Capacidad de autonomía e independencia de la comunidad para inspeccionar, reparar, mantener y reconfigurar sus propios sistemas de generación sin depender de monopolios externos.'
  },
  {
    term: 'Empoderamiento',
    dimension: 'AS',
    category: 'Community Agency & Empowerment',
    definition: 'El nivel de empoderamiento colectivo para establecer prioridades propias, movilizar recursos técnicos locales y ser autogestores activos de su transición energética.'
  }
];
