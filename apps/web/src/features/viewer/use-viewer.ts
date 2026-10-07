import { useEffect, useState } from "react";
import { useViewerImages } from "./use-viewer-images";
import type { ViewerImage } from "./viewer-types";

const useViewer = (currentRound: number) => {
  const { images, isLoading, error } = useViewerImages();
  const [image, setImage] = useState<ViewerImage | undefined>(undefined);

  useEffect(() => {
    if (images && images.length > 0) {
      setImage(images[currentRound - 1]);
    }
  }, [images, currentRound]);

  const nextImage = () => setImage(images[currentRound]);

  return { image, isLoading, error, nextImage };
};

export { useViewer };
