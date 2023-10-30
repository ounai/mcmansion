import { useState, useEffect, type CSSProperties } from 'react';

import { TimeElement } from './TimeElement';
import { DateElement } from './DateElement';

const style: CSSProperties = {
  paddingLeft: '10px',
  paddingRight: '10px',
  backgroundColor: 'black',
  color: 'white',
  width: 'fit-content',
  position: 'absolute',
  bottom: 0,
  right: 0,
  fontFamily: 'Open Sans',
  fontSize: '30px'
};

export const Clock = () => {
  const [h, setH] = useState(new Date().getHours());
  const [m, setM] = useState(new Date().getMinutes());
  const [s, setS] = useState(new Date().getSeconds());

  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);

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

  const toggleShowDate = () => {
    setShowDate(d => !d);
  };

  return (
    <div onClick={toggleShowDate} style={style}>
      {showDate
        ? <DateElement date={date} />
        : <TimeElement h={h} m={m} s={s} />}
    </div>
  );
};
