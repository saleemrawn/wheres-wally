import { Router } from "express";
import * as controller from "../controllers/character-controller.js";

const router = Router();

router.get("/", controller.getCharacters);
router.post(
  "/validate",
  controller.validateCharacterValidators,
  controller.validateCharacter,
);

export default router;
