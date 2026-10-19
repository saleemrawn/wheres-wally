import { body, matchedData, validationResult } from "express-validator";
import { getMatchingCoordinates } from "../repositories/coordinate-repository";
import * as repository from "../repositories/character-repository";
import type { Request, Response, NextFunction } from "express";
import type { ApiResponse } from "../lib/api-types";

interface Character {
  id: number;
  name: string;
  imageToken: string;
}

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

const getCharacters = async (
  _req: Request,
  res: Response<ApiResponse<Character[]>>,
  next: NextFunction,
) => {
  try {
    const characters = await repository.getCharacters();
    res.status(200).json({ success: true, data: characters });
  } catch (error) {
    next(error);
  }
};

const validateCharacter = async (req, res, next) => {
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

    const { coordinates, characterId, illustrationId } = matchedData<{
      coordinates: { x: number; y: number };
      characterId: number;
      illustrationId: number;
    }>(req);

    const validatedCoordinates = await getMatchingCoordinates({
      x: coordinates.x,
      y: coordinates.y,
      characterId,
      illustrationId,
    });

    if (validatedCoordinates.length === 0) {
      res.status(200).json({ success: false, message: "Wrong, try again!" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Correct!",
      data: validatedCoordinates[0],
    });
  } catch (error) {
    next(error);
  }
};

export { getCharacters, validateCharacter, validateCharacterValidators };
