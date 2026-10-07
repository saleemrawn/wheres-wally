import type { ReactNode, Ref } from "react";
import type { ReactZoomPanPinchContentRef } from "react-zoom-pan-pinch";
import type { VIEWER_ASSETS } from "./viewer-assets";

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

interface ViewerProps {
  token: string;
  ref: Ref<ReactZoomPanPinchContentRef>;
  markers: Marker[];
  onClick: (coordinate: Coordinate) => void;
}

type ViewerAssetKey = keyof typeof VIEWER_ASSETS;

export type {
  ViewerImage,
  Coordinate,
  Marker,
  CursorCoordinatesProps,
  ViewerContainerProps,
  ViewerProps,
  ViewerAssetKey,
};
