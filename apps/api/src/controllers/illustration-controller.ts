import type { Request, Response, NextFunction } from "express";
import type { ApiResponse } from "../lib/api-types";
import * as repository from "../repositories/illustration-repository";

interface Illustration {
  id: number;
  name: string;
  imageToken: string;
}

type GetIllustrationsBody = Illustration[];

const getIllustrations = async (
  _req: Request,
  res: Response<ApiResponse<GetIllustrationsBody>>,
  next: NextFunction,
) => {
  try {
    const illustrations = await repository.getIllustrations();
    res.status(200).json({ success: true, data: illustrations });
  } catch (error) {
    next(error);
  }
};

export { getIllustrations };
