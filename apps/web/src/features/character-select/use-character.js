import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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

const useValidateCharacter = () => {
  const [completedCharacters, setCompletedCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const validate = async ({ coordinates, characterId, illustrationId }) => {
    setIsLoading(true);
    try {
      const validation = await service.validateCharacter({
        coordinates,
        characterId,
        illustrationId,
      });

      if (!validation.success) {
        return toast.error(validation?.message);
      }

      setCompletedCharacters([
        ...completedCharacters,
        validation.data[0]?.characterId,
      ]);

      toast.success(validation?.message);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { completedCharacters, isLoading, error, validate };
};

export { useCharacter, useValidateCharacter };
