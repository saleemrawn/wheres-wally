import { prisma } from "../lib/prisma.js";

const getLeaderboard = async () => {
  const times = await prisma.leaderboard.findMany({ orderBy: { time: "asc" } });
  return times;
};

export { getLeaderboard };
