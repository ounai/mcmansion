import type { CSSProperties } from 'react';

import { SettingsButton } from '../settings';
import { StopwatchButton } from '../stopwatch';

const style: CSSProperties = {
  position: 'absolute',
  bottom: 0,
  left: 0
};

export const AppButtons = () => (
  <div style={style}>
    <SettingsButton />
    <StopwatchButton />
  </div>
);
