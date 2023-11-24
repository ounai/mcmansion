import { createContext, useRef, useEffect } from 'react';

import { useRuuviTagData } from './useRuuviTagData';
import { useRuuviTagHourlyData } from './useRuuviTagHourlyData';
import { NoData, type Children } from '../shared';

import type { RuuviTagData, RuuviTagHourlyData, MeasurementHistory } from '.';

interface Context {
  ruuviTagData: RuuviTagData[]
  ruuviTagHourlyData: RuuviTagHourlyData[]
  measurementHistory: MeasurementHistory
}

export const RuuviTagDataContext = createContext<Context>({
  ruuviTagData: [],
  ruuviTagHourlyData: [],
  measurementHistory: {}
});

export const RuuviTagDataContextProvider = ({ children }: Children) => {
  const { ruuviTagData, error, loading } = useRuuviTagData();
  const { ruuviTagHourlyData, error: hourlyError, loading: hourlyLoading } = useRuuviTagHourlyData();

  const measurementHistory = useRef<MeasurementHistory>({});

  useEffect(() => {
    if (ruuviTagData === null) return;

    for (const tag of ruuviTagData) {
      if (!Object.keys(measurementHistory.current).includes(tag.tagId)) {
        measurementHistory.current[tag.tagId] = [tag];
      } else {
        const previous = measurementHistory.current[tag.tagId].at(-1)!;

        if (tag.updatedAt > previous.updatedAt) {
          measurementHistory.current[tag.tagId].push(tag);

          if (measurementHistory.current[tag.tagId].length > 10_000) {
            measurementHistory.current[tag.tagId].shift();
          }
        }
      }
    }
  }, [ruuviTagData]);

  if (ruuviTagData === null) {
    return <NoData name="RuuviTag" error={error} loading={loading} />;
  }

  if (ruuviTagHourlyData === null) {
    return <NoData name="RuuviTag hourly" error={hourlyError} loading={hourlyLoading} />;
  }

  const value = {
    ruuviTagData,
    ruuviTagHourlyData,
    measurementHistory: measurementHistory.current
  };

  return (
    <RuuviTagDataContext.Provider value={value}>
      {children}
    </RuuviTagDataContext.Provider>
  );
};
