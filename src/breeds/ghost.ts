import type { BreedConfig } from "../types";
import { breedSpriteSets } from "../types";
import src from "./ghost.png";

export const ghost: BreedConfig = { src, spriteSets: breedSpriteSets, gap: 1, cols: 8, rows: 4 };
