import { createContext, useRef, useEffect, type RefObject } from 'react';

import { useRuuviTagData } from './useRuuviTagData';
import { useRuuviTagHourlyData } from './useRuuviTagHourlyData';
import { NoData, type Children } from '../shared';
import { ruuviTagMaxMeasurementCount } from '../app';
import { useSelector } from '../state';
import { selectRuuviTagSelections } from '../state/ruuviTagSelections';

import type { RuuviTagData, RuuviTagHourlyData, MeasurementHistory, MeasurementHistoryIndex } from '.';

interface Context {
  ruuviTagData: RuuviTagData[]
  ruuviTagHourlyData: RuuviTagHourlyData[]
  measurementHistoryRef: RefObject<MeasurementHistory>
}

export const RuuviTagDataContext = createContext<Context>({
  ruuviTagData: [],
  ruuviTagHourlyData: [],
  measurementHistoryRef: { current: null }
});

export const RuuviTagDataContextProvider = ({ children }: Children) => {
  const ruuviTagSelections = useSelector(selectRuuviTagSelections);

  const { ruuviTagData, error, loading } = useRuuviTagData();
  const { ruuviTagHourlyData, error: hourlyError, loading: hourlyLoading } = useRuuviTagHourlyData();

  const measurementHistory = useRef<MeasurementHistory>({});
  const measurementHistoryIndex = useRef<MeasurementHistoryIndex>({});
  const measurementHistoryMapped = useRef<MeasurementHistory>({});

  useEffect(() => {
    if (ruuviTagData === null) {
      return;
    }

    for (const tag of ruuviTagData) {
      if (ruuviTagSelections.every(s => s.tagId !== tag.tagId)) {
        continue;
      }

      if (!Object.keys(measurementHistory.current).includes(tag.tagId)) {
        measurementHistory.current[tag.tagId] = [tag];
        measurementHistoryIndex.current[tag.tagId] = 0;
      } else {
        const previousIndex = measurementHistoryIndex.current[tag.tagId];
        const index = (previousIndex === ruuviTagMaxMeasurementCount - 1) ? 0 : previousIndex + 1;
        const previous = measurementHistory.current[tag.tagId][previousIndex];

        if (tag.updatedAt > previous.updatedAt) {
          measurementHistory.current[tag.tagId][index] = tag;
          measurementHistoryIndex.current[tag.tagId] = index;
        }
      }

      const measurements = measurementHistory.current[tag.tagId];
      const index = measurementHistoryIndex.current[tag.tagId];

      measurementHistoryMapped.current[tag.tagId] = Array<RuuviTagData>(measurements.length);
      let arrayIndex = 0;

      for (let i = index + 1; i < measurements.length; i++) {
        measurementHistoryMapped.current[tag.tagId][arrayIndex++] = measurements[i];
      }

      for (let i = 0; i < index + 1; i++) {
        measurementHistoryMapped.current[tag.tagId][arrayIndex++] = measurements[i];
      }
    }
  }, [ruuviTagData, ruuviTagSelections]);

  if (ruuviTagData === null) {
    return <NoData name="RuuviTag" error={error} loading={loading} />;
  }

  if (ruuviTagHourlyData === null) {
    return <NoData name="RuuviTag hourly" error={hourlyError} loading={hourlyLoading} />;
  }

  const value = {
    ruuviTagData,
    ruuviTagHourlyData,
    measurementHistoryRef: measurementHistoryMapped
  };

  return (
    <RuuviTagDataContext.Provider value={value}>
      {children}
    </RuuviTagDataContext.Provider>
  );
};
