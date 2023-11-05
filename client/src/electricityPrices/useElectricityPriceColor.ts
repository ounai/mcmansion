import { useSelector } from '../state';
import { selectElectricityPriceLimits } from '../state/electricityPriceSettings';

const colors = {
  cheap: 'var(--bs-success)',
  moderate: 'var(--bs-warning)',
  expensive: 'var(--bs-danger)',
  veryExpensive: 'red'
};

export const useElectricityPriceColor = (price: number): string | undefined => {
  const limits = useSelector(selectElectricityPriceLimits);

  if (price >= limits.veryExpensive) return colors.veryExpensive;
  if (price >= limits.expensive) return colors.expensive;
  if (price >= limits.moderate) return colors.moderate;

  if (price <= limits.cheap) return colors.cheap;
};
