import { useState } from "react";
import type { Time } from "../game/game-types";
import * as service from "./leaderboard-service.js";

type TotalTime = Pick<Time, "total">;

const useCheckTopTenTime = () => {
  const [isTopTen, setIsTopTen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkWithinTopTen = async (time: TotalTime) => {
    setIsLoading(true);
    try {
      const data = await service.checkWithinTopTen(time);
      setIsTopTen(data.isTopTen);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isTopTen, isLoading, error, checkWithinTopTen };
};

export { useCheckTopTenTime };
