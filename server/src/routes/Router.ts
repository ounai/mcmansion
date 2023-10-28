import { Router as ExpressRouter, type RequestHandler } from 'express';

export default class Router {
  readonly name: string;
  readonly expressRouter: ExpressRouter;

  constructor (name: string) {
    this.name = name;
    this.expressRouter = ExpressRouter();
  }

  get (path: string, ...middleware: RequestHandler[]): void {
    this.expressRouter.get(path, ...middleware);
  }

  post (path: string, ...middleware: RequestHandler[]): void {
    this.expressRouter.post(path, ...middleware);
  }

  put (path: string, ...middleware: RequestHandler[]): void {
    this.expressRouter.put(path, ...middleware);
  }

  delete (path: string, ...middleware: RequestHandler[]): void {
    this.expressRouter.delete(path, ...middleware);
  }

  patch (path: string, ...middleware: RequestHandler[]): void {
    this.expressRouter.patch(path, ...middleware);
  }
}
