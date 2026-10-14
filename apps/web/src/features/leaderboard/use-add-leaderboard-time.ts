import { useState } from "react";
import { useNavigate } from "react-router";
import { type TError, getError } from "../../utils/error.ts";
import type { LeaderboardEntry } from "./leaderboard-types.ts";
import toast from "react-hot-toast";
import * as service from "./leaderboard-service.ts";

type AddLeaderboardTimeParams = Omit<LeaderboardEntry, "id">;

const useAddLeaderboardTime = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<TError | null>(null);

  const navigate = useNavigate();

  const addLeaderboardTime = async ({
    name,
    time,
  }: AddLeaderboardTimeParams) => {
    setIsLoading(true);
    setError(null);
    try {
      await service.addLeaderboardTime({ name, time });
      navigate("/leaderboard", { replace: true });
      toast.success("Time added successfully");
    } catch (error) {
      const err = getError(error);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const resetError = () => setError(null);

  return { isLoading, error, addLeaderboardTime, resetError };
};

export { useAddLeaderboardTime };
