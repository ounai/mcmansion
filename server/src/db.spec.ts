import * as sequelize from 'sequelize-typescript';

import { init } from './db';
import type { Config } from './config';

jest.mock('sequelize-typescript', () => ({
  Sequelize: jest.fn()
}));

describe('init', () => {
  const config = {
    host: Symbol('host'),
    database: Symbol('database'),
    username: Symbol('username'),
    password: Symbol('password'),
    alter: Symbol('alter'),
    logging: Symbol('logging')
  } as unknown as Config['db'];

  const sync = jest.fn();

  beforeAll(() => {
    jest.spyOn(sequelize, 'Sequelize').mockImplementation(() => ({ sync }) as any);

    init(config);
  });

  it('should initialize Sequelize instance', () => {
    expect(sequelize.Sequelize).toHaveBeenCalledWith({
      host: config.host,
      database: config.database,
      username: config.username,
      password: config.password,
      logging: config.logging,
      dialect: 'postgres',
      models: expect.any(Array),
      modelMatch: expect.any(Function)
    });
  });

  it('should sync database', () => {
    expect(sync).toHaveBeenCalledWith({ alter: config.alter });
  });
});
