import type { CSSProperties } from 'react';

import type { ElectricityPrice as Props } from '.';

const formatHour = (date: Date): string =>
  `${date.getHours() < 10 ? '0' : ''}${date.getHours()}`;

const getColor = (price: number): string | undefined => {
  // TODO: User customizable limits

  if (price > 20) return 'red';
  if (price > 10) return 'var(--bs-danger)';
  if (price > 6) return 'var(--bs-warning)';

  if (price <= 2) return 'var(--bs-success)';

  return undefined;
};

const getPriceStyle = (price: number): CSSProperties => ({
  padding: '2px 4px 0px 4px',
  width: 'fit-content',
  whiteSpace: 'nowrap',
  backgroundColor: getColor(price)
});

const getPriceString = (price: number): string => {
  const fixed = price.toFixed(1);

  return fixed === '-0.0'
    ? '0.0'
    : fixed;
};

export const ElectricityPrice = ({ startDate, endDate, price }: Props) => {
  const tomorrow = new Date();
  tomorrow.setHours(tomorrow.getHours() + 23);

  // TODO: Should also support +2, +3 etc., in case Fingrid ever changes their reporting
  const showTomorrowHint = new Date(startDate) > tomorrow;

  return (
    <div>
      <div>
        ⚡ <strong>{formatHour(new Date(startDate))}</strong>
        -
        <strong>{formatHour(new Date(endDate))}</strong>

        {showTomorrowHint && <sup>+1</sup>}
      </div>

      <div style={getPriceStyle(price)}>
        {getPriceString(price)} c/kWh
      </div>
    </div>
  );
};
