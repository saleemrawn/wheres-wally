import api from "../../lib/api.js";

const basePath = "/characters";

const getCharacters = async () => {
  const res = await api.get(basePath);
  return res.data;
};

export { getCharacters };
