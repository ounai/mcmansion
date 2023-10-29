import type { CSSProperties } from 'react';

import { Clock } from './Clock';

const style: CSSProperties = {
  margin: 0,
  width: '100vw',
  height: '100vh',
  maxWidth: '100vw',
  maxHeight: '100vh'
};

const App = () => (
  <div style={style}>
    <Clock />
  </div>
);

export default App;
