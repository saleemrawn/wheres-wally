import { Router } from "express";
import * as controller from "../controllers/illustration-controller";

const router = Router();

router.get("/", controller.getIllustrations);

export default router;
