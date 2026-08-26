import * as repository from "../repositories/illustration-repository.js";

const getIllustrations = async (req, res, next) => {
  try {
    const illustrations = await repository.getIllustrations();
    res.status(200).json({ success: true, data: illustrations });
  } catch (error) {
    next(error);
  }
};

export { getIllustrations };
