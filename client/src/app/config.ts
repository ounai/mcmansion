export const width = '800px';
export const height = '480px';

export const defaultLocale = 'en-US';

export const ruuviTagUpdateIntervalMs = 1_000;

export const roomNames = [
  'Unknown Room', // Default

  'Living Room',
  'Bedroom',
  'Kitchen',
  'Dining Room',
  'Balcony',
  'Bathroom',
  'Sauna',
  'Outside'
];

export const transitApiUrl = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';
export const minTransitUpdateIntervalSeconds = 10;

// TODO: Implement in-app settings & customizer for transit
export const transitStopConfig = {
  bus: {
    east: ['HSL:2613275', 'HSL:2612219'],
    west: ['HSL:2613274', 'HSL:2612220']
  },
  train: {
    east: ['HSL:2612551'],
    west: ['HSL:2612501']
  },
};
