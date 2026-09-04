import { useState } from "react";
import toast from "react-hot-toast";
import * as service from "./character-service.js";

const useValidateCharacter = () => {
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
        toast.error(validation?.message);
        return null;
      }

      toast.success(validation?.message);
      return validation.data[0].characterId ?? null;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, validate };
};

export { useValidateCharacter };
