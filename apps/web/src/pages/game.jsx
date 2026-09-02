import { useEffect } from "react";
import { useGameStateUpdate } from "../context/game-state";
import { Viewer } from "../features/viewer/viewer";
import { TimerDisplay } from "../features/timer-display/timer-display";
import { useTimerDisplay } from "../features/timer-display/use-timer-display";
import { RoundsDisplay } from "../features/rounds-display/rounds-display";
import { useRoundsDisplay } from "../features/rounds-display/use-rounds-display";
import { Flex, Skeleton } from "@radix-ui/themes";
import { useViewer } from "../features/viewer/use-viewer";

const Game = () => {
  const { setGameRunning, setGameFinished } = useGameStateUpdate();
  const { time, startTimer, endTimer } = useTimerDisplay();
  const { currentRound, totalRounds } = useRoundsDisplay();
  const { image, isLoading } = useViewer(currentRound);

  useEffect(() => {
    setGameRunning(true);
    startTimer();
  }, []);

  return (
    <>
      <Skeleton loading={isLoading}>
        <Viewer token={image?.imageToken} />
      </Skeleton>

      <Flex className="bg-red-500">
        <TimerDisplay time={time} />
        <RoundsDisplay currentRound={currentRound} totalRounds={totalRounds} />
      </Flex>
    </>
  );
};

export { Game };
