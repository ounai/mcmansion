import { init } from './init';
import * as api from './api';

import type { Config } from './config';

describe('init', () => {
  const port = Symbol('port') as unknown as number;

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(api, 'init').mockImplementation();

    init({ api: { port } } as Config);
  });

  it('should log init message', () => {
    expect(console.log).toHaveBeenCalledWith('Initializing...');
  });

  it('should call API init', () => {
    expect(api.init).toHaveBeenCalledWith(port);
  });
});
