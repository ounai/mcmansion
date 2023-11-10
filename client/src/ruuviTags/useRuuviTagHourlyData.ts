import { useGet } from '../api';
import { useHourly } from '../shared';

import type { RuuviTagHourlyData } from '.';

export const useRuuviTagHourlyData = () => {
  const { data: ruuviTagHourlyData, loading, error, update } = useGet<RuuviTagHourlyData[]>('/ruuvi-tag-data/hourly');

  useHourly(update);

  return { ruuviTagHourlyData, loading, error };
};
