import api from "../../lib/axios";

const basePath = "/leaderboards";

const getLeaderboard = async () => {
  const res = await api.get(basePath);
  return res.data;
};

const addLeaderboardTime = async ({ name, time }) => {
  const res = await api.post(basePath, { name, time });
  return res.data;
};

const checkWithinTopTen = async (time) => {
  const res = await api.get(`${basePath}/${time}`);
  return res.data;
};

export { getLeaderboard, addLeaderboardTime, checkWithinTopTen };
