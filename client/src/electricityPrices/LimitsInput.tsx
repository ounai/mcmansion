import { useSelector, useDispatch } from '../state';
import { selectElectricityPriceLimits, setElectricityPriceLimit, type ElectricityPriceLimits } from '../state/electricityPriceSettings';

import { NumberInput, useT } from '../shared';

interface LimitInputProps {
  limit: keyof ElectricityPriceLimits
  value: number
}

const LimitInput = ({ limit, value }: LimitInputProps) => {
  const t = useT();
  const dispatch = useDispatch();

  const setValue = (newValue: number) => {
    dispatch(setElectricityPriceLimit({
      key: limit,
      value: newValue
    }));
  };

  return (
    <div>
      <div>{t(`settings.electricityPrices.limits.${limit}`)}</div>

      <NumberInput
        suffix={' ' + t('electricityPrices.unit')}
        steps={[-1, -0.1, 0.1, 1]}
        value={value}
        setValue={setValue}
      />
    </div>
  );
};

export const LimitsInput = () => {
  const t = useT();
  const limits = useSelector(selectElectricityPriceLimits);

  return (
    <div>
      <strong>
        {t('settings.electricityPrices.limitsHeading')}
      </strong>

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
