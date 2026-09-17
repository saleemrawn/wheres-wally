import { createContext, useContext, useEffect, useState } from "react";

const GameStateContext = createContext();
const GameStateUpdateContext = createContext();

const useGameState = () => {
  return useContext(GameStateContext);
};

const useGameStateUpdate = () => {
  return useContext(GameStateUpdateContext);
};

const GameStateProvider = ({ children }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    window.addEventListener("popstate", () => {
      setIsRunning(false);
    });
  }, []);

  const setGameRunning = (bool) => {
    setIsRunning(bool);
  };

  const setGameFinished = (bool) => {
    setIsFinished(bool);
  };

  return (
    <GameStateContext value={{ isRunning, isFinished }}>
      <GameStateUpdateContext value={{ setGameRunning, setGameFinished }}>
        {children}
      </GameStateUpdateContext>
    </GameStateContext>
  );
};

export { GameStateProvider, useGameState, useGameStateUpdate };
