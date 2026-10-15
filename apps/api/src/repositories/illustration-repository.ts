import { prisma } from "../lib/prisma";

const getIllustrations = async () => {
  const illustrations = await prisma.illustration.findMany({
    orderBy: { id: "asc" },
  });

  return illustrations;
};

export { getIllustrations };
