export interface LegislationItem {
  id: string;
  country: string;
  title: string;
  type: 'Ley' | 'Decreto' | 'Resolucion';
  year: number;
  summary: string;
  link: string;
}

export const legislationData: LegislationItem[] = [
  {
    id: 'l-esp-rdl23',
    country: 'España',
    title: 'RDL 23/2020 — Comunidades de Energias Renovables',
    type: 'Decreto',
    year: 2020,
    summary: 'Transpone parcialmente la Directiva RED II de la UE, definiendo las figuras de Comunidad de Energias Renovables (CER) y Comunidad Ciudadana de Energia (CCE) en el marco español.',
    link: '#'
  },
  {
    id: 'l-esp-rd244',
    country: 'España',
    title: 'Real Decreto 244/2019 — Autoconsumo de Energia Electrica',
    type: 'Decreto',
    year: 2019,
    summary: 'Regula las condiciones de autoconsumo de energia electrica, figura clave para las Comunidades Energeticas Locales. Habilita el autoconsumo colectivo con compensacion de excedentes.',
    link: '#'
  },
  {
    id: 'l-col-dec2236',
    country: 'Colombia',
    title: 'Decreto 2236 de 2023 — Comunidades Energeticas',
    type: 'Decreto',
    year: 2023,
    summary: 'Define comunidades energeticas como organizaciones donde los usuarios pueden generar, comercializar y usar eficientemente energia mediante FNCER. Establece Autogeneracion Colectiva y Generacion Distribuida Colectiva (hasta 5 MW).',
    link: '#'
  },
  {
    id: 'l-col-creg174',
    country: 'Colombia',
    title: 'Resolucion CREG 174 — Autogeneracion a Pequeña Escala',
    type: 'Resolucion',
    year: 2021,
    summary: 'Regula la autogeneracion a pequeña escala (AGPE) y la generacion distribuida (GD), abriendo la puerta a las comunidades energeticas en Colombia.',
    link: '#'
  },
  {
    id: 'l-chi-ley21118',
    country: 'Chile',
    title: 'Ley 21.118 — Generacion Distribuida',
    type: 'Ley',
    year: 2018,
    summary: 'Establece el marco para la generacion distribuida (Net Billing) y habilita esquemas de propiedad conjunta de plantas de generacion renovable a pequeña escala.',
    link: '#'
  },
  {
    id: 'l-bra-ley14300',
    country: 'Brasil',
    title: 'Ley 14.300/2022 — Micro y Minigeneracion Distribuida',
    type: 'Ley',
    year: 2022,
    summary: 'Instituye el marco legal de la micro y minigeneracion distribuida. Permite generacion compartida mediante consorcios, cooperativas o condominios de hasta 5 MW con sistema de creditos energeticos a 60 meses.',
    link: '#'
  },
  {
    id: 'l-bra-aneel482',
    country: 'Brasil',
    title: 'Resolucion ANEEL 482/2012 — Net Metering',
    type: 'Resolucion',
    year: 2012,
    summary: 'Resolucion original que introdujo el net metering en Brasil para micro y minigeneracion distribuida. Base regulatoria precursora de la Ley 14.300.',
    link: '#'
  },
  {
    id: 'l-arg-ley27191',
    country: 'Argentina',
    title: 'Ley 27.191 — Regimen de Fomento de Energias Renovables',
    type: 'Ley',
    year: 2015,
    summary: 'Establece el objetivo del 20% de generacion renovable para 2025. Las leyes provinciales complementan con esquemas de net metering y generacion distribuida virtual comunitaria (hasta 12 MW).',
    link: '#'
  },
  {
    id: 'l-mex-genexenta',
    country: 'Mexico',
    title: 'Ley de la Industria Electrica — Generacion Exenta',
    type: 'Ley',
    year: 2014,
    summary: 'Permite la figura de "Generacion Exenta" (< 500 kW) sin requerir permiso de CRE. Base legal para cooperativas energeticas como Onergia y Red Girasol en un sistema centralizado.',
    link: '#'
  },
  {
    id: 'l-cri-aresep',
    country: 'Costa Rica',
    title: 'Marco Regulatorio ARESEP — Cooperativas de Electrificacion Rural',
    type: 'Ley',
    year: 1965,
    summary: 'Marco regulatorio robusto y garantista para cooperativas de electrificacion rural como CoopeGuanacaste. Opera bajo exclusividad del sistema costarricense regulado por ARESEP.',
    link: '#'
  },
  {
    id: 'l-eu-redii',
    country: 'Portugal',
    title: 'Transposicion RED II — Comunidades de Energia Renovable',
    type: 'Decreto',
    year: 2022,
    summary: 'Portugal esta en proceso de completar la transposicion de la Directiva RED II para habilitar las figuras de CER. Coopernico lidera el impulso regulatorio desde la sociedad civil.',
    link: '#'
  },
];
