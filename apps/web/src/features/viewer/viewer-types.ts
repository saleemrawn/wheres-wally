import type { ReactNode } from "react";

interface ViewerImage {
  id: number;
  name: string;
  imageToken: string;
}

interface Coordinate {
  x: number;
  y: number;
}

interface Marker {
  id: number;
  coordinates: Coordinate;
}

interface CursorCoordinatesProps {
  mousePosition: Coordinate;
  onMouseMove: (coordinate: Coordinate) => void;
}

interface ViewerContainerProps {
  children: ReactNode;
  isPanning: boolean;
  className?: string;
  onClick: () => void;
}

export type {
  ViewerImage,
  Coordinate,
  Marker,
  CursorCoordinatesProps,
  ViewerContainerProps,
};
