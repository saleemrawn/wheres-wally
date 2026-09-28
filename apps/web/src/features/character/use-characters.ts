import { useEffect, useState } from "react";
import * as service from "./character-service.js";

const useCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getCharacters = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const characters = await service.getCharacters();
      setCharacters(characters.data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error("An unexpected error occurred"));
      }
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
