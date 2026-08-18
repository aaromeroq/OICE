export interface GlossaryEntry {
  term: string;
  category: 'Generation Hardware' | 'Storage' | 'Grid Context' | 'Management Software' | 'Emerging Tech' | 'Cybersecurity';
  definition: string;
}

export const glossaryData: GlossaryEntry[] = [
  // Generation Hardware
  {
    term: 'Solar PV',
    category: 'Generation Hardware',
    definition: 'Paneles fotovoltaicos que convierten la luz solar directamente en electricidad; la tecnología de generación más común en las comunidades energéticas (89% de los casos en la región).'
  },
  {
    term: 'Wind',
    category: 'Generation Hardware',
    definition: 'Aerogeneradores de pequeña escala utilizados para la generación eléctrica local, a menudo complementarios a la tecnología solar fotovoltaica.'
  },
  {
    term: 'Biomass',
    category: 'Generation Hardware',
    definition: 'Materiales orgánicos (residuos agrícolas, madera, etc.) utilizados para la generación de calor o electricidad en comunidades energéticas rurales.'
  },
  {
    term: 'Small Hydro',
    category: 'Generation Hardware',
    definition: 'Centrales minihidráulicas o microhidráulicas (típicamente &lt;10 MW) que aprovechan las corrientes de agua locales sin necesidad de grandes embalses.'
  },
  // Storage
  {
    term: 'Green H2',
    category: 'Storage',
    definition: 'Hidrógeno producido a partir de electricidad renovable mediante electrólisis; utilizado para almacenamiento a largo plazo o sectores difíciles de electrificar.'
  },
  {
    term: 'Batteries',
    category: 'Storage',
    definition: 'Dispositivos de almacenamiento electroquímico (iones de litio, plomo-ácido, etc.) que proporcionan flexibilidad a corto y mediano plazo.'
  },
  {
    term: 'Thermal storage',
    category: 'Storage',
    definition: 'Sistemas que almacenan calor (ej. sales fundidas, agua caliente) para su uso posterior en calefacción o generación de energía.'
  },
  {
    term: 'Hydrogen storage',
    category: 'Storage',
    definition: 'Almacenamiento de energía química en forma de gas hidrógeno, adecuado para respaldo estacional o de varios días.'
  },
  // Grid Context
  {
    term: 'Microgrid',
    category: 'Grid Context',
    definition: 'Una red local autocontrolada que puede funcionar conectada a la red principal o en modo de isla energética.'
  },
  {
    term: 'Urban grid context',
    category: 'Grid Context',
    definition: 'Comunidades energéticas ubicadas en ciudades, típicamente conectadas a una red de distribución eléctrica fuerte y mallada.'
  },
  {
    term: 'Rural grid context',
    category: 'Grid Context',
    definition: 'Comunidades energéticas en áreas de baja densidad de población, a menudo con conexiones de red débiles, poco confiables o aisladas.'
  },
  {
    term: 'Island grid context',
    category: 'Grid Context',
    definition: 'Sistemas eléctricos aislados (geográfica o técnicamente) que requieren altos niveles de autosuficiencia y control de frecuencia/voltaje.'
  },
  // Management Software
  {
    term: 'EMS basic',
    category: 'Management Software',
    definition: 'Sistema de Gestión de Energía (EMS) con funciones básicas de monitoreo de flujos, adquisición de datos y visualización de consumos.'
  },
  {
    term: 'AI optimised',
    category: 'Management Software',
    definition: 'Sistemas avanzados de gestión de energía que utilizan algoritmos de inteligencia artificial para control predictivo, estimación de demanda y optimización horaria.'
  },
  // Emerging Tech
  {
    term: 'Digital twins',
    category: 'Emerging Tech',
    definition: 'Réplicas virtuales digitales de sistemas energéticos físicos reales, utilizadas para simulaciones de fallas, pruebas de control y entrenamiento.'
  },
  {
    term: 'Blockchain',
    category: 'Emerging Tech',
    definition: 'Tecnología de registro distribuido descentralizado que habilita transacciones directas de energía peer-to-peer (P2P) y contratos inteligentes (smart contracts).'
  },
  {
    term: 'VPP / V2G',
    category: 'Emerging Tech',
    definition: 'Planta de Energía Virtual (VPP - agregación digital de recursos distribuidos) y Vehículo a la Red (V2G - inyección bidireccional desde baterías de autos eléctricos).'
  },
  // Cybersecurity
  {
    term: 'Encryption',
    category: 'Cybersecurity',
    definition: 'Protección criptográfica de las comunicaciones digitales de control y datos telemétricos dentro de la red inteligente de la comunidad.'
  },
  {
    term: 'Access controls',
    category: 'Cybersecurity',
    definition: 'Políticas y mecanismos de seguridad de red que restringen qué usuarios o dispositivos externos pueden ver o modificar parámetros críticos.'
  },
  {
    term: 'Cybersecurity',
    category: 'Cybersecurity',
    definition: 'Protección global de la infraestructura de hardware y software de la comunidad frente a hackeos, malware e intrusiones no autorizadas.'
  }
];
