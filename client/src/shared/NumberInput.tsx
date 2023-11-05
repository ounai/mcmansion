import type { CSSProperties } from 'react';

import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import BootstrapButton from 'react-bootstrap/Button';

interface ButtonProps {
  increment: number
  onClick: () => void
  disabled: boolean
}

const buttonStyle: CSSProperties = {
  textDecoration: 'none'
};

const Button = ({ increment, onClick, disabled }: ButtonProps) => (
  <BootstrapButton
    variant="link"
    size="sm"
    onClick={onClick}
    style={buttonStyle}
    disabled={disabled}
  >
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
  decrementDisabled?: boolean
  incrementDisabled?: boolean
}

export const NumberInput = ({ prefix, suffix, steps, value, setValue, decrementDisabled, incrementDisabled }: Props) => {
  const getButton = (disabled: boolean, step: number) => (
    <Button
      key={step}
      increment={step}
      onClick={() => { setValue(value + step); }}
      disabled={disabled}
    />
  );

  return (
    <InputGroup>
      {steps.filter(s => s < 0).map(getButton.bind(null, decrementDisabled ?? false))}

      <Form.Control
        value={`${prefix ?? ''}${value}${suffix ?? ''}`}
        style={inputStyle}
        disabled
      />

      {steps.filter(s => s > 0).map(getButton.bind(null, incrementDisabled ?? false))}
    </InputGroup>
  );
};
