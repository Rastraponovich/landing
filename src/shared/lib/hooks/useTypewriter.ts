import { useState, useEffect } from 'react';

export function useTypewriter(text: string, speed = 50, delay = 0) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const resetId = window.setTimeout(() => {
      setDisplayText('');
      setIsComplete(false);
    }, 0);

    const startId = window.setTimeout(() => {
      let currentIndex = 0;

      intervalId = window.setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsComplete(true);
          if (intervalId !== undefined) {
            window.clearInterval(intervalId);
            intervalId = undefined;
          }
        }
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(resetId);
      window.clearTimeout(startId);
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [text, speed, delay]);
  return { displayText, isComplete };
}
