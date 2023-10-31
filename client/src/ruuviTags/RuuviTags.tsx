import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useRuuviTagData } from './useRuuviTagData';
import { useSelector } from '../state';
import { selectRuuviTagSelections } from '../state/ruuviTagSelections';

import { RuuviTag } from './RuuviTag';
import { NoData } from '../shared';

import type { NamedRuuviTagData } from '.';

export const RuuviTags = () => {
  const ruuviTagSelections = useSelector(selectRuuviTagSelections);
  const { ruuviTagData, loading, error } = useRuuviTagData();

  if (ruuviTagData === null) {
    return <NoData name="RuuviTag" loading={loading} error={error} />;
  }

  // Inner join client selections & server data
  const filteredRuuviTagData: NamedRuuviTagData[] = ruuviTagData.flatMap(tag => {
    const name = ruuviTagSelections.find(({ tagId }) => tagId === tag.tagId)?.name;

    return name !== undefined ? [{ ...tag, name }] : [];
  });

  return (
    <Row style={{ width: '100vw' }}>
      {filteredRuuviTagData.map(tagData =>
        <Col key={tagData.tagId}>
          <RuuviTag ruuviTagData={tagData} />
        </Col>
      )}
    </Row>
  );
};
