import { useState } from "react";

const useLeaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return { players, isLoading, error };
};

export { useLeaderboard };
