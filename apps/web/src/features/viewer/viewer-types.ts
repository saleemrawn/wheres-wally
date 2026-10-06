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

export type { ViewerImage, Coordinate, Marker };
