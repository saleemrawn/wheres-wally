import { useEffect, useState } from "react";
import type { LeaderboardEntry } from "./leaderboard-types.js";
import * as service from "./leaderboard-service.js";

const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const getLeaderboard = async () => {
    setIsLoading(true);
    try {
      const entries = await service.getLeaderboard();
      setLeaderboard(entries.data);
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

  useEffect(() => {
    getLeaderboard();
  }, []);

  return { leaderboard, isLoading, error };
};

export { useLeaderboard };
