import { useState, useEffect } from 'react';

export const useHourly = (updateFunction: () => void): void => {
  const [hour, setHour] = useState(new Date().getHours());

  useEffect(() => {
    const interval = setInterval(() => {
      const currentHour = new Date().getHours();

      if (currentHour !== hour) {
        updateFunction();
        setHour(currentHour);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [hour, updateFunction]);
};
