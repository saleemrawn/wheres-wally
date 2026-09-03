import { prisma } from "../lib/prisma.js";

const getIllustrations = async () => {
  const illustrations = await prisma.illustration.findMany({
    orderBy: { id: "asc" },
  });

  return illustrations;
};

export { getIllustrations };
