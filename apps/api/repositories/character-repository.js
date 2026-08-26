import { prisma } from "../lib/prisma.js";

const getCharacters = async () => {
  const characters = await prisma.character.findMany();
  return characters;
};

export { getCharacters };
