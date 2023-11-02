import { createContext } from 'react';

import { useRuuviTagData } from './useRuuviTagData';

import type { RuuviTagData } from '.';
import { NoData, type Children } from '../shared';

export const RuuviTagDataContext = createContext<RuuviTagData[]>([]);

export const RuuviTagDataContextProvider = ({ children }: Children) => {
  const { ruuviTagData, error, loading } = useRuuviTagData();

  if (ruuviTagData === null) {
    return <NoData name="RuuviTag" error={error} loading={loading} />;
  }

  return (
    <RuuviTagDataContext.Provider value={ruuviTagData}>
      {children}
    </RuuviTagDataContext.Provider>
  );
};
