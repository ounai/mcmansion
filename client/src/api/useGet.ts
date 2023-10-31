import { useEffect } from 'react';

import { useAPI, type Options } from '.';

interface ReturnValue<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  update: () => void;
  cancel: () => void;
}

interface Dependencies {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dependencies?: any[];
}

const useGet = <T>(
  path: string,
  options?: Options<Body> & Dependencies
): ReturnValue<T> => {
  const { data, loading, error, submit: update, cancel } = useAPI<T>('GET', path, options);

  useEffect(() => {
    update();

    return () => {
      cancel();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, options?.dependencies ?? []);

  return { data, loading, error, update, cancel };
};

export default useGet;
