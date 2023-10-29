import { useState, useEffect, type CSSProperties } from 'react';

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

const timeSemicolonStyle: CSSProperties = {
  display: 'inline-block',
  fontSize: '24px',
  verticalAlign: 'middle',
  marginLeft: '2px',
  marginRight: '2px',
  marginTop: '-8px'
};

interface TimeElementProps {
  h: number
  m: number
  s: number
}

const TimeElement = ({ h, m, s }: TimeElementProps) => (
  <>
    <strong>{h}</strong>
    <div style={timeSemicolonStyle}>:</div>
    <strong>{m < 10 ? '0' : ''}{m}</strong>
    <div style={timeSemicolonStyle}>:</div>
    <strong>{s < 10 ? '0' : ''}{s}</strong>
  </>
);

interface DateElementProps {
  date: Date
}

const DateElement = ({ date }: DateElementProps) => (
  <strong>
    {new Intl.DateTimeFormat('fi-FI').format(date)}
  </strong>
);

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
