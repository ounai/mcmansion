import { Provider } from 'react-redux';

import type { CSSProperties } from 'react';

import { RuuviTags } from '../ruuviTags';
import { Clock } from '../clock';

import { width, height } from './config';
import { store } from '../state';

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
  <Provider store={store}>
    <div style={style}>
      <RuuviTags />
      <Clock />
    </div>
  </Provider>
);
