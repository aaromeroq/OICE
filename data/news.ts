export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  source: string;
  country?: string;
  link: string;
}

export const newsData: NewsItem[] = [
  {
    id: 'n-esp-cer-boom',
    title: 'España supera las 1.200 comunidades energeticas registradas en 2025',
    summary: 'El IDAE confirma un crecimiento del 40% interanual en la creacion de Comunidades Energeticas Renovables (CER) en España, impulsadas por fondos Next Generation y la transposicion de RED II.',
    date: '2025-11-15',
    source: 'IDAE',
    country: 'España',
    link: '#',
  },
  {
    id: 'n-col-decreto',
    title: 'Colombia reglamenta las comunidades energeticas con nuevas resoluciones CREG',
    summary: 'La CREG publica la resolucion complementaria al Decreto 2236/2023 que define las tarifas y mecanismos de compensacion para la Autogeneracion Colectiva y Generacion Distribuida Colectiva.',
    date: '2025-10-22',
    source: 'MinMinas Colombia',
    country: 'Colombia',
    link: '#',
  },
  {
    id: 'n-bra-cooperativas',
    title: 'Brasil alcanza 2 GW en generacion distribuida cooperativa bajo la Ley 14.300',
    summary: 'El sistema de creditos energeticos impulsa la creacion de consorcios solares comunitarios, especialmente en Minas Gerais, Bahia y Rio Grande do Sul.',
    date: '2025-09-30',
    source: 'ANEEL',
    country: 'Brasil',
    link: '#',
  },
  {
    id: 'n-chi-netbilling',
    title: 'Chile amplia el Net Billing a 500 kW y habilita comunidades energeticas rurales',
    summary: 'Reforma a la Ley 21.118 que eleva el limite de generacion distribuida y crea la figura juridica de comunidad energetica rural con beneficios tributarios para zonas aisladas.',
    date: '2025-09-12',
    source: 'AgenciaSE Chile',
    country: 'Chile',
    link: '#',
  },
  {
    id: 'n-ripcel-encuentro',
    title: 'RIPCEL celebra su III Encuentro Iberoamericano en Bogota',
    summary: 'Investigadores de 15 paises se reunen en la Universidad Nacional de Colombia para presentar avances en el diagnostico comparado de comunidades energeticas y el marco taxonomico 4D.',
    date: '2025-08-20',
    source: 'Red RIPCEL',
    link: '#',
  },
  {
    id: 'n-arg-mendoza',
    title: 'Mendoza inaugura el primer Parque Energetico Distribuido comunitario de Argentina',
    summary: 'Con 2.5 MW de capacidad solar y gobernanza cooperativa, el proyecto PED Mendoza se convierte en referente para la generacion distribuida virtual comunitaria bajo ley provincial.',
    date: '2025-07-18',
    source: 'Gobierno de Mendoza',
    country: 'Argentina',
    link: '#',
  },
  {
    id: 'n-eu-rediii',
    title: 'La UE avanza hacia la Directiva RED III con metas reforzadas para comunidades energeticas',
    summary: 'El Parlamento Europeo aprueba enmiendas que exigen a los Estados miembros remover barreras administrativas y garantizar acceso a la red para CER y CCE antes de 2027.',
    date: '2025-07-05',
    source: 'Parlamento Europeo',
    link: '#',
  },
  {
    id: 'n-mex-onergia',
    title: 'Onergia expande su modelo cooperativo solar a 5 estados de Mexico',
    summary: 'La cooperativa energetica Onergia, operando bajo la figura de Generacion Exenta, alcanza 1.500 socios y planea replicar su modelo en Oaxaca, Puebla y Veracruz.',
    date: '2025-06-28',
    source: 'Red Girasol',
    country: 'Mexico',
    link: '#',
  },
  {
    id: 'n-prt-coopernico',
    title: 'Coopernico lidera la primera CER transfronteriza ibérica entre Portugal y España',
    summary: 'Proyecto piloto de comunidad energetica transfronteriza en la region del Alentejo-Extremadura, con participacion de 200 socios de ambos paises bajo la Directiva RED II.',
    date: '2025-06-10',
    source: 'Coopernico',
    country: 'Portugal',
    link: '#',
  },
  {
    id: 'n-cri-coopeguanacaste',
    title: 'CoopeGuanacaste publica su informe GRI 2025 de sostenibilidad',
    summary: 'La cooperativa de electrificacion rural mas avanzada de Centroamerica reporta 98% de cobertura, 45% de generacion renovable propia y nuevos programas de eficiencia energetica comunitaria.',
    date: '2025-05-22',
    source: 'CoopeGuanacaste',
    country: 'Costa Rica',
    link: '#',
  },
];
