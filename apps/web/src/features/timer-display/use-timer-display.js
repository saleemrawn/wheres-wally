import { useCallback, useRef, useState } from "react";

const useTimerDisplay = () => {
  const [time, setTime] = useState({ hh: 0, mm: 0, ss: 0, ms: 0, total: 0 });
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current) return;
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsedMs = Date.now() - startTimeRef.current;

      setTime({
        hh: Math.floor(elapsedMs / 3600000),
        mm: Math.floor((elapsedMs / 60000) % 60),
        ss: Math.floor((elapsedMs / 1000) % 60),
        ms: Math.floor((elapsedMs % 1000) / 10),
        total: elapsedMs,
      });
    }, 10);
  }, []);

  const endTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const resetTimer = () => {
    endTimer();
    startTimeRef.current = null;
    setTime({ hh: 0, mm: 0, ss: 0, ms: 0, total: 0 });
  };

  return { time, startTimer, endTimer, resetTimer };
};

export { useTimerDisplay };
