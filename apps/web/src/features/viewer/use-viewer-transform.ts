import { useRef } from "react";
import type { ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";

const useViewerTransform = () => {
  const transformRef = useRef<ReactZoomPanPinchContentRef | null>(null);

  const resetViewer = () => {
    transformRef.current?.resetTransform();
  };

  return { transformRef, resetViewer };
};

export { useViewerTransform };
