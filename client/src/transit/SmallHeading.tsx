import type { ReactNode, CSSProperties } from 'react';

interface Props {
  children: ReactNode
}

const style: CSSProperties = {
  marginBottom: '8px',
  fontWeight: 'bold',
  textAlign: 'center'
};

export const SmallHeading = ({ children }: Props) => (
  <div style={style}>
    {children}
  </div>
);
