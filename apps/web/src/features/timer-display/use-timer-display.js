import { useCallback, useRef, useState } from "react";

const useTimerDisplay = () => {
  const [time, setTime] = useState({ hh: 0, mm: 0, ss: 0, ms: 0, total: 0 });
  const intervalRef = useRef(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        let { hh, mm, ss, ms, total } = prev;
        total++;
        ms++;

        if (ms >= 100) {
          ss++;
          ms = 0;
        }
        if (ss >= 60) {
          mm++;
          ss = 0;
        }
        if (mm >= 60) {
          hh++;
          mm = 0;
        }
        return { hh, mm, ss, ms, total };
      });
    }, 10);
  }, []);

  const endTimer = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  return { time, startTimer, endTimer };
};

export { useTimerDisplay };
