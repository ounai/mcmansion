import type { CSSProperties } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import BootstrapButton from 'react-bootstrap/Button';

interface ButtonProps {
  increment: number
  onClick: () => void
}

const buttonStyle: CSSProperties = {
  textDecoration: 'none'
};

const Button = ({ increment, onClick }: ButtonProps) => (
  <BootstrapButton variant="link" size="sm" onClick={onClick} style={buttonStyle}>
    {increment > 0 && '+'}{increment}
  </BootstrapButton>
);

const inputStyle: CSSProperties = {
  backgroundColor: 'white',
  textAlign: 'center'
};

interface Props {
  prefix?: string
  suffix?: string
  steps: number[]
  value: number
  setValue: (value: number) => void
}

export const NumberInput = ({ prefix, suffix, steps, value, setValue }: Props) => {
  const getButton = (step: number) => (
    <Button
      key={step}
      increment={step}
      onClick={() => { setValue(value + step); }}
    />
  );

  return (
    <InputGroup>
      {steps.filter(s => s < 0).map(getButton)}

      <Form.Control
        value={`${prefix ?? ''}${value}${suffix ?? ''}`}
        style={inputStyle}
        disabled
      />

      {steps.filter(s => s > 0).map(getButton)}
    </InputGroup>
  );
};
