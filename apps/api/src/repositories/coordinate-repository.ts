import { prisma } from "../lib/prisma";

interface getMatchingCoordinatesParams {
  x: number;
  y: number;
  characterId: number;
  illustrationId: number;
}

const getMatchingCoordinates = async ({
  x,
  y,
  characterId,
  illustrationId,
}: getMatchingCoordinatesParams) => {
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
