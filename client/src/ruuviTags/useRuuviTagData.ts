import { useEffect } from 'react';

import { useGet } from '../api';
import { ruuviTagUpdateIntervalMs } from '../app';

import type { RuuviTagData } from '.';

export const useRuuviTagData = () => {
  const { data: ruuviTagData, loading, error, update } = useGet<RuuviTagData[]>('/ruuvi-tag-data');

  useEffect(() => {
    const interval = setInterval(update, ruuviTagUpdateIntervalMs);

    return () => {
      clearInterval(interval);
    };
  }, [update]);

  return { ruuviTagData, loading, error };
};
