import { useState } from "react";
import { getErrorDetails } from "../../utils/error.js";
import type { LeaderboardEntry } from "./leaderboard-types.js";
import toast from "react-hot-toast";
import * as service from "./leaderboard-service.js";

type AddLeaderboardTimeParams = Omit<LeaderboardEntry, "id">;

const useAddLeaderboardTime = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addLeaderboardTime = async ({
    name,
    time,
  }: AddLeaderboardTimeParams) => {
    setIsLoading(true);
    setError(null);
    try {
      await service.addLeaderboardTime({ name, time });
      toast.success("Time added successfully");
    } catch (error) {
      const errDetails = getErrorDetails(error);
      setError(errDetails);
    } finally {
      setIsLoading(false);
    }
  };

  const resetError = () => setError(null);

  return { isLoading, error, addLeaderboardTime, resetError };
};

export { useAddLeaderboardTime };
