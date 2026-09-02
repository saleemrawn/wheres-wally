import { useEffect, useState } from "react";
import { useViewerImages } from "./use-viewer-images";

const useViewer = (currentRound) => {
  const { images, isLoading, error } = useViewerImages();
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (images && images.length > 0) {
      setImage(images[currentRound - 1]);
    }
  }, [images]);

  return { image, isLoading, error };
};

export { useViewer };
