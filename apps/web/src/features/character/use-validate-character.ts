import { useState } from "react";
import type { ValidateParams } from "./character-types.js";
import toast from "react-hot-toast";
import * as service from "./character-service.js";

const useValidateCharacter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const validate = async (params: ValidateParams): Promise<number | null> => {
    setIsLoading(true);
    try {
      const validation = await service.validateCharacter(params);

      if (!validation.success) {
        toast.error(validation?.message);
        return null;
      }

      toast.success(validation?.message);
      return validation.data.characterId ?? null;
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, validate };
};

export { useValidateCharacter };
