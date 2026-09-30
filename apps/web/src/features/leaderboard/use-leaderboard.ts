import { useEffect, useState } from "react";
import * as service from "./leaderboard-service.js";

const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLeaderboard = async () => {
    setIsLoading(true);
    try {
      const entries = await service.getLeaderboard();
      setLeaderboard(entries.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLeaderboard();
  }, []);

  return { leaderboard, isLoading, error };
};

export { useLeaderboard };
