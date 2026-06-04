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
export declare const gifSpriteSets: SpriteSets;
/** Sprite layout for the breed PNG sheets (8 cols × 4 rows, 1px gap) */
export declare const breedSpriteSets: SpriteSets;
