import { useContext } from 'react';

import { RuuviTagDataContext } from '.';

import { TagSelect } from './TagSelect';

export const RuuviTagSelector = () => {
  const { ruuviTagData } = useContext(RuuviTagDataContext);

  return ruuviTagData
    .sort((a, b) => a.tagId.localeCompare(b.tagId))
    .map((tag, index) => (
      <div key={tag.tagId} style={{ marginTop: index === 0 ? 0 : '16px' }}>
        <TagSelect tag={tag} />
      </div>
    ));
};
