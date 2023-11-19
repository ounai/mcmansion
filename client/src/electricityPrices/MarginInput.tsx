import { useSelector, useDispatch } from '../state';
import { selectElectricityPriceMargin, setElectricityPriceMargin } from '../state/electricityPriceSettings';

import { NumberInput, useT } from '../shared';

export const MarginInput = () => {
  const t = useT();
  const dispatch = useDispatch();
  const margin = useSelector(selectElectricityPriceMargin);

  const setMargin = (value: number) => {
    dispatch(setElectricityPriceMargin(value));
  };

  return (
    <div>
      <strong>
        {t('settings.electricityPrices.marginHeading')}
      </strong>

      <NumberInput
        suffix={' ' + t('electricityPrices.unit')}
        steps={[-0.1, -0.01, 0.01, 0.1]}
        value={margin}
        setValue={setMargin}
      />
    </div>
  );
};
