import { body, matchedData, validationResult } from "express-validator";
import { getMatchingCoordinates } from "../repositories/coordinate-repository.js";
import * as repository from "../repositories/character-repository.js";

const validateCharacterValidators = [
  body("coordinates")
    .notEmpty()
    .withMessage("Coordinates required")
    .isObject()
    .withMessage("Expected object for coordinates"),
  body("characterId")
    .notEmpty()
    .withMessage("Character ID required")
    .isInt()
    .withMessage("Expected integer for character ID"),
  body("illustrationId")
    .notEmpty()
    .withMessage("Illustration ID required")
    .isInt()
    .withMessage("Expected integer for illustration ID"),
];

const getCharacters = async (req, res, next) => {
  try {
    const characters = await repository.getCharacters();
    res.status(200).json({ success: true, data: characters });
  } catch (error) {
    next(error);
  }
};

const validateCharacter = async (req, res, next) => {
  try {
    const x = Number(req.body?.coordinates.x);
    const y = Number(req.body?.coordinates.y);
    const characterId = Number(req.body?.characterId);
    const illustrationId = Number(req.body?.illustrationId);

    const validatedCoordinates = await getMatchingCoordinates({
      x,
      y,
      characterId,
      illustrationId,
    });

    if (validatedCoordinates.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "Wrong, try again!" });
    }

    res
      .status(200)
      .json({ success: true, message: "Correct!", data: validatedCoordinates });
  } catch (error) {
    next(error);
  }
};

export { getCharacters, validateCharacter, validateCharacterValidators };
