export const width = '800px';
export const height = '480px';

export const defaultLocale = 'en-US';
export const defaultLanguage = defaultLocale.slice(0, 2);

export const ruuviTagUpdateIntervalMs = 1_000;

export const rooms = [
  'unknownRoom', // Default

  'livingRoom',
  'bedroom',
  'kitchen',
  'diningRoom',
  'balcony',
  'bathroom',
  'sauna',
  'outside'
];

export const transitApiUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
export const minTransitUpdateIntervalSeconds = 10;

// TODO: Implement in-app settings & customizer for transit
export const transitStopConfig = {
  bus: {
    east: ['HSL:2613275', 'HSL:2612219'],
    west: ['HSL:2613274', 'HSL:2612220', 'HSL:2611206']
  },
  train: {
    east: ['HSL:2612551'],
    west: ['HSL:2612501']
  },
};
