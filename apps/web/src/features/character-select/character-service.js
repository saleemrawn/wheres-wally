import api from "../../lib/api.js";

const basePath = "/characters";

const getCharacters = async () => {
  const res = await api.get(basePath);
  return res.data;
};

const validateCharacter = async ({
  coordinates,
  characterId,
  illustrationId,
}) => {
  const res = await api.post(`${basePath}/validate`, {
    coordinates,
    characterId,
    illustrationId,
  });

  return res.data;
};

export { getCharacters, validateCharacter };
