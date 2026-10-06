import { useEffect, useState } from "react";
import * as service from "./viewer-service";
import type { ViewerImage } from "./viewer-types";
import { handleApiError, type ApiError } from "../../utils/error";

const useViewerImages = () => {
  const [images, setImages] = useState<ViewerImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);

  const getViewerImages = async () => {
    setIsLoading(true);
    try {
      const images = await service.getViewerImages();
      setImages(images);
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getViewerImages();
  }, []);

  return { images, isLoading, error };
};

export { useViewerImages };
