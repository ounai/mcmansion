import initRuuviDB from 'ruuvitag-database';

import { init } from './init';
import * as api from './api';
import * as db from './db';

import type { Config } from './config';

jest.mock('ruuvitag-database', () => jest.fn());

describe('init', () => {
  const port = Symbol('port') as unknown as number;
  const dbConfig = Symbol('db config') as unknown as Config['db'];

  const config = {
    api: { port },
    db: dbConfig
  } as Config;

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(api, 'init').mockImplementation();
    jest.spyOn(db, 'init').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log init message', async () => {
    await init(config);

    expect(console.log).toHaveBeenCalledWith('Initializing...');
  });

  it('should call API init', async () => {
    await init(config);

    expect(api.init).toHaveBeenCalledWith(port);
  });

  it('should call DB init', async () => {
    await init(config);

    expect(db.init).toHaveBeenCalledWith(dbConfig);
  });

  it('should call ruuvitag-database init', async () => {
    await init(config);

    expect(initRuuviDB).toHaveBeenCalledWith({ ...dbConfig, dialect: 'postgres' });
  });

  it('should not call ruuvitag-database init if disabled', async () => {
    await init({ ...config, ruuviTagDatabaseDisabled: true });

    expect(initRuuviDB).not.toHaveBeenCalled();
  });
});
