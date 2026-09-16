import { useRef, useState } from "react";

const useViewerMarkers = () => {
  const [markers, setMarkers] = useState([]);
  const markerId = useRef(1);

  const addMarker = (coordinates) => {
    setMarkers([
      ...markers,
      { id: markerId.current, coordinates: coordinates },
    ]);

    markerId.current += 1;
  };

  const resetMarkers = () => {
    setMarkers([]);
    markerId.current = 1;
  };

  return { markers, addMarker, resetMarkers };
};

export { useViewerMarkers };
