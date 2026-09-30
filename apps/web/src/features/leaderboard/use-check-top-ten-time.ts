import { useEffect, useState } from "react";
import * as service from "./leaderboard-service.js";

const useCheckTopTenTime = () => {
  const [isTopTen, setIsTopTen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const checkWithinTopTen = async (time) => {
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
