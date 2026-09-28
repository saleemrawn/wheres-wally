interface Character {
  id: number;
  name: string;
  imageToken: string;
}

interface ValidateParams {
  coordinates: { x: number; y: number };
  characterId: number;
  illustrationId: number;
}

export type { Character, ValidateParams };
