import Form from 'react-bootstrap/Form';

import { useDispatch, useSelector } from '../state';
import { toggleRuuviTagSelection, selectRuuviTagSelections } from '../state/ruuviTagSelections';

import type { RuuviTagData } from '.';

import { TagSelectLabel } from './TagSelectLabel';

interface Props {
  tag: RuuviTagData
}

export const TagSelect = ({ tag }: Props) => {
  const dispatch = useDispatch();
  const ruuviTagSelections = useSelector(selectRuuviTagSelections);

  const checked = ruuviTagSelections.some(({ tagId }) => tagId === tag.tagId);

  const onChange = () => {
    dispatch(toggleRuuviTagSelection(tag.tagId));
  };

  return (
    <Form.Check
      type="switch"
      id={`ruuvitag-switch-${tag.tagId}`}
      label={<TagSelectLabel tag={tag} checked={checked} />}
      checked={checked}
      onChange={onChange}
    />
  );
};
