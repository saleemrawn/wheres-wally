import { useState } from "react";

const useCompletedCharacters = () => {
  const [completedIds, setCompletedIds] = useState(new Set());

  const addCompletedId = (characterId) => {
    if (characterId === null) return;
    setCompletedIds((prev) => new Set([...prev, characterId]));
  };

  return { completedIds, addCompletedId };
};

export { useCompletedCharacters };
