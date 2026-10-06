import { useEffect, useState } from "react";
import * as service from "./viewer-service";

const useViewerImages = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getViewerImages = async () => {
    setIsLoading(true);
    try {
      const images = await service.getViewerImages();
      setImages(images.data);
    } catch (error) {
      setError(error);
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
