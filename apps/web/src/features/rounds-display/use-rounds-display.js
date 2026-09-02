import { useCallback, useState } from "react";

const useRoundsDisplay = (total) => {
  const [totalRounds, setTotalRounds] = useState(total);
  const [currentRound, setCurrentRound] = useState(1);

  const updateCurrentRound = useCallback(() => {
    setCurrentRound((prev) => prev + 1);
  });

  return { currentRound, totalRounds, updateCurrentRound };
};

export { useRoundsDisplay };
