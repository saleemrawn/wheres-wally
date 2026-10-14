import { useState } from "react";
import type { Time } from "../timer-display/timer-display-types.ts";
import * as service from "./leaderboard-service.js";
import { type TError, ApiError, getError } from "../../utils/error.ts";
import toast from "react-hot-toast";

type TotalTime = Pick<Time, "total">;

const useCheckTopTenTime = () => {
  const [isTopTen, setIsTopTen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<TError | null>(null);

  const checkWithinTopTen = async (time: TotalTime) => {
    setIsLoading(true);
    try {
      const data = await service.checkWithinTopTen(time);
      setIsTopTen(data.isTopTen);
    } catch (e) {
      const err = getError(e);
      const errMessage =
        err instanceof ApiError
          ? err.message
          : "Error: cannot check leaderboard time.";
      toast.error(errMessage);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isTopTen, isLoading, error, checkWithinTopTen };
};

export { useCheckTopTenTime };
