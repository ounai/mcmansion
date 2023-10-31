import type { CSSProperties } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { SmallHeading } from './SmallHeading';
import { Stoptimes } from './Stoptimes';

import { transitNumberOfDepartures } from '../app';

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
  height: '200px'
};

const innerRowStyle: CSSProperties = {
  marginTop: '15px'
};

const innerColStyle: CSSProperties = {
  paddingRight: 0
};

const combine = (departuresData: DeparturesData, prefix: string): StoptimeWithoutPattern[] => {
  const stoptimes: StoptimeWithoutPattern[] = [];

  for (const [key, value] of Object.entries(departuresData)) {
    if (key.startsWith(prefix)) {
      stoptimes.push(...value.stoptimesWithoutPatterns);
    }
  }

  return stoptimes
    .sort((a, b) => a.serviceDay !== b.serviceDay
      ? a.serviceDay - b.serviceDay
      : (a.realtimeDeparture ?? a.scheduledDeparture) - (b.realtimeDeparture ?? b.scheduledDeparture)
    )
    .slice(0, transitNumberOfDepartures);
};

export const DepartureBoards = ({ departuresData }: Props) => {
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
              🚆 West
            </SmallHeading>

            <Stoptimes stoptimes={combine(departuresData, 'trainWest')} />
          </Col>

          <Col xs={6}>
            <SmallHeading>
              🚆 East
            </SmallHeading>

            <Stoptimes stoptimes={combine(departuresData, 'trainEast')} />
          </Col>
        </Row>
      </Col>

      <Col>
        <Row style={innerRowStyle}>
          <Col xs={6} style={innerColStyle}>
            <SmallHeading>
              {busEmoji} West
            </SmallHeading>

            <Stoptimes stoptimes={combine(departuresData, 'busWest')} />
          </Col>

          <Col xs={6}>
            <SmallHeading>
              {busEmoji} East
            </SmallHeading>

            <Stoptimes stoptimes={combine(departuresData, 'busEast')} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
