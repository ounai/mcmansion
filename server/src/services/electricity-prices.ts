import axios from 'axios';

import { config } from '../config';

import { ElectricityPrice } from '../models';

export interface ElectricityPricesResponse {
  prices: Array<{
    price: number
    startDate: string
    endDate: string
  }>
}

export const query = async (): Promise<ElectricityPrice[]> => {
  const { data } = await axios.get<ElectricityPricesResponse>(config.electricityPrices.apiUrl);

  const dbPrices = await ElectricityPrice.bulkCreate(data.prices, {
    fields: ['startDate', 'endDate', 'price'],
    updateOnDuplicate: ['startDate']
  });

  return dbPrices;
};
