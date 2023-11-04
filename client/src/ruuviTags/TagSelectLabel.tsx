import type { ChangeEvent, CSSProperties } from 'react';

import Form from 'react-bootstrap/Form';

import { roomNames } from '../app';
import { useDispatch, useSelector } from '../state';
import { setRuuviTagName, selectRuuviTagSelections } from '../state/ruuviTagSelections';

import type { RuuviTagData } from '.';

const getLastSeenString = (date: Date): string => {
  const result = [];

  let s = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  if (s >= 60) {
    let m = Math.floor(s / 60);

    s %= 60;

    if (m >= 60) {
      const h = Math.floor(m / 60);

      if (h >= 24) {
        return 'a long time';
      }

      m %= 60;

      result.push(`${h}h`);
    }

    result.push(`${m}m`);
  }

  result.push(`${s}s`);

  return result.join(' ');
};

interface Props {
  tag: RuuviTagData
  checked: boolean
}

export const TagSelectLabel = ({ tag, checked }: Props) => {
  const dispatch = useDispatch();
  const ruuviTagSelections = useSelector(selectRuuviTagSelections);

  const selection = ruuviTagSelections.find(({ tagId }) => tag.tagId === tagId);
  const lastSeen = getLastSeenString(new Date(tag.updatedAt));

  const onChangeRoom = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setRuuviTagName({
      tagId: tag.tagId,
      name: event.currentTarget.value
    }));
  };

  const itemStyle: CSSProperties = {
    marginRight: '20px',
    minWidth: '70px',
    display: 'inline-block'
  };

  return (
    <>
      RuuviTag <code>{tag.tagId}</code>

      <div style={{ whiteSpace: 'nowrap' }}>
        <div style={itemStyle}>
          {tag.rssi} dBm
        </div>

        <div style={itemStyle}>
          {Number(tag.temperature).toFixed(1)} °C
        </div>

        <div style={itemStyle}>
          {Number(tag.humidity).toFixed(0)} %
        </div>

        <div style={itemStyle}>
          {lastSeen} ago
        </div>
      </div>

      {checked && (
        <Form.Select onChange={onChangeRoom} defaultValue={selection?.name}>
          {roomNames.map(roomName => (
            <option key={roomName}>
              {roomName}
            </option>
          ))}
        </Form.Select>
      )}
    </>
  );
};
