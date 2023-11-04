import { CSSProperties } from 'react';

import Button from 'react-bootstrap/Button';
import { PlayCircle, PauseCircle, SkipStartCircle } from 'react-bootstrap-icons';

import { Modal, type Props as ModalProps } from '../shared/Modal';
import { useStopwatch } from './useStopwatch';

const style: CSSProperties = {
  fontFamily: 'Open Sans',
  fontSize: '80px',
  display: 'flex',
  verticalAlign: 'middle'
};

const displayValueStyle: CSSProperties = {
  flexGrow: 1,
  textAlign: 'center'
};

const iconSize = 40;

type Props = Pick<ModalProps, 'show' | 'onHide'>;

export const StopwatchModal = ({ show, onHide }: Props) => {
  const { displayValue, toggle, reset, isRunning } = useStopwatch();

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <div style={style}>
        <Button variant="link" onClick={toggle}>
          {isRunning
            ? <PauseCircle size={iconSize} />
            : <PlayCircle size={iconSize} />}
        </Button>

        <span style={displayValueStyle}>
          {displayValue}
        </span>

        <Button variant="link" onClick={reset}>
          <SkipStartCircle size={iconSize} />
        </Button>
      </div>
    </Modal>
  );
};
