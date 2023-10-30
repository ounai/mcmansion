import type { CSSProperties } from 'react';

import { locale } from '../app';

import type { Props } from './RuuviTag';

const style: CSSProperties = {
  marginTop: '2px',
  fontSize: '13px',
  color: 'var(--bs-danger)'
};

export const TagWarning = ({ ruuviTagData }: Props) => {
  const tagUpdatedAt = new Date(ruuviTagData.updatedAt);

  const hourAgo = new Date();
  hourAgo.setHours(hourAgo.getHours() - 1);

  if (tagUpdatedAt < hourAgo) {
    const yesterday = new Date();
    yesterday.setHours(yesterday.getHours() - 23);

    // Less than 23h ago -> show time of last update, otherwise date
    const displayString = tagUpdatedAt < yesterday
      ? tagUpdatedAt.toLocaleDateString(locale)
      : tagUpdatedAt.toLocaleTimeString(locale);

    return (
      <div style={style}>
        (last update at {displayString})
      </div>
    );
  }

  return null;
};
