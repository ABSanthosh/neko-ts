import type { BreedConfig } from "../types";
import { breedSpriteSets } from "../types";
import src from "./dog.png";

export const dog: BreedConfig = { src, spriteSets: breedSpriteSets, gap: 1, cols: 8, rows: 4 };
