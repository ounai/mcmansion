import dotenv from 'dotenv';

dotenv.config();

const testingEnvironment = (process.env.NODE_ENV === 'test');

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

if (!testingEnvironment) {
  if (typeof config.db.host !== 'string') throw new Error('Environment variable POSTGRES_HOST missing!');
  if (typeof config.db.database !== 'string') throw new Error('Environment variable POSTGRES_DATABASE missing!');
  if (typeof config.db.username !== 'string') throw new Error('Environment variable POSTGRES_USERNAME missing!');
  if (typeof config.db.password !== 'string') throw new Error('Environment variable POSTGRES_PASSWORD missing!');
}

export type Config = typeof config;
