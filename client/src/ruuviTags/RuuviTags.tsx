import { useEffect } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useGet } from '../api';
import { ruuviTagUpdateIntervalMs } from '../app';
import { useSelector } from '../state';
import { selectRuuviTagSelections } from '../state/ruuviTagSelections';

import { RuuviTag } from './RuuviTag';
import { NoData } from '../shared';

import type { RuuviTagData, NamedRuuviTagData } from '.';

export const RuuviTags = () => {
  const ruuviTagSelections = useSelector(selectRuuviTagSelections);
  const { data: ruuviTagData, loading, error, update } = useGet<RuuviTagData[]>('/ruuvi-tag-data');

  useEffect(() => {
    const interval = setInterval(update, ruuviTagUpdateIntervalMs);

    return () => {
      clearInterval(interval);
    };
  }, [update]);

  if (ruuviTagData === null) {
    return <NoData name="temperature" loading={loading} error={error} />;
  }

  // Inner join client selections & server data
  const filteredRuuviTagData: NamedRuuviTagData[] = ruuviTagData.flatMap(tag => {
    const name = ruuviTagSelections.find(({ tagId }) => tagId === tag.tagId)?.name;

    return name !== undefined ? [{ ...tag, name }] : [];
  });

  return (
    <Row>
      {filteredRuuviTagData.map(tagData =>
        <Col key={tagData.name}>
          <RuuviTag key={tagData.name} ruuviTagData={tagData} />
        </Col>
      )}
    </Row>
  );
};
