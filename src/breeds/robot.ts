import type { BreedConfig } from "../types";
import { breedSpriteSets } from "../types";
import src from "./robot.png";

export const robot: BreedConfig = { src, spriteSets: breedSpriteSets, gap: 1, cols: 8, rows: 4 };
