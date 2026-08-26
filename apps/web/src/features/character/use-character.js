import { useEffect, useState } from "react";
import * as service from "./character-service.js";

const useCharacter = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getCharacters = async () => {
    setIsLoading(true);
    try {
      const characters = await service.getCharacters();
      setCharacters(characters.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return { characters, isLoading, error };
};

export { useCharacter };
