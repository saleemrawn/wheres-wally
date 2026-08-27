import api from "../../lib/axios";

const basePath = "/leaderboards";

const getLeaderboard = async () => {
  const res = await api.get(basePath);
  return res.data;
};

export { getLeaderboard };
