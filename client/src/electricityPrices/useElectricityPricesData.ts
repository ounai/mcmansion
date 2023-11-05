import { useState, useEffect } from 'react';

import { useGet } from '../api';
import { useSelector } from '../state';
import { selectElectricityPriceMargin } from '../state/electricityPriceSettings';

import type { ElectricityPricesData } from '.';

export const useElectricityPricesData = () => {
  const margin = useSelector(selectElectricityPriceMargin);

  const [hour, setHour] = useState(new Date().getHours());

  const { data, loading, error, update } = useGet<ElectricityPricesData>('/electricity-prices');

  useEffect(() => {
    const interval = setInterval(() => {
      const currentHour = new Date().getHours();

      if (currentHour !== hour) {
        update();
        setHour(currentHour);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [hour, update]);

  return {
    electricityPricesData: data === null
      ? null
      : data.prices.map(p => ({ ...p, price: p.price + margin })),
    loading,
    error
  };
};
