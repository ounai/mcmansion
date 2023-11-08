import { useState } from 'react';

export const useToggle = (initialState = false): [boolean, () => void] => {
  const [value, setValue] = useState<boolean>(initialState);

  const toggleValue = () => {
    setValue(v => !v);
  };

  return [value, toggleValue];
};
