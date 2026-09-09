import { useEffect, useState } from "react";
import * as service from "./character-service.js";

const useCharacters = () => {
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

  const getCharacterCount = () => {
    return characters.length;
  };

  useEffect(() => {
    getCharacters();
  }, []);

  return { characters, isLoading, error, getCharacterCount };
};

export { useCharacters };
