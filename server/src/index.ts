import dotenv from 'dotenv';

import { init } from './init';
import { config } from './config';

dotenv.config();
init(config);
