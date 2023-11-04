import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import { GearFill } from 'react-bootstrap-icons';

import { SettingsModal } from './SettingsModal';
import { appButtonStyle } from '../app';

export const SettingsButton = () => {
  const [show, setShow] = useState(false);

  const openSettingsModal = () => { setShow(true); };
  const closeSettingsModal = () => { setShow(false); };

  return (
    <>
      <SettingsModal show={show} onHide={closeSettingsModal} />

      <Button
        style={appButtonStyle}
        variant="dark"
        onClick={openSettingsModal}
      >
        <GearFill size={24} />
      </Button>
    </>
  );
};
