import { useRuuviTagData } from './useRuuviTagData';

import Form from 'react-bootstrap/Form';

import { NoData } from '../shared';
import { roomNames } from '../app';
import { useDispatch, useSelector } from '../state';
import { toggleRuuviTagSelection, selectRuuviTagSelections } from '../state/ruuviTagSelections';

import type { RuuviTagData } from '.';

interface LabelProps {
  tag: RuuviTagData
}

const Label = ({ tag }: LabelProps) => {
  const separator = (
    <span style={{ marginLeft: '20px' }}></span>
  );

  const lastSeenS = Math.round((new Date().getTime() - new Date(tag.updatedAt).getTime()) / 1000);

  return (
    <>
      RuuviTag <code>{tag.tagId}</code>

      <div>
        {tag.rssi} dBm
        {separator}
        {Number(tag.temperature).toFixed(1)} °C
        {separator}
        {Number(tag.humidity).toFixed(0)} %
        {separator}
        {lastSeenS}s ago
      </div>
    </>
  );
};

export const RuuviTagSelector = () => {
  const dispatch = useDispatch();
  const ruuviTagSelections = useSelector(selectRuuviTagSelections);
  const { ruuviTagData, loading, error } = useRuuviTagData();

  if (ruuviTagData === null) {
    return <NoData name="RuuviTag" loading={loading} error={error} />;
  }

  return ruuviTagData
    .sort((a, b) => a.tagId.localeCompare(b.tagId))
    .map((tag, index) => (
      <div key={tag.tagId} style={{ marginTop: index === 0 ? 0 : '16px' }}>
        <Form.Check
          type="switch"
          id={`ruuvitag-switch-${tag.tagId}`}
          label={<Label tag={tag} />}
          checked={ruuviTagSelections.some(({ tagId }) => tagId === tag.tagId)}
          onChange={() => {
            dispatch(toggleRuuviTagSelection(tag.tagId));
          }}
        />
      </div>
    ));
};
