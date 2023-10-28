import { init as initAPI } from './api';

import type { Config } from './config';

export const init = (config: Config): void => {
  console.log('Initializing...');

  initAPI(config.api.port);
};
