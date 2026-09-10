import { useState } from "react";
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
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, addLeaderboardTime };
};

export { useAddLeaderboardTime };
