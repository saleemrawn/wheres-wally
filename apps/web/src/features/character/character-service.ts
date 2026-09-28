import api from "../../lib/api.js";

interface ValidateCharacterParams {
  coordinates: { x: number; y: number };
  characterId: number;
  illustrationId: number;
}

interface Character {
  id: number;
  name: string;
  imageToken: string;
}

interface ValidateResponse {
  success: boolean;
  message: string;
  data: {
    characterId: number;
    illustrationId: number;
    id: number;
    startX: number;
    startY: number;
    minX: number;
    maxX: number;
    maxY: number;
  };
}

const basePath = "/characters";

const getCharacters = async (): Promise<Character[]> => {
  const res = await api.get<Character[]>(basePath);
  return res.data;
};

const validateCharacter = async (
  params: ValidateCharacterParams,
): Promise<ValidateResponse> => {
  const res = await api.post<ValidateResponse>(`${basePath}/validate`, params);

  return res.data;
};

export { getCharacters, validateCharacter };
