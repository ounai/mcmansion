import { useState, useEffect, type CSSProperties } from 'react';

import Button from 'react-bootstrap/Button';

import { useToggle } from '../shared';

import { TimeElement } from './TimeElement';
import { DateElement } from './DateElement';

const style: CSSProperties = {
  padding: '0 10px 0 10px',
  width: 'fit-content',
  position: 'absolute',
  bottom: 0,
  right: 0,
  fontFamily: 'Open Sans',
  fontSize: '30px',
  borderRadius: 0
};

export const Clock = () => {
  const [h, setH] = useState(new Date().getHours());
  const [m, setM] = useState(new Date().getMinutes());
  const [s, setS] = useState(new Date().getSeconds());

  const [date, setDate] = useState(new Date());
  const [showDate, toggleShowDate] = useToggle();

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();

      setH(date.getHours());
      setM(date.getMinutes());
      setS(date.getSeconds());

      setDate(date);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Button variant="dark" onClick={toggleShowDate} style={style}>
      {showDate
        ? <DateElement date={date} />
        : <TimeElement h={h} m={m} s={s} />}
    </Button>
  );
};
