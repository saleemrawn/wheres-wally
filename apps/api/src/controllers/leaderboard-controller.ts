import type { Request, Response, NextFunction } from "express";
import {
  body,
  matchedData,
  validationResult,
  type ValidationError,
} from "express-validator";
import * as repository from "../repositories/leaderboard-repository";
import type { ApiResponse } from "../lib/api-types";

interface LeaderboardItem {
  name: string;
  time: number;
  id: number;
}

interface AddLeaderboardTimeBody {
  name: string;
  time: string | number;
}

const leaderboardValidators = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2, max: 15 })
    .withMessage("Name must between 2 and 15 letters")
    .isAlpha(undefined, { ignore: " " })
    .withMessage("Name can only contain letters"),
  body("time")
    .trim()
    .notEmpty()
    .withMessage("Time is required")
    .isInt()
    .withMessage("Time must be a number")
    .toInt(),
  ,
];

const getLeaderboard = async (
  _req: Request,
  res: Response<ApiResponse<LeaderboardItem[]>>,
  next: NextFunction,
) => {
  try {
    const times = await repository.getLeaderboard();
    res.status(200).json({ success: true, data: times });
  } catch (error) {
    next(error);
  }
};

const addLeaderboardTime = async (
  req: Request<{}, {}, AddLeaderboardTimeBody, {}>,
  res: Response<ApiResponse<LeaderboardItem, ValidationError[]>>,
  next: NextFunction,
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        success: false,
        message: "Please fix errors and try again",
        errors: errors.array(),
      });
      return;
    }

    const { name, time } = matchedData<{ name: string; time: number }>(req);
    const data = await repository.addLeaderboardTime({ name, time });

    res.status(201).json({
      success: true,
      message: "Added successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

const isTopTenTime = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userTime = Number(req.params["time"]);
    const row = await repository.getRowTenTime();

    if (!row) {
      res.status(200).json({ success: true, data: { isTopTen: true } });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        isTopTen: userTime < Number(row.time),
      },
    });
  } catch (error) {
    next(error);
  }
};

export {
  getLeaderboard,
  addLeaderboardTime,
  isTopTenTime,
  leaderboardValidators,
};
