import { useEffect } from "react";
import { useGameStateUpdate } from "../context/game-state";

const Game = () => {
  const { setGameRunning, setGameFinished } = useGameStateUpdate();

  useEffect(() => {
    setGameRunning(true);
  }, []);

  return <></>;
};

export default Game;
