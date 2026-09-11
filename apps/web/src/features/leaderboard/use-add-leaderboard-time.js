import { useState } from "react";
import { getErrorDetails } from "../../utils/error.js";
import toast from "react-hot-toast";
import * as service from "./leaderboard-service.js";

const useAddLeaderboardTime = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addLeaderboardTime = async ({ name, time }) => {
    setIsLoading(true);
    try {
      const data = await service.addLeaderboardTime({ name, time });
      toast.success(data.message);
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
