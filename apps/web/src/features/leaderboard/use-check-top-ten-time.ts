import { useState } from "react";
import type { Time } from "../timer-display/timer-display-types.ts";
import * as service from "./leaderboard-service.js";
import { type TError, getError } from "../../utils/error.ts";

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
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { isTopTen, isLoading, error, checkWithinTopTen };
};

export { useCheckTopTenTime };
