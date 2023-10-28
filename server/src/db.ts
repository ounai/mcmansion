import { Sequelize } from 'sequelize-typescript';
import path from 'path';

import type { Config } from './config';

export const init = async (config: Config['db']): Promise<void> => {
  const { alter, ...initConfig } = config;

  const sequelize = new Sequelize({
    ...initConfig,
    dialect: 'postgres',
    models: [path.join(__dirname, 'models')],
    modelMatch: (filename: string): boolean => !filename.startsWith('index.')
  });

  await sequelize.sync({ alter });
};
