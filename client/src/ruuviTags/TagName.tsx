import type { CSSProperties } from 'react';

interface Props {
  value: string
}

const style: CSSProperties = {
  fontWeight: 'bold',
  fontFamily: 'Arial',
  whiteSpace: 'nowrap'
};

export const TagName = ({ value }: Props) => (
  <div style={style}>
    {value}
  </div>
);
