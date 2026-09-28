import { useState } from "react";

type TCompletedIds = Set<number>;

const useCompletedCharacters = () => {
  const [completedIds, setCompletedIds] = useState<TCompletedIds>(new Set());

  const addCompletedId = (characterId: number) => {
    setCompletedIds((prev) => new Set([...prev, characterId]));
  };

  const resetCompletedIds = () => {
    setCompletedIds(new Set());
  };

  return { completedIds, addCompletedId, resetCompletedIds };
};

export { useCompletedCharacters };
