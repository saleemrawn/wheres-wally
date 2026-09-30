import api from "../../lib/axios";
import type { Time } from "../game/game-types";
import type { ApiResponse } from "../../lib/api-types";

const basePath = "/leaderboards";

type TotalTime = Pick<Time, "total">;

interface LeaderboardEntry {
  id: number;
  name: string;
  time: TotalTime;
}

type AddLeaderboardTimeParams = Omit<LeaderboardEntry, "id">;

interface TopTenCheck {
  isTopTen: boolean;
}

const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  const res = await api.get<ApiResponse<LeaderboardEntry[]>>(basePath);
  return res.data.data;
};

const addLeaderboardTime = async ({
  name,
  time,
}: AddLeaderboardTimeParams): Promise<LeaderboardEntry> => {
  const res = await api.post<ApiResponse<LeaderboardEntry>>(basePath, {
    name,
    time,
  });
  return res.data.data;
};

const checkWithinTopTen = async ({
  total,
}: TotalTime): Promise<TopTenCheck> => {
  const res = await api.get<ApiResponse<TopTenCheck>>(`${basePath}/${total}`);
  return res.data.data;
};

export { getLeaderboard, addLeaderboardTime, checkWithinTopTen };
