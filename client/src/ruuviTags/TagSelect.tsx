import Form from 'react-bootstrap/Form';

import { useDispatch, useSelector } from '../state';
import { toggleRuuviTagSelection, selectRuuviTagSelections } from '../state/ruuviTagSelections';

import { TagSelectLabel } from './TagSelectLabel';
import { ruuviTagMaxSelectionCount } from '../app';

import type { RuuviTagData } from '.';

interface Props {
  tag: RuuviTagData
}

export const TagSelect = ({ tag }: Props) => {
  const dispatch = useDispatch();
  const ruuviTagSelections = useSelector(selectRuuviTagSelections);

  const checked = ruuviTagSelections.some(({ tagId }) => tagId === tag.tagId);
  const disabled = !checked && ruuviTagSelections.length >= ruuviTagMaxSelectionCount;

  const toggleSelection = () => {
    dispatch(toggleRuuviTagSelection(tag.tagId));
  };

  return (
    <Form.Check
      type="switch"
      id={`ruuvitag-switch-${tag.tagId}`}
      label={<TagSelectLabel tag={tag} checked={checked} />}
      checked={checked}
      disabled={disabled}
      onChange={toggleSelection}
    />
  );
};
