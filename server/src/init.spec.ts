import { init } from './init';

describe('init', () => {
  it('should log init message', () => {
    jest.spyOn(console, 'log').mockImplementation();

    init();

    expect(console.log).toHaveBeenCalledWith('Initializing...');
  });
});
