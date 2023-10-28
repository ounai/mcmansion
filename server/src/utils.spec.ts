import fs from 'fs';

import { getFilenamesInDirectory } from './utils';

describe('getFileNamesInDirectory', () => {
  beforeAll(() => {
    const mockReaddirSync = (d: string) => d === '/test-dir'
      ? ['test.ext', 'another.test.file.ext', 'extext.ext', 'ext.test', 'ext']
      : [];

    jest.spyOn(fs, 'readdirSync').mockImplementation(mockReaddirSync as typeof fs.readdirSync);
  });

  it('should return names of all files when given no extension', () => {
    expect(getFilenamesInDirectory('/test-dir')).toEqual([
      'test.ext',
      'another.test.file.ext',
      'extext.ext',
      'ext.test',
      'ext'
    ]);
  });

  it('should return only files with given extension', () => {
    expect(getFilenamesInDirectory('/test-dir', 'ext')).toEqual([
      'test.ext',
      'another.test.file.ext',
      'extext.ext'
    ]);
  });

  it('should return empty when no files', () => {
    expect(getFilenamesInDirectory('/other-dir').length).toEqual(0);
    expect(getFilenamesInDirectory('/other-dir', 'ext').length).toEqual(0);
  });
});
