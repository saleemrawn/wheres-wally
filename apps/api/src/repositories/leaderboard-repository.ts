import { prisma } from "../lib/prisma";

interface addLeaderboardTimeParams {
  name: string;
  time: number;
}

const getLeaderboard = async () => {
  const times = await prisma.leaderboard.findMany({
    take: 10,
    orderBy: { time: "asc" },
  });
  return times;
};

const getRowTenTime = async () => {
  const row = await prisma.leaderboard.findFirst({
    orderBy: { time: "asc" },
    skip: 9,
  });

  return row;
};

const addLeaderboardTime = async ({ name, time }: addLeaderboardTimeParams) => {
  const data = await prisma.leaderboard.create({ data: { name, time } });
  return data;
};

export { getLeaderboard, getRowTenTime, addLeaderboardTime };
