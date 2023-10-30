import useAPI from './useAPI';
import useGet from './useGet';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface Options<Body> {
  headers?: Record<string, string>
  params?: Record<string, string>
  body?: Body
}

export { useAPI, useGet };

export const usePost = <T>(path: string, options: Options<Body>) => useAPI<T>('POST', path, options);
export const usePut = <T>(path: string, options: Options<Body>) => useAPI<T>('PUT', path, options);
export const useDelete = <T>(path: string, options: Options<Body>) => useAPI<T>('DELETE', path, options);

export const config = {
  host: window.location.hostname,
  port: 51472,
  version: 'v1'
};
