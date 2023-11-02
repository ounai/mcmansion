import type { CSSProperties } from 'react';

import { useElectricityPriceColor } from './useElectricityPriceColor';

import type { ElectricityPriceData as Props } from '.';

const formatHour = (date: Date): string =>
  `${date.getHours() < 10 ? '0' : ''}${date.getHours()}`;

const getPriceString = (price: number): string => {
  const fixed = price.toFixed(1);

  return fixed === '-0.0'
    ? '0.0'
    : fixed;
};

export const ElectricityPrice = ({ startDate, endDate, price }: Props) => {
  const backgroundColor = useElectricityPriceColor(price);

  const tomorrow = new Date();
  tomorrow.setHours(tomorrow.getHours() + 23);

  // TODO: Should also support +2, +3 etc., in case Fingrid ever changes their reporting
  const showTomorrowHint = new Date(startDate) > tomorrow;

  const priceStyle: CSSProperties = {
    padding: '2px 4px 0px 4px',
    width: 'fit-content',
    whiteSpace: 'nowrap',
    backgroundColor
  };

  return (
    <div>
      <div>
        ⚡ <strong>{formatHour(new Date(startDate))}</strong>
        -
        <strong>{formatHour(new Date(endDate))}</strong>

        {showTomorrowHint && <sup>+1</sup>}
      </div>

      <div style={priceStyle}>
        {getPriceString(price)} c/kWh
      </div>
    </div>
  );
};
