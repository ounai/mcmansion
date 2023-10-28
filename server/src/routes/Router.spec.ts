import { Router } from '.';

describe('Router', () => {
  let instance: Router;

  const name = Symbol('name') as unknown as string;

  beforeAll(() => {
    instance = new Router(name);
  });

  describe('constructor', () => {
    it('should set name', () => {
      expect(instance.name).toEqual(name);
    });

    it('should set express router instance', () => {
      expect(instance.expressRouter).toBeDefined();
    });
  });
});
