import axios from 'axios';

import { config } from '../config';

export interface ElectricityPrice {
  price: number
  startDate: string
  endDate: string
}

export interface ElectricityPrices {
  prices: ElectricityPrice[]
}

export const query = async (): Promise<ElectricityPrices> => {
  const { data } = await axios.get<ElectricityPrices>(config.electricityPrices.apiUrl);

  return data;
};
