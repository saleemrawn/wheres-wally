import * as repository from "../repositories/leaderboard-repository.js";

const getLeaderboard = async (req, res, next) => {
  try {
    const times = await repository.getLeaderboard();
    res.status(200).json({ success: true, data: times });
  } catch (error) {
    next(error);
  }
};

const isTopTenTime = async (req, res, next) => {
  try {
    const userTime = Number(req.params.time);
    const row = await repository.getRowTenTime();

    if (userTime > Number(row.time)) {
      return res.status(200).json({ success: true, isTopTen: false });
    }

    res.status(200).json({ success: true, isTopTen: true });
  } catch (error) {
    next(error);
  }
};

export { getLeaderboard, isTopTenTime };
