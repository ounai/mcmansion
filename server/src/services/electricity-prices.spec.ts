import axios from 'axios';

import { query, type ElectricityPrices } from './electricity-prices';

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

describe('electricity price service', () => {
  describe('query', () => {
    it('should fetch and return data from external api', async () => {
      const data = Symbol('data') as unknown as ElectricityPrices;

      jest.spyOn(axios, 'get').mockImplementation(async url => url === apiUrl ? { data } : {});

      expect(await query()).toEqual(data);
    });
  });
});
