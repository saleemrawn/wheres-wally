import { useRef, useState } from "react";
import type { Coordinate, Marker } from "./viewer-types";

const useViewerMarkers = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const markerId = useRef(1);

  const addMarker = (coordinates: Coordinate) => {
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
