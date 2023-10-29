import initRuuviDB from 'ruuvitag-database';

import { init } from './init';
import * as api from './api';
import * as db from './db';

import type { Config } from './config';

jest.mock('ruuvitag-database', () => jest.fn());

describe('init', () => {
  const port = Symbol('port') as unknown as number;
  const dbConfig = Symbol('db config') as unknown as Config['db'];

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(api, 'init').mockImplementation();
    jest.spyOn(db, 'init').mockImplementation();

    init({
      api: { port },
      db: dbConfig
    } as Config);
  });

  it('should log init message', () => {
    expect(console.log).toHaveBeenCalledWith('Initializing...');
  });

  it('should call API init', () => {
    expect(api.init).toHaveBeenCalledWith(port);
  });

  it('should call DB init', () => {
    expect(db.init).toHaveBeenCalledWith(dbConfig);
  });

  it('should call ruuvitag-database init', () => {
    expect(initRuuviDB).toHaveBeenCalledWith({ ...dbConfig, dialect: 'postgres' });
  });
});
