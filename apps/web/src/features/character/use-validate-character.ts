import { useState } from "react";
import type { ValidateParams } from "./character-types.js";
import toast from "react-hot-toast";
import * as service from "./character-service.js";
import { type TError, ApiError, getError } from "../../utils/error.js";

const useValidateCharacter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<TError | null>(null);

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
    } catch (e) {
      const err = getError(e);
      const errMessage =
        err instanceof ApiError
          ? err.message
          : "Error: cannot validate character selection";
      toast.error(errMessage);
      setError(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, validate };
};

export { useValidateCharacter };
