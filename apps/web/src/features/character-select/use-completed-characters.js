import { useState } from "react";

const useCompletedCharacters = () => {
  const [completed, setCompleted] = useState(new Set());

  const addCompleted = (characterId) => {
    if (characterId === null) return;
    setCompleted((prev) => new Set([...prev, characterId]));
  };

  return { completed, addCompleted };
};

export { useCompletedCharacters };
