export interface IberoCountry {
  name: string;
  code: string;
  center: [number, number]; // [lat, lng]
  zoom: number;
  region: 'Iberia' | 'Mexico y Centroamerica' | 'Caribe' | 'Sudamerica';
}

export const iberoamericanCountries: IberoCountry[] = [
  // Iberia
  { name: 'España', code: 'ESP', center: [40.0, -3.7], zoom: 6, region: 'Iberia' },
  { name: 'Portugal', code: 'PRT', center: [39.5, -8.0], zoom: 7, region: 'Iberia' },

  // Mexico y Centroamerica
  { name: 'Mexico', code: 'MEX', center: [23.6, -102.5], zoom: 5, region: 'Mexico y Centroamerica' },
  { name: 'Costa Rica', code: 'CRI', center: [10.0, -84.0], zoom: 8, region: 'Mexico y Centroamerica' },
  { name: 'Honduras', code: 'HND', center: [14.6, -87.5], zoom: 7, region: 'Mexico y Centroamerica' },
  { name: 'Guatemala', code: 'GTM', center: [15.5, -90.3], zoom: 7, region: 'Mexico y Centroamerica' },
  { name: 'El Salvador', code: 'SLV', center: [13.8, -88.9], zoom: 9, region: 'Mexico y Centroamerica' },
  { name: 'Panama', code: 'PAN', center: [8.5, -80.0], zoom: 8, region: 'Mexico y Centroamerica' },
  { name: 'Nicaragua', code: 'NIC', center: [12.9, -85.2], zoom: 7, region: 'Mexico y Centroamerica' },

  // Caribe
  { name: 'Cuba', code: 'CUB', center: [21.5, -79.9], zoom: 7, region: 'Caribe' },
  { name: 'Republica Dominicana', code: 'DOM', center: [18.7, -70.2], zoom: 8, region: 'Caribe' },

  // Sudamerica
  { name: 'Colombia', code: 'COL', center: [4.5, -74.0], zoom: 6, region: 'Sudamerica' },
  { name: 'Brasil', code: 'BRA', center: [-14.2, -51.9], zoom: 4, region: 'Sudamerica' },
  { name: 'Argentina', code: 'ARG', center: [-38.4, -63.6], zoom: 5, region: 'Sudamerica' },
  { name: 'Chile', code: 'CHL', center: [-35.7, -71.5], zoom: 5, region: 'Sudamerica' },
  { name: 'Peru', code: 'PER', center: [-9.2, -75.0], zoom: 6, region: 'Sudamerica' },
  { name: 'Ecuador', code: 'ECU', center: [-1.8, -78.2], zoom: 7, region: 'Sudamerica' },
  { name: 'Bolivia', code: 'BOL', center: [-16.3, -63.6], zoom: 6, region: 'Sudamerica' },
  { name: 'Paraguay', code: 'PRY', center: [-23.4, -58.4], zoom: 7, region: 'Sudamerica' },
  { name: 'Uruguay', code: 'URY', center: [-32.5, -55.8], zoom: 7, region: 'Sudamerica' },
  { name: 'Venezuela', code: 'VEN', center: [6.4, -66.6], zoom: 6, region: 'Sudamerica' },
];

// Map Natural Earth English names → our Spanish names
const nameAliases: Record<string, string> = {
  'spain': 'España',
  'brazil': 'Brasil',
  'dominican rep.': 'Republica Dominicana',
  'dominican republic': 'Republica Dominicana',
};

export const getCountryByName = (name: string): IberoCountry | undefined => {
  const lower = name.toLowerCase();
  // Check alias first (English → Spanish)
  const resolved = nameAliases[lower];
  if (resolved) {
    return iberoamericanCountries.find(c => c.name === resolved);
  }
  return iberoamericanCountries.find(c =>
    c.name.toLowerCase() === lower ||
    lower.includes(c.name.toLowerCase()) ||
    c.name.toLowerCase().includes(lower)
  );
};
