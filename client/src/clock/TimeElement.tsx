import { useMemo } from 'react';

interface Props {
  h: number
  m: number
  s: number
}

export const TimeElement = ({ h, m, s }: Props) => {
  const semicolon = useMemo(() => (
    <div style={{
      display: 'inline-block',
      fontSize: '24px',
      verticalAlign: 'middle',
      marginLeft: '2px',
      marginRight: '2px',
      marginTop: '-8px'
    }}>:</div>
  ), []);

  return (
    <>
      <strong>{h}</strong>
      {semicolon}
      <strong>{m < 10 ? '0' : ''}{m}</strong>
      {semicolon}
      <strong>{s < 10 ? '0' : ''}{s}</strong>
    </>
  );
};
