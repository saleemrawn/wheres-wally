import { Router } from "express";
import * as controller from "../controllers/leaderboard-controller.js";

const router = Router();

router.get("/", controller.getLeaderboard);
router.get("/:time", controller.isTopTenTime);
router.post(
  "/",
  controller.leaderboardValidators,
  controller.addLeaderboardTime,
);

export default router;
