import { useState, type CSSProperties } from 'react';

import Button from 'react-bootstrap/Button';
import { GearFill } from 'react-bootstrap-icons';

import { SettingsModal } from './SettingsModal';

const style: CSSProperties = {
  position: 'absolute',
  bottom: 0,
  left: 0
};

export const SettingsButton = () => {
  const [show, setShow] = useState(false);

  const onClick = () => { setShow(true); };
  const onHide = () => { setShow(false); };

  return (
    <div style={style}>
      <SettingsModal show={show} onHide={onHide} />

      <Button
        style={{ padding: '11px 10px 10px 10px', borderRadius: 0 }}
        variant="dark"
        onClick={onClick}
      >
        <GearFill size={24} />
      </Button>
    </div>
  );
};
