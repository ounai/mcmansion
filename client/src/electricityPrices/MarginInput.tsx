import { useSelector, useDispatch } from '../state';
import { selectElectricityPriceMargin, setElectricityPriceMargin } from '../state/electricityPriceMargin';

import { NumberInput } from '../shared';

export const MarginInput = () => {
  const dispatch = useDispatch();
  const margin = useSelector(selectElectricityPriceMargin);

  const setMargin = (value: number) => {
    dispatch(setElectricityPriceMargin(value));
  };

  return (
    <div>
      <strong>Margin</strong>

      <NumberInput
        suffix=" c/kWh"
        steps={[-0.1, -0.01, 0.01, 0.1]}
        value={margin}
        setValue={setMargin}
      />
    </div>
  );
};
