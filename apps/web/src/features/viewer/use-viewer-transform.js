import { useRef } from "react";

const useViewerTransform = () => {
  const transformRef = useRef(null);

  const resetViewer = () => {
    transformRef.current?.resetTransform();
  };

  return { transformRef, resetViewer };
};

export { useViewerTransform };
