import { useState } from "react";
import type { ValidateParams } from "./character-types.js";
import toast from "react-hot-toast";
import * as service from "./character-service.js";

const useValidateCharacter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const validate = async (params: ValidateParams): Promise<number | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const validation = await service.validateCharacter(params);

      if (!validation.success) {
        toast.error(validation?.message);
        return null;
      }

      toast.success(validation?.message);
      return validation.data.characterId ?? null;
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error("An unexpected error occurred"),
      );

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, validate };
};

export { useValidateCharacter };
