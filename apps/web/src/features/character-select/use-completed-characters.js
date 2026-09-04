import { useState } from "react";

const useCompletedCharacters = () => {
  const [completed, setCompleted] = useState([]);

  const addCompleted = (characterId) => {
    if (characterId === null) return;
    setCompleted((prev) => [...prev, characterId]);
  };

  return { completed, addCompleted };
};

export { useCompletedCharacters };
