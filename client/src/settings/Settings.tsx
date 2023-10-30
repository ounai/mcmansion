import { CSSProperties } from 'react';

import Button from 'react-bootstrap/Button';
import { GearFill } from 'react-bootstrap-icons';

const style: CSSProperties = {
  position: 'absolute',
  bottom: 0,
  left: 0
};

export const Settings = () => (
  <div style={style}>
    <Button style={{ padding: '11px 10px 10px 10px', borderRadius: 0 }} variant="dark">
      <GearFill size={24} />
    </Button>
  </div>
);
