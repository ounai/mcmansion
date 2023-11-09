import { useGet } from '../api';
import { useSelector } from '../state';
import { selectElectricityPriceMargin } from '../state/electricityPriceSettings';
import { useHourly } from '../shared';

import type { ElectricityPricesData } from '.';

export const useElectricityPricesData = () => {
  const margin = useSelector(selectElectricityPriceMargin);

  const { data, loading, error, update } = useGet<ElectricityPricesData>('/electricity-prices');

  useHourly(update);

  return {
    electricityPricesData: data === null
      ? null
      : data.prices.map(p => ({ ...p, price: p.price + margin })),
    loading,
    error
  };
};
