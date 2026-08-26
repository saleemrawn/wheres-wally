import * as repository from "../repositories/character-repository.js";

const getCharacters = async (req, res, next) => {
  try {
    const characters = await repository.getCharacters();
    res.status(200).json({ success: true, data: characters });
  } catch (error) {
    next(error);
  }
};

export { getCharacters };
