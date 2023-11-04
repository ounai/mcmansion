import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import { StopwatchFill } from 'react-bootstrap-icons';

import { StopwatchModal } from './StopwatchModal';
import { appButtonStyle } from '../app';

export const StopwatchButton = () => {
  const [show, setShow] = useState(false);

  const openStopwatchModal = () => { setShow(true); };
  const closeStopwatchModal = () => { setShow(false); };

  return (
    <>
      <StopwatchModal show={show} onHide={closeStopwatchModal} />

      <Button
        style={appButtonStyle}
        variant="dark"
        onClick={openStopwatchModal}
      >
        <StopwatchFill size={24} />
      </Button>
    </>
  );
};
