export const config = {
  api: {
    port: 51472
  },
  electricityPrices: {
    apiUrl: 'https://api.porssisahko.net/v1/latest-prices.json'
  }
};

export type Config = typeof config;
