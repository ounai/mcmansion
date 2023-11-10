import { useContext } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useSelector } from '../state';
import { selectRuuviTagSelections } from '../state/ruuviTagSelections';
import { RuuviTagDataContext, type NamedRuuviTagData } from '.';

import { RuuviTag } from './RuuviTag';

export const RuuviTags = () => {
  const ruuviTagSelections = useSelector(selectRuuviTagSelections);
  const { ruuviTagData } = useContext(RuuviTagDataContext);

  // Inner join client selections & server data
  const filteredRuuviTagData: NamedRuuviTagData[] = ruuviTagSelections.flatMap(({ tagId, name }) => {
    const tag = ruuviTagData.find(tag => tag.tagId === tagId);

    return tag ? [{ ...tag, name }] : [];
  });

  return (
    <Row style={{ width: '100%', margin: 0 }}>
      {filteredRuuviTagData.map(tagData =>
        <Col key={tagData.tagId}>
          <RuuviTag ruuviTagData={tagData} />
        </Col>
      )}
    </Row>
  );
};
