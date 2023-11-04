import { useState, useEffect } from 'react';

export const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [secondsCount, setSecondsCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning) {
        setSecondsCount(s => s + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  let seconds = secondsCount;
  let minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  seconds %= 60;
  minutes %= 60;

  const displayValue = [
    hours,
    ':',
    minutes < 10 ? '0' : '',
    minutes,
    ':',
    seconds < 10 ? '0' : '',
    seconds
  ].join('');

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const toggle = () => {
    setIsRunning(r => !r);
  };

  const reset = () => {
    stop();
    setSecondsCount(0);
  };

  return { displayValue, start, stop, toggle, reset, isRunning };
};
