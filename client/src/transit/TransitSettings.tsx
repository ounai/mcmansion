import { useDispatch, useSelector } from '../state';
import { selectTransitNumberOfDepartures, selectTransitUpdateIntervalSeconds, setTransitNumberOfDepartures, setTransitUpdateIntervalSeconds } from '../state/transitSettings';

import { NumberInput, useT } from '../shared';
import { minTransitUpdateIntervalSeconds } from '../app';

export const TransitSettings = () => {
  const t = useT();
  const dispatch = useDispatch();

  const numberOfDepartures = useSelector(selectTransitNumberOfDepartures);
  const updateIntervalSeconds = useSelector(selectTransitUpdateIntervalSeconds);

  const setNumberOfDepartures = (value: number) => {
    dispatch(setTransitNumberOfDepartures(value));
  };

  const setUpdateIntervalSeconds = (value: number) => {
    dispatch(setTransitUpdateIntervalSeconds(value));
  };

  return (
    <div>
      <div>
        <strong>
          {t('settings.transit.numberOfDeparturesHeading')}
        </strong>

        <NumberInput
          steps={[-1, 1]}
          value={numberOfDepartures}
          setValue={setNumberOfDepartures}
        />
      </div>

      <hr />

      <div>
        <strong>
          {t('settings.transit.updateIntervalHeading')}
        </strong>

        <NumberInput
          steps={[-60, -10, -1, 1, 10, 60]}
          value={updateIntervalSeconds}
          setValue={setUpdateIntervalSeconds}
          decrementDisabled={updateIntervalSeconds <= minTransitUpdateIntervalSeconds}
        />
      </div>
    </div>
  );
};
