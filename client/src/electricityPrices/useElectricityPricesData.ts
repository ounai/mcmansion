import { useState, useEffect } from 'react';

import { useGet } from '../api';

import type { ElectricityPrices } from '.';

export const useElectricityPricesData = () => {
  const [hour, setHour] = useState(new Date().getHours());

  const { data, loading, error, update } = useGet<ElectricityPrices>('/electricity-prices');

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

  return { electricityPricesData: data?.prices ?? null, loading, error };
};
