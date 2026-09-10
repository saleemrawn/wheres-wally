import { prisma } from "../lib/prisma.js";

const getLeaderboard = async () => {
  const times = await prisma.leaderboard.findMany({ orderBy: { time: "asc" } });
  return times;
};

const getRowTenTime = async () => {
  const row = await prisma.leaderboard.findFirst({
    orderBy: { time: "asc" },
    skip: 9,
  });

  return row;
};

const addLeaderboardTime = async ({ name, time }) => {
  const data = await prisma.leaderboard.create({ data: { name, time } });
  return data;
};

export { getLeaderboard, getRowTenTime, addLeaderboardTime };
