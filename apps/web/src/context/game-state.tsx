import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface GameStateProviderProps {
  children: ReactNode;
}

interface GameState {
  isRunning: boolean;
  isFinished: boolean;
}

interface GameStateUpdate {
  setGameRunning: (isRunning: boolean) => void;
  setGameFinished: (isFinished: boolean) => void;
}

const GameStateContext = createContext<GameState | undefined>(undefined);
const GameStateUpdateContext = createContext<GameStateUpdate | undefined>(
  undefined,
);

const useGameState = () => {
  const context = useContext(GameStateContext);

  if (context === undefined) {
    throw new Error("useGameState must be used within a GameStateProvider");
  }

  return context;
};

const useGameStateUpdate = () => {
  const context = useContext(GameStateUpdateContext);

  if (context === undefined) {
    throw new Error(
      "useGameStateUpdate must be used within a GameStateProvider",
    );
  }

  return context;
};

const GameStateProvider = ({ children }: GameStateProviderProps) => {
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
