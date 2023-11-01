export * from './ElectricityPrices';

export interface ElectricityPrice {
  price: number
  startDate: string
  endDate: string
}

export interface ElectricityPrices {
  prices: ElectricityPrice[]
}
