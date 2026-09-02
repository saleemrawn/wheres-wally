import { useEffect } from "react";
import { useGameStateUpdate } from "../context/game-state";
import { Flex } from "@radix-ui/themes";
import TimerDisplay from "../features/timer-display/timer-display";
import useTimerDisplay from "../features/timer-display/use-timer-display";
import RoundsDisplay from "../features/rounds-display/rounds-display";
import useRoundsDisplay from "../features/rounds-display/use-rounds-display";

const Game = () => {
  const { setGameRunning, setGameFinished } = useGameStateUpdate();
  const { time, startTimer, endTimer } = useTimerDisplay();
  const { currentRound, totalRounds } = useRoundsDisplay(5);

  useEffect(() => {
    setGameRunning(true);
    startTimer();
  }, []);

  return (
    <>
      <Flex className="bg-red-500">
        <TimerDisplay time={time} />
        <RoundsDisplay currentRound={currentRound} totalRounds={totalRounds} />
      </Flex>
    </>
  );
};

export default Game;
