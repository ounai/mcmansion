import dotenv from 'dotenv';

dotenv.config();

export const config = {
  api: {
    port: 51472
  },
  db: {
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    alter: process.env.POSTGRES_ALTER?.toLowerCase() === 'true',
    logging: false
  },
  electricityPrices: {
    apiUrl: 'https://api.porssisahko.net/v1/latest-prices.json'
  }
};

export type Config = typeof config;
