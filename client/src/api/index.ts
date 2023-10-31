import useAPI from './useAPI';
import useGet from './useGet';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface Options<RequestBody> {
  headers?: Record<string, string>
  params?: Record<string, string>
  body?: RequestBody
  external?: boolean
}

export { useAPI, useGet };

export const usePost = <T, RequestBody>(path: string, options: Options<RequestBody>) => useAPI<T, RequestBody>('POST', path, options);
export const usePut = <T, RequestBody>(path: string, options: Options<RequestBody>) => useAPI<T, RequestBody>('PUT', path, options);
export const useDelete = <T, RequestBody>(path: string, options: Options<RequestBody>) => useAPI<T, RequestBody>('DELETE', path, options);

export const config = {
  host: window.location.hostname,
  port: 51472,
  version: 'v1'
};
