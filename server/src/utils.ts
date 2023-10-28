import fs from 'fs';

export const getFilenamesInDirectory = (directory: string, extension?: string): string[] =>
  fs.readdirSync(directory)
    .filter(filename => extension === undefined || filename.endsWith(`.${extension}`));
