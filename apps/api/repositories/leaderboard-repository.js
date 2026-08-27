import { prisma } from "../lib/prisma.js";

const getLeaderboard = async () => {
  const times = await prisma.leaderboard.findMany();
  return times;
};

export { getLeaderboard };
