import type { RequestHandler } from 'express';

export const logging: RequestHandler = (req, res, next) => {
  console.log(`Handling request ${req.method} ${req.originalUrl.split('?')[0]}`);

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (req.query && Object.keys(req.query).length > 0) {
    console.log(' with query:', req.query);
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (req.body && Object.keys(req.body as Record<string, unknown>).length > 0) {
    console.log(' with body:', req.body);
  }

  next();
};

export const notFound: RequestHandler = (req, res, next) => {
  console.log(`Not Found: ${req.method} ${req.originalUrl.split('?')[0]}`);

  res.status(404).end('Not Found');
};
