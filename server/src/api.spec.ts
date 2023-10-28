import http from 'http';
import express, { type RequestHandler } from 'express';

import { app, init as initAPI } from './api';

import {
  logging as loggingMiddleware,
  notFound as notFoundMiddleware
} from './middleware';

describe('init', () => {
  const port = Symbol('port') as unknown as number;

  const staticResult = Symbol('static') as unknown as RequestHandler;
  const jsonResult = Symbol('json') as unknown as RequestHandler;
  const urlencodedResult = Symbol('urlencoded') as unknown as RequestHandler;

  const serverMock = { listen: jest.fn() };

  beforeAll(async () => {
    const staticMock = (s: string) => s === 'public' ? staticResult : null;

    const getFilenamesMock = (path: string, ext?: string): string[] =>
      (path === './src/routes/v1' && ext === 'js')
        ? ['first-route.js', 'second-route.js']
        : [];

    jest.spyOn(app, 'use').mockImplementation();
    jest.spyOn(http, 'createServer').mockImplementation((() => serverMock) as unknown as typeof http.createServer);

    jest.spyOn(express, 'static').mockImplementation(staticMock as typeof express.static);
    jest.spyOn(express, 'json').mockImplementation((() => jsonResult) as typeof express.json);
    jest.spyOn(express, 'urlencoded').mockImplementation((() => urlencodedResult) as typeof express.urlencoded);

    await initAPI(port);
  });

  describe('middleware', () => {
    it('should serve static files from public/', () => {
      expect(app.use).toHaveBeenNthCalledWith(1, staticResult);
    });

    it('should use express.json middleware', () => {
      expect(app.use).toHaveBeenNthCalledWith(2, jsonResult);
    });

    it('should use express.urlencoded middleware', () => {
      expect(app.use).toHaveBeenNthCalledWith(3, urlencodedResult);
    });

    it('should use logging middleware', () => {
      expect(app.use).toHaveBeenNthCalledWith(4, '/api', loggingMiddleware);
    });

    it('should use not found middleware last', () => {
      expect((app.use as unknown as jest.SpyInstance).mock.calls.at(-1)).toEqual(['/api', notFoundMiddleware]);
    });
  });

  it('should create and listen to HTTP server', () => {
    expect(http.createServer).toHaveBeenCalledTimes(1);
    expect(http.createServer).toHaveBeenCalledWith(app);

    expect(serverMock.listen).toHaveBeenCalledTimes(1);
    expect(serverMock.listen).toHaveBeenCalledWith(port, expect.any(Function));
  });
});
