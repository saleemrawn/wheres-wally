import { useEffect, useState } from "react";
import type { Character } from "./character-types.js";
import * as service from "./character-service.js";
import { type TError, getError } from "../../utils/error.js";

const useCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<TError | null>(null);

  const getCharacters = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const characters = await service.getCharacters();
      setCharacters(characters.data);
    } catch (e) {
      const err = getError(e);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getCharacterCount = () => {
    return characters.length;
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return { characters, isLoading, error, getCharacterCount };
};

export { useCharacters };
