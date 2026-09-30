import type { Time } from "../game/game-types";

type TotalTime = Pick<Time, "total">;

interface LeaderboardEntry {
  id: number;
  name: string;
  time: TotalTime;
}

interface ValidationError {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

interface ApiErrorResponse {
  success: boolean;
  message: string;
  errors: ValidationError[];
}

export type { LeaderboardEntry, ApiErrorResponse, ValidationError };
