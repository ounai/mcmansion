import { createContext } from 'react';

import { useRuuviTagData } from './useRuuviTagData';
import { useRuuviTagHourlyData } from './useRuuviTagHourlyData';
import { NoData, type Children } from '../shared';

import type { RuuviTagData, RuuviTagHourlyData } from '.';

interface Context {
  ruuviTagData: RuuviTagData[]
  ruuviTagHourlyData: RuuviTagHourlyData[]
}

export const RuuviTagDataContext = createContext<Context>({
  ruuviTagData: [],
  ruuviTagHourlyData: []
});

export const RuuviTagDataContextProvider = ({ children }: Children) => {
  const { ruuviTagData, error, loading } = useRuuviTagData();
  const { ruuviTagHourlyData, error: hourlyError, loading: hourlyLoading } = useRuuviTagHourlyData();

  if (ruuviTagData === null) {
    return <NoData name="RuuviTag" error={error} loading={loading} />;
  }

  if (ruuviTagHourlyData === null) {
    return <NoData name="RuuviTag hourly" error={hourlyError} loading={hourlyLoading} />;
  }

  return (
    <RuuviTagDataContext.Provider value={{ ruuviTagData, ruuviTagHourlyData }}>
      {children}
    </RuuviTagDataContext.Provider>
  );
};
