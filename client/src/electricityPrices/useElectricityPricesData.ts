import { useGet } from '../api';
import { useSelector } from '../state';
import { selectElectricityPriceMargin } from '../state/electricityPriceSettings';
import { useHourly } from '../shared';

import type { ElectricityPriceData } from '.';

// Server type has price as a decimal string instead of number
type ElectricityPricesResponse = (Pick<ElectricityPriceData, 'startDate' | 'endDate'> & { price: string })[];

export const useElectricityPricesData = () => {
  const margin = useSelector(selectElectricityPriceMargin);

  const { data, loading, error, update } = useGet<ElectricityPricesResponse>('/electricity-prices');

  useHourly(update);

  const electricityPricesData: ElectricityPriceData[] | null =
    data?.map(p => ({ ...p, price: Number(p.price) + margin })) ?? null;

  return { electricityPricesData, loading, error };
};
