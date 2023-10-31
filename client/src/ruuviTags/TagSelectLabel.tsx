import type { ChangeEvent } from 'react';

import Form from 'react-bootstrap/Form';

import { roomNames } from '../app';
import { useDispatch, useSelector } from '../state';
import { setRuuviTagName, selectRuuviTagSelections } from '../state/ruuviTagSelections';

import type { RuuviTagData } from '.';

interface Props {
  tag: RuuviTagData
  checked: boolean
}

export const TagSelectLabel = ({ tag, checked }: Props) => {
  const dispatch = useDispatch();
  const ruuviTagSelections = useSelector(selectRuuviTagSelections);

  const selection = ruuviTagSelections.find(({ tagId }) => tag.tagId === tagId);
  const lastSeenS = Math.round((new Date().getTime() - new Date(tag.updatedAt).getTime()) / 1000);

  const onChangeRoom = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setRuuviTagName({
      tagId: tag.tagId,
      name: event.currentTarget.value
    }));
  };

  const separator = (
    <span style={{ marginLeft: '20px' }}></span>
  );

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
