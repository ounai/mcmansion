import { Provider } from 'react-redux';

import type { CSSProperties } from 'react';

import { RuuviTags } from '../ruuviTags';
import { Clock } from '../clock';

import { store } from '../state';

const style: CSSProperties = {
  margin: 0,
  width: '100vw',
  height: '100vh',
  maxWidth: '100vw',
  maxHeight: '100vh'
};

export const App = () => (
  <Provider store={store}>
    <div style={style}>
      <RuuviTags />
      <Clock />
    </div>
  </Provider>
);
