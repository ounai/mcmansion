import { Provider } from 'react-redux';

import type { CSSProperties } from 'react';

import { RuuviTags } from '../ruuviTags';
import { Clock } from '../clock';

import { store } from '../state';

const style: CSSProperties = {
  margin: 0,
  width: '800px',
  height: '480px',
  maxWidth: '800px',
  maxHeight: '480px',
  position: 'relative',
  backgroundColor: '#fafafa'
};

export const App = () => (
  <Provider store={store}>
    <div style={style}>
      <RuuviTags />
      <Clock />
    </div>
  </Provider>
);
