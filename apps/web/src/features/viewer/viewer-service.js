import api from "../../lib/axios";

const basePath = "/illustrations";

const getViewerImages = async () => {
  const images = await api.get(basePath);
  return images.data;
};

export { getViewerImages };
