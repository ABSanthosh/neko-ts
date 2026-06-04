export type SpriteSets = {
  idle: [number, number][];
  alert: [number, number][];
  tired: [number, number][];
  sleeping: [number, number][];
  scratchSelf: [number, number][];
  scratchWallN: [number, number][];
  scratchWallS: [number, number][];
  scratchWallE: [number, number][];
  scratchWallW: [number, number][];
  N: [number, number][];
  NE: [number, number][];
  E: [number, number][];
  SE: [number, number][];
  S: [number, number][];
  SW: [number, number][];
  W: [number, number][];
  NW: [number, number][];
};

export interface BreedConfig {
  src: string;
  spriteSets: SpriteSets;
  /** px gap between sprites in the sheet */
  gap: number;
  /** number of columns in the sprite sheet */
  cols: number;
  /** number of rows in the sprite sheet */
  rows: number;
}

/** Sprite layout for the default bundled neko.gif (8 cols × 4 rows, no gap) */
export const gifSpriteSets: SpriteSets = {
  idle: [[3, 3]],
  alert: [[7, 3]],
  scratchSelf: [
    [5, 0],
    [6, 0],
    [7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, 1],
  ],
  scratchWallS: [
    [7, 1],
    [6, 2],
  ],
  scratchWallE: [
    [2, 2],
    [2, 3],
  ],
  scratchWallW: [
    [4, 0],
    [4, 1],
  ],
  tired: [[3, 2]],
  sleeping: [
    [2, 0],
    [2, 1],
  ],
  N: [
    [1, 2],
    [1, 3],
  ],
  NE: [
    [0, 2],
    [0, 3],
  ],
  E: [
    [3, 0],
    [3, 1],
  ],
  SE: [
    [5, 1],
    [5, 2],
  ],
  S: [
    [6, 3],
    [7, 2],
  ],
  SW: [
    [5, 3],
    [6, 1],
  ],
  W: [
    [4, 2],
    [4, 3],
  ],
  NW: [
    [1, 0],
    [1, 1],
  ],
};

/** Sprite layout for the breed PNG sheets (8 cols × 4 rows, 1px gap) */
export const breedSpriteSets: SpriteSets = {
  idle: [[0, 0]],
  alert: [[7, 0]],
  scratchSelf: [
    [2, 0],
    [3, 0],
  ],
  scratchWallN: [
    [4, 3],
    [5, 3],
  ],
  scratchWallS: [
    [0, 3],
    [1, 3],
  ],
  scratchWallE: [
    [2, 3],
    [3, 3],
  ],
  scratchWallW: [
    [6, 3],
    [7, 3],
  ],
  tired: [[4, 0]],
  sleeping: [
    [5, 0],
    [6, 0],
  ],
  N: [
    [0, 2],
    [1, 2],
  ],
  NE: [
    [6, 1],
    [7, 1],
  ],
  E: [
    [4, 1],
    [5, 1],
  ],
  SE: [
    [2, 1],
    [3, 1],
  ],
  S: [
    [0, 1],
    [1, 1],
  ],
  SW: [
    [6, 2],
    [7, 2],
  ],
  W: [
    [4, 2],
    [5, 2],
  ],
  NW: [
    [2, 2],
    [3, 2],
  ],
};
