import type { CSSProperties } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useSelector } from '../state';
import { selectTransitNumberOfDepartures } from '../state/transitSettings';
import { useT } from '../shared';

import { SmallHeading } from './SmallHeading';
import { Stoptimes } from './Stoptimes';

import type { DeparturesData, StoptimeWithoutPattern } from '.';

interface Props {
  departuresData: DeparturesData
}

const outerRowStyle: CSSProperties = {
  margin: 0,
  padding: 0
};

const outerColStyle: CSSProperties = {
  borderRight: '1px solid #ccc',
  paddingBottom: '15px'
};

const innerRowStyle: CSSProperties = {
  marginTop: '15px'
};

const innerColStyle: CSSProperties = {
  paddingRight: 0
};

const combine = (departuresData: DeparturesData, prefix: string, numberOfDepartures: number): StoptimeWithoutPattern[] => {
  const stoptimes: StoptimeWithoutPattern[] = [];

  for (const [key, value] of Object.entries(departuresData)) {
    if (key.startsWith(prefix)) {
      stoptimes.push(...value.stoptimesWithoutPatterns);
    }
  }

  return stoptimes
    .filter(stoptime => stoptime.headsign)
    .sort((a, b) => a.serviceDay !== b.serviceDay
      ? a.serviceDay - b.serviceDay
      : (a.realtimeDeparture ?? a.scheduledDeparture) - (b.realtimeDeparture ?? b.scheduledDeparture)
    )
    .slice(0, numberOfDepartures);
};

export const DepartureBoards = ({ departuresData }: Props) => {
  const t = useT();
  const numberOfDepartures = useSelector(selectTransitNumberOfDepartures);

  const trainEmoji = '🚆';

  const busEmoji = (
    <div style={{
      display: 'inline-block',
      marginTop: '-2px',
      verticalAlign: 'top'
    }}>🚌</div>
  );

  return (
    <Row style={outerRowStyle}>
      <Col style={outerColStyle}>
        <Row style={innerRowStyle}>
          <Col xs={6} style={innerColStyle}>
            <SmallHeading>
              {trainEmoji} {t('transit.departureBoards.west')}
            </SmallHeading>

            <Stoptimes stoptimes={combine(departuresData, 'trainWest', numberOfDepartures)} />
          </Col>

          <Col xs={6}>
            <SmallHeading>
              {trainEmoji} {t('transit.departureBoards.east')}
            </SmallHeading>

            <Stoptimes stoptimes={combine(departuresData, 'trainEast', numberOfDepartures)} />
          </Col>
        </Row>
      </Col>

      <Col>
        <Row style={innerRowStyle}>
          <Col xs={6} style={innerColStyle}>
            <SmallHeading>
              {busEmoji} {t('transit.departureBoards.west')}
            </SmallHeading>

            <Stoptimes stoptimes={combine(departuresData, 'busWest', numberOfDepartures)} />
          </Col>

          <Col xs={6}>
            <SmallHeading>
              {busEmoji} {t('transit.departureBoards.east')}
            </SmallHeading>

            <Stoptimes stoptimes={combine(departuresData, 'busEast', numberOfDepartures)} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
