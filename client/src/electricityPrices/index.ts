export * from './ElectricityPrices';

export interface ElectricityPriceData {
  price: number
  startDate: string
  endDate: string
}

export interface ElectricityPricesData {
  prices: ElectricityPriceData[]
}
