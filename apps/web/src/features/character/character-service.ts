import type { Character, ValidateParams } from "./character-types.js";
import type { ApiResponse } from "../../lib/api-types.js";
import api from "../../lib/api.js";

interface ValidateData {
  characterId: number;
  illustrationId: number;
  id: number;
  startX: number;
  startY: number;
  minX: number;
  maxX: number;
  maxY: number;
}

interface ValidateResponse extends ApiResponse<ValidateData> {
  message: string;
}

type CharactersResponse = ApiResponse<Character[]>;

const basePath = "/characters";

const getCharacters = async (): Promise<CharactersResponse> => {
  const res = await api.get<CharactersResponse>(basePath);
  return res.data;
};

const validateCharacter = async (
  params: ValidateParams,
): Promise<ValidateResponse> => {
  const res = await api.post<ValidateResponse, ValidateParams>(
    `${basePath}/validate`,
    params,
  );

  return res.data;
};

export { getCharacters, validateCharacter };
