import { useEffect, useRef, useState } from "react";
import { useGameState } from "../../context/game-state.tsx";

const useTimerDisplay = () => {
  const { isRunning } = useGameState();
  const [time, setTime] = useState({ hh: 0, mm: 0, ss: 0, ms: 0, total: 0 });
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!isRunning) {
      endTimer();
      resetTimer();
    }
  }, [isRunning]);

  const startTimer = () => {
    if (intervalRef.current) return;
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      if (startTimeRef.current !== null) {
        const elapsedMs = Date.now() - startTimeRef.current;

        setTime({
          hh: Math.floor(elapsedMs / 3600000),
          mm: Math.floor((elapsedMs / 60000) % 60),
          ss: Math.floor((elapsedMs / 1000) % 60),
          ms: Math.floor((elapsedMs % 1000) / 10),
          total: elapsedMs,
        });
      }
    }, 10);
  };

  const endTimer = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined;
  };

  const resetTimer = () => {
    endTimer();
    startTimeRef.current = null;
    setTime({ hh: 0, mm: 0, ss: 0, ms: 0, total: 0 });
  };

  return { time, startTimer, endTimer, resetTimer };
};

export { useTimerDisplay };
