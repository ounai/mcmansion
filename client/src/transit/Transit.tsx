import { useGet } from '../api';

import { NoData } from '../shared';
import { useDeparturesData } from './useDeparturesData';

import { DepartureBoards } from './DepartureBoards';

import type { DigitransitSubscriptionKeyResponse } from '.';

interface Props {
  digitransitSubscriptionKey: string
}

const Transit = ({ digitransitSubscriptionKey }: Props) => {
  const { departuresData, loading, error } = useDeparturesData(digitransitSubscriptionKey);

  if (departuresData === null) {
    return <NoData name="departures" loading={loading} error={error} />;
  }

  return <DepartureBoards departuresData={departuresData} />;
};

const TransitSubscriptionKeyWrapper = () => {
  const { data, error, loading } = useGet<DigitransitSubscriptionKeyResponse>('/transit/digitransit-subscription-key');

  if (data === null || data.digitransitSubscriptionKey.length === 0) {
    return <NoData name="Digitransit subscription key" loading={loading} error={error} />;
  }

  return <Transit digitransitSubscriptionKey={data.digitransitSubscriptionKey} />;
};

export { TransitSubscriptionKeyWrapper as Transit };
