import { Router } from "express";
import * as controller from "../controllers/leaderboard-controller.js";

const router = Router();

router.get("/", controller.getLeaderboard);

export default router;
