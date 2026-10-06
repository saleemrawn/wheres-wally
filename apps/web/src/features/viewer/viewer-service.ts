import type { ViewerImage } from "./viewer-types";
import type { ApiResponse } from "../../lib/api-types";
import api from "../../lib/axios";

const basePath = "/illustrations";

const getViewerImages = async (): Promise<ViewerImage[]> => {
  const images = await api.get<ApiResponse<ViewerImage[]>>(basePath);
  return images.data.data;
};

export { getViewerImages };
