import express from 'express';
import http from 'http';

import { v1 as routes } from './routes';

import {
  logging as loggingMiddleware,
  notFound as notFoundMiddleware
} from './middleware';

export const app = express();

export const init = (port: number): void => {
  console.log('Initializing API...');

  // Static files
  app.use(express.static('public'));

  // Body parsing
  app.use(express.json());
  app.use(express.urlencoded());

  // Log requests
  app.use('/api', loggingMiddleware);

  for (const route of Object.values(routes)) {
    console.log('Creating route', `/api/v1/${route.name}`);

    app.use(`/api/v1/${route.name}`, route.expressRouter);
  }

  // 404
  app.use('/api', notFoundMiddleware);

  http.createServer(app).listen(port, () => {
    console.log('Listening for HTTP on', port);
  });
};
