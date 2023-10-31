import { useEffect } from 'react';

import { usePost } from '../api';
import { transitApiUrl, transitUpdateIntervalMs, transitStopConfig, transitNumberOfDepartures } from '../app';

import type { DeparturesData } from '.';

const constructQueryPart = (transitType: string, stopId: string, index: number): string => {
  const innerQuery = `
    name
    stoptimesWithoutPatterns(omitCanceled:false, numberOfDepartures:${transitNumberOfDepartures}) {
      scheduledDeparture
      realtimeDeparture
      realtime
      realtimeState
      headsign
      serviceDay
      trip {
        route {
          shortName
          longName
        }
      }
    }
  `;

  return `${transitType}${index + 1}:stop(id:"${stopId}") {${innerQuery}}`;
};

const constructQuery = (): string => {
  const queryParts: string[] = [
    ...transitStopConfig.bus.east.map(constructQueryPart.bind(null, 'busEast')),
    ...transitStopConfig.bus.west.map(constructQueryPart.bind(null, 'busWest')),
    ...transitStopConfig.train.east.map(constructQueryPart.bind(null, 'trainEast')),
    ...transitStopConfig.train.west.map(constructQueryPart.bind(null, 'trainWest'))
  ];

  return ['{\n', '\n}'].join(queryParts.join('\n\n'));
};

export const useDeparturesData = (digitransitSubscriptionKey: string) => {
  const query = constructQuery();
  const body = { query };

  const { data, loading, error, submit: update } = usePost<{ data: DeparturesData }, typeof body>(transitApiUrl, {
    params: {
      'digitransit-subscription-key': digitransitSubscriptionKey
    },
    body,
    external: true
  });

  // First fetch
  useEffect(() => {
    update();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Subsequent fetches
  useEffect(() => {
    const interval = setInterval(() => {
      update();
    }, transitUpdateIntervalMs);

    return () => {
      clearInterval(interval);
    };
  }, [update]);

  return { departuresData: data?.data ?? null, loading, error };
};
