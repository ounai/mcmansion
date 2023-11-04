import type { CSSProperties } from 'react';

import { SettingsButton } from '../settings';

const style: CSSProperties = {
  position: 'absolute',
  bottom: 0,
  left: 0
};

export const AppButtons = () => (
  <div style={style}>
    <SettingsButton />
  </div>
);
