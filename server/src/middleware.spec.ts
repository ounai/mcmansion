import type { Request, Response } from 'express';

import { logging, notFound } from './middleware';

describe('logging middleware', () => {
  let request = {
    method: 'testMethod',
    originalUrl: 'urlBefore?urlAfter'
  } as Request;

  const response = {} as Response;
  const next = jest.fn();

  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation();
  });

  beforeEach(() => {
    request.query = undefined as unknown as Record<string, string>;
    request.body = undefined as unknown as Record<string, unknown>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log request info', () => {
    logging(request, response, next);

    expect(console.log).toHaveBeenCalledWith('Handling request testMethod urlBefore');
  });

  it('should log request query if not empty', () => {
    request.query = {
      key: 'value'
    };

    logging(request, response, next);

    expect(console.log).toHaveBeenNthCalledWith(2, ' with query:', request.query);
  });

  it('should not log request query if empty', () => {
    request.query = {};

    logging(request, response, next);

    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it('should not log request query if undefined', () => {
    logging(request, response, next);

    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it('should log request body if not empty', () => {
    request.body = {
      key: 'value'
    };

    logging(request, response, next);

    expect(console.log).toHaveBeenNthCalledWith(2, ' with body:', request.body);
  });

  it('should not log request body when empty', () => {
    request.body = {};

    logging(request, response, next);

    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it('should not log request body when undefined', () => {
    logging(request, response, next);

    expect(console.log).toHaveBeenCalledTimes(1);
  });

  it('should call next', () => {
    logging(request, response, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe('not found middleware', () => {
  let request = {
    method: 'testMethod',
    originalUrl: 'urlBefore?urlAfter'
  } as Request;

  const response = {} as unknown as Response;
  const next = jest.fn();

  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation();

    response.end = jest.fn();
    response.status = jest.fn(() => response);

    notFound(request, response, next);
  });

  it('should return not found response', () => {
    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.end).toHaveBeenCalledWith('Not Found');

    expect(next).not.toHaveBeenCalled();
  });

  it('should log', () => {
    expect(console.log).toHaveBeenCalledWith('Not Found: testMethod urlBefore');
  });
});
