import * as repository from "../repositories/leaderboard-repository.js";

const getLeaderboard = async (req, res, next) => {
  try {
    const times = await repository.getLeaderboard();
    res.status(200).json({ success: true, data: times });
  } catch (error) {
    next(error);
  }
};

export { getLeaderboard };
