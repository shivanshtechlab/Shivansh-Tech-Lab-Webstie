import { useState, useEffect, useRef } from 'react';

export function useCountUp(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start);
  const [isRunning, setIsRunning] = useState(false);
  const frameRef = useRef(null);

  const startCount = () => {
    setIsRunning(true);
  };

  useEffect(() => {
    if (!isRunning) return;

    const startTime = performance.now();
    const numericEnd = parseFloat(end);
    const numericStart = parseFloat(start);

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numericStart + (numericEnd - numericStart) * eased;

      setCount(Math.floor(current));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(numericEnd);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isRunning, end, start, duration]);

  return { count, startCount };
}
