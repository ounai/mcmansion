import { useState, useRef, useCallback } from 'react';
import type { Dispatch, SetStateAction, MutableRefObject } from 'react';

import { config } from '.';
import type { Method, Options } from '.';

interface ReturnValue<T> {
  data: T | null
  loading: boolean
  error: Error | null
  submit: () => void
  cancel: () => void
}

const fetchData = async <T>(
  method: Method,
  path: string,
  setData: Dispatch<SetStateAction<T | null>>,
  setLoading: Dispatch<SetStateAction<boolean>>,
  setError: Dispatch<SetStateAction<Error | null>>,
  abortController: MutableRefObject<AbortController | null>,
  options?: Options<Body>
): Promise<void> => {
  if (!path.startsWith('/')) {
    throw new Error(`Invalid API path "${path}" (must start with /)`);
  }

  // Abort previous request, if exists
  abortController.current?.abort();

  abortController.current = new AbortController();
  const signal = abortController.current.signal;

  setError(null);
  setLoading(true);

  const url = options?.external
    ? [path]
    : ['http://', config.host, ':', config.port.toString(), '/api/', config.version, path];

  if (options?.params && Object.keys(options.params).length > 0) {
    url.push('?', new URLSearchParams(options.params).toString());
  }

  try {
    const response = await fetch(url.join(''), {
      method,
      signal,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers
      },
      body: JSON.stringify(options?.body)
    });

    if (response.status === 200) {
      setData(await response.json() as T);
    } else if (response.status >= 400) {
      throw new Error(await response.text());
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') return;

      setError(error);
    } else if (typeof error === 'string') {
      setError(new Error(error));
    } else {
      setError(new Error(`Invalid error of type ${typeof error}`));
    }

    console.error(`[${method} ${path}]`, error);
  }

  setLoading(false);
};

const useAPI = <T>(
  method: Method,
  path: string,
  options?: Options<Body>
): ReturnValue<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const abortController = useRef<AbortController | null>(null);

  const submit = useCallback(() => {
    void fetchData(method, path, setData, setLoading, setError, abortController, options);
  }, [method, options, path]);

  const cancel = () => {
    abortController.current?.abort();
  };

  return { data, loading, error, submit, cancel };
};

export default useAPI;
