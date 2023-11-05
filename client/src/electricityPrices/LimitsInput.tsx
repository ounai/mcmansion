import { useSelector, useDispatch } from '../state';
import { selectElectricityPriceLimits, setElectricityPriceLimit, type ElectricityPriceLimits } from '../state/electricityPriceSettings';

import { NumberInput } from '../shared';

interface LimitInputProps {
  limit: keyof ElectricityPriceLimits
  value: number
}

const LimitInput = ({ limit, value }: LimitInputProps) => {
  const dispatch = useDispatch();

  const setValue = (newValue: number) => {
    dispatch(setElectricityPriceLimit({
      key: limit,
      value: newValue
    }));
  };

  let name = limit.replace(/([A-Z])/g, ' $1');
  name = name[0].toUpperCase() + name.slice(1);

  return (
    <div>
      <div>{name}</div>

      <NumberInput
        suffix=" c/kWh"
        steps={[-1, -0.1, 0.1, 1]}
        value={value}
        setValue={setValue}
      />
    </div>
  );
};

export const LimitsInput = () => {
  const limits = useSelector(selectElectricityPriceLimits);

  return (
    <div>
      <strong>Limits</strong>

      {Object.entries(limits).map(([limit, value]) => (
        <LimitInput
          key={limit}
          limit={limit as keyof ElectricityPriceLimits}
          value={value as ElectricityPriceLimits[keyof ElectricityPriceLimits]}
        />
      ))}
    </div>
  );
};
