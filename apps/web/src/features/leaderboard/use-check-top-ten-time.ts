import { useState } from "react";
import type { Time } from "../timer-display/timer-display-types.ts";
import * as service from "./leaderboard-service.js";

type TotalTime = Pick<Time, "total">;

const useCheckTopTenTime = () => {
  const [isTopTen, setIsTopTen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const checkWithinTopTen = async (time: TotalTime) => {
    setIsLoading(true);
    try {
      const data = await service.checkWithinTopTen(time);
      setIsTopTen(data.isTopTen);
    } catch (error) {
      setError(
        error instanceof Error
          ? error
          : new Error("An unexpected error occurred"),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { isTopTen, isLoading, error, checkWithinTopTen };
};

export { useCheckTopTenTime };
