import { useState } from "react";

const useCompletedCharacters = () => {
  const [completedIds, setCompletedIds] = useState(new Set());

  const addCompletedId = (characterId) => {
    if (characterId === null) return;
    setCompletedIds((prev) => new Set([...prev, characterId]));
  };

  const resetCompletedIds = () => {
    setCompletedIds(new Set());
  };

  return { completedIds, addCompletedId, resetCompletedIds };
};

export { useCompletedCharacters };
