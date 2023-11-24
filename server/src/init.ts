import initRuuviDB from 'ruuvitag-database';

import { init as initAPI } from './api';
import { init as initDB } from './db';

import type { Config } from './config';

export const init = async (config: Config): Promise<void> => {
  console.log('Initializing...');

  initAPI(config.api.port);
  await initDB(config.db);

  if (!config.ruuviTagDatabaseDisabled) {
    await initRuuviDB({ ...config.db, dialect: 'postgres' });
  } else {
    console.log('RuuviTag database is disabled');
  }
};
