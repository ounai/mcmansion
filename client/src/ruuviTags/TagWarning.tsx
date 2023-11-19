import type { CSSProperties } from 'react';

import { useLocale } from '../app';
import { useT } from '../shared';

import type { Props } from './RuuviTag';

const style: CSSProperties = {
  marginTop: '2px',
  fontSize: '13px',
  color: 'var(--bs-danger)'
};

export const TagWarning = ({ ruuviTagData }: Props) => {
  const t = useT();
  const locale = useLocale();

  const tagUpdatedAt = new Date(ruuviTagData.updatedAt);

  const hourAgo = new Date();
  hourAgo.setHours(hourAgo.getHours() - 1);

  if (tagUpdatedAt < hourAgo) {
    const yesterday = new Date();
    yesterday.setHours(yesterday.getHours() - 23);

    // Less than 23h ago -> show time of last update, otherwise date
    const displayDateString = tagUpdatedAt < yesterday;

    const dateString = tagUpdatedAt.toLocaleDateString(locale);
    const timeString = tagUpdatedAt.toLocaleTimeString(locale);

    return (
      <div style={style}>
        ({displayDateString
          ? t('ruuviTags.tagWarning.lastUpdateDate', { date: dateString })
          : t('ruuviTags.tagWarning.lastUpdateTime', { time: timeString })})
      </div>
    );
  }

  return null;
};
