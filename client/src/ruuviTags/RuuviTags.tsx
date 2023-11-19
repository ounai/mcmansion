import { useContext, type CSSProperties } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useSelector } from '../state';
import { selectRuuviTagSelections } from '../state/ruuviTagSelections';
import { RuuviTagDataContext, type NamedRuuviTagData } from '.';
import { useT } from '../shared';

import { RuuviTag } from './RuuviTag';

const rowStyle: CSSProperties = {
  width: '100%',
  margin: 0,
  overflowX: 'auto',
  flexWrap: 'nowrap'
};

export const RuuviTags = () => {
  const t = useT();
  const ruuviTagSelections = useSelector(selectRuuviTagSelections);
  const { ruuviTagData } = useContext(RuuviTagDataContext);

  // Inner join client selections & server data
  const filteredRuuviTagData: NamedRuuviTagData[] = ruuviTagSelections.flatMap(({ tagId, name }) => {
    const tag = ruuviTagData.find(tag => tag.tagId === tagId);

    return tag ? [{ ...tag, name: t(`ruuviTags.rooms.${name}`) }] : [];
  });

  return (
    <Row style={rowStyle}>
      {filteredRuuviTagData.map(tagData =>
        <Col key={tagData.tagId}>
          <RuuviTag ruuviTagData={tagData} />
        </Col>
      )}
    </Row>
  );
};
