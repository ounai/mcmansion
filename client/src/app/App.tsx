import type { CSSProperties } from 'react';

import { width, height } from './config';

import { AppState } from './AppState';
import { RuuviTags } from '../ruuviTags';
import { Transit } from '../transit';
import { ElectricityPrices } from '../electricityPrices';
import { AppButtons } from './AppButtons';
import { Clock } from '../clock';

import './i18n';

const style: CSSProperties = {
  position: 'relative',
  backgroundColor: '#fafafa',
  margin: 0,
  width,
  height,
  maxWidth: width,
  maxHeight: height
};

export const App = () => (
  <AppState>
    <div style={style}>
      <Transit />

      <hr style={{
        marginTop: 0,
        marginBottom: '10px'
      }} />

      <RuuviTags />

      <hr style={{
        marginTop: '10px',
        marginBottom: '10px'
      }} />

      <ElectricityPrices />

      <AppButtons />

      <Clock />
    </div>
  </AppState>
);
