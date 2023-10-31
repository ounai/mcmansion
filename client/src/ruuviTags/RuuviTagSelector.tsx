import { useRuuviTagData } from './useRuuviTagData';

import { NoData } from '../shared';
import { TagSelect } from './TagSelect';

export const RuuviTagSelector = () => {
  const { ruuviTagData, loading, error } = useRuuviTagData();

  if (ruuviTagData === null) {
    return <NoData name="RuuviTag" loading={loading} error={error} />;
  }

  return ruuviTagData
    .sort((a, b) => a.tagId.localeCompare(b.tagId))
    .map((tag, index) => (
      <div key={tag.tagId} style={{ marginTop: index === 0 ? 0 : '16px' }}>
        <TagSelect tag={tag} />
      </div>
    ));
};
