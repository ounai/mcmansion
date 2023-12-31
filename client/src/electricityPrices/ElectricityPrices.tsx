import type { CSSProperties } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { NoData } from '../shared';
import { useElectricityPricesData } from './useElectricityPricesData';

import { ElectricityPrice } from './ElectricityPrice';

const rowStyle: CSSProperties = {
  marginLeft: '20px',
  marginRight: '20px',
  overflowX: 'auto',
  flexWrap: 'nowrap'
};

export const ElectricityPrices = () => {
  const { electricityPricesData, loading, error } = useElectricityPricesData();

  if (electricityPricesData === null) {
    return <NoData name="electricity price" loading={loading} error={error} />;
  }

  const now = new Date();

  const futurePrices = electricityPricesData
    .filter(p => new Date(p.endDate) > now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  return (
    <Row style={rowStyle}>
      {futurePrices.map(({ startDate, endDate, price }) => (
        <Col key={startDate}>
          <ElectricityPrice startDate={startDate} endDate={endDate} price={price} />
        </Col>
      ))}
    </Row>
  );
};
