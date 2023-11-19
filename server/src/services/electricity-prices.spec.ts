import axios from 'axios';

import { query, type ElectricityPricesResponse } from './electricity-prices';
import { ElectricityPrice } from '../models';

const apiUrl = Symbol('api url') as unknown as string;

jest.mock('../config', () => ({
  get config() {
    return {
      electricityPrices: {
        apiUrl
      }
    };
  }
}));

jest.mock('../models/electricity-price', () => ({
  bulkCreate: jest.fn()
}));

describe('electricity price service', () => {
  describe('query', () => {
    const data = { prices: Symbol('prices') } as unknown as ElectricityPricesResponse;
    const dbData = Symbol('dbData') as unknown as ElectricityPrice[];

    beforeEach(() => {
      jest.spyOn(axios, 'get').mockImplementation(async url => url === apiUrl ? { data } : {});
      jest.spyOn(ElectricityPrice, 'bulkCreate').mockImplementation(async () => dbData);
    });

    it('should fetch data from external api', async () => {
      await query();

      expect(axios.get).toHaveBeenCalledWith(apiUrl);
    });

    it('should bulk save prices to db and return them', async () => {
      expect(await query()).toEqual(dbData);

      expect(ElectricityPrice.bulkCreate).toHaveBeenCalledWith(data.prices, {
        fields: ['startDate', 'endDate', 'price'],
        updateOnDuplicate: ['startDate']
      });
    });
  });
});
