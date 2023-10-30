import type { CSSProperties } from 'react';

interface Props {
  value: string
}

const style: CSSProperties = {
  fontWeight: 'bold',
  fontFamily: 'Arial'
};

export const TagName = ({ value }: Props) => (
  <div style={style}>
    {value}
  </div>
);
