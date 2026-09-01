import { prisma } from "../lib/prisma.js";

const getMatchingCoordinates = async ({
  x,
  y,
  characterId,
  illustrationId,
}) => {
  const coordinates = await prisma.coordinate.findMany({
    where: {
      minX: { lte: x },
      maxX: { gte: x },
      maxY: { gte: y },
      startY: { lte: y },
      characterId,
      illustrationId,
    },
  });

  return coordinates;
};

export { getMatchingCoordinates };
