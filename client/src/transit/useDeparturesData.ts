import { useEffect } from 'react';

import { usePost } from '../api';
import { transitApiUrl, transitStopConfig } from '../app';
import { useSelector } from '../state';
import { selectTransitNumberOfDepartures, selectTransitUpdateIntervalSeconds } from '../state/transitSettings';

import type { DeparturesData } from '.';

const constructQueryPart = (transitType: string, numberOfDepartures: number, stopId: string, index: number): string => {
  const innerQuery = `
    name
    stoptimesWithoutPatterns(omitCanceled:false, numberOfDepartures:${numberOfDepartures}) {
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

const constructQuery = (numberOfDepartures: number): string => {
  const queryParts: string[] = [
    ...transitStopConfig.bus.east.map(constructQueryPart.bind(null, 'busEast', numberOfDepartures)),
    ...transitStopConfig.bus.west.map(constructQueryPart.bind(null, 'busWest', numberOfDepartures)),
    ...transitStopConfig.train.east.map(constructQueryPart.bind(null, 'trainEast', numberOfDepartures)),
    ...transitStopConfig.train.west.map(constructQueryPart.bind(null, 'trainWest', numberOfDepartures))
  ];

  return ['{\n', '\n}'].join(queryParts.join('\n\n'));
};

export const useDeparturesData = (digitransitSubscriptionKey: string) => {
  const numberOfDepartures = useSelector(selectTransitNumberOfDepartures);
  const updateIntervalSeconds = useSelector(selectTransitUpdateIntervalSeconds);

  const query = constructQuery(numberOfDepartures);
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
  }, [numberOfDepartures]);

  // Subsequent fetches
  useEffect(() => {
    const interval = setInterval(() => {
      update();
    }, updateIntervalSeconds * 1000);

    return () => {
      clearInterval(interval);
    };
  }, [update, updateIntervalSeconds]);

  return { departuresData: data?.data ?? null, loading, error };
};
