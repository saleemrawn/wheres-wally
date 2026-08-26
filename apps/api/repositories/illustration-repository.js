import { prisma } from "../lib/prisma.js";

const getIllustrations = async () => {
  const illustrations = await prisma.illustration.findMany();
  return illustrations;
};

export { getIllustrations };
