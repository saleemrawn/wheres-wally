import type { CHARACTER_ASSETS } from "./character-assets";

type CharacterAssetKey = keyof typeof CHARACTER_ASSETS;

interface Character {
  id: number;
  name: string;
  imageToken: CharacterAssetKey;
}

interface ValidateParams {
  coordinates: { x: number; y: number };
  characterId: number;
  illustrationId: number;
}

export type { Character, ValidateParams };
