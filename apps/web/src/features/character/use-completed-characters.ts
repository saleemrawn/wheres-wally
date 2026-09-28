import { useState } from "react";

type TCompletedIds = Set<number>;

const useCompletedCharacters = () => {
  const [completedIds, setCompletedIds] = useState<TCompletedIds>(new Set());

  const addCompletedId = (characterId: number) => {
    if (characterId === null) return;
    setCompletedIds((prev) => new Set([...prev, characterId]));
  };

  const resetCompletedIds = () => {
    setCompletedIds(new Set());
  };

  return { completedIds, addCompletedId, resetCompletedIds };
};

export { useCompletedCharacters };
