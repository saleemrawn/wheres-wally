import { useEffect, useState } from "react";
import type { LeaderboardEntry } from "./leaderboard-types.js";
import * as service from "./leaderboard-service.js";
import { handleApiError, ApiError } from "../../utils/error.js";

const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const getLeaderboard = async () => {
    setIsLoading(true);
    try {
      const entries = await service.getLeaderboard();
      setLeaderboard(entries);
    } catch (error) {
      setError(handleApiError(error));
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
