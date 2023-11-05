export * from './Transit';
export * from './TransitSettings';

export interface DigitransitSubscriptionKeyResponse {
  digitransitSubscriptionKey: string
}

export interface Route {
  shortName: string
  longName: string
}

export interface Trip {
  route: Route
}

export interface StoptimeWithoutPattern {
  headsign: string
  realtime: boolean
  realtimeDeparture?: number
  realtimeState: string
  scheduledDeparture: number
  serviceDay: number
  trip: Trip
}

export interface DepartureData {
  name: string
  stoptimesWithoutPatterns: StoptimeWithoutPattern[]
}

export type DeparturesData = Record<string, DepartureData>;
