export declare enum NekoSizeVariations {
    SMALL = 32,
    MEDIUM = 38,
    LARGE = 42
}
export default class Neko {
    /**
     * The size of the neko.
     *
     * @default NekoSizeVariations.SMALL
     * @readonly
     *
     * can be changed with setSize() method.
     */
    size: NekoSizeVariations;
    /**
     * Status of the neko. If it is awake or not.
     *
     * @default true
     * @readonly
     *
     * can be changed with wake() and sleep() methods.
     */
    isAwake: boolean;
    private nekoEl;
    private nekoId;
    private nekoPosX;
    private nekoPosY;
    private mousePosX;
    private mousePosY;
    private isReduced;
    private mouseMoveController;
    private touchController;
    private frameCount;
    private idleTime;
    private idleAnimation;
    private idleAnimationFrame;
    private nekoSpeed;
    private distanceFromMouse;
    private origin;
    private spriteSets;
    private maxNekoSpeed;
    private minNekoSpeed;
    private parent;
    constructor(options?: {
        /**
         * This is the id for this neko instance. It will be used in the data-neko attribute and id="neko-{nekoId}".
         * @default 0
         * @type {number}
         *
         * @example
         * const neko = new Neko({
         *  nekoId: 1,
         * });
         */
        nekoId?: number | null;
        /**
         * It will be used to set the width and height of the neko.
         * @default NekoSizeVariations.SMALL
         *
         * @type {NekoSizeVariations}
         *
         * @see NekoSizeVariations
         *
         * @example
         * const neko = new Neko({
         *    nekoSize: NekoSizeVariations.MEDIUM ,
         * });
         */
        nekoSize?: NekoSizeVariations | null;
        /**
         * It will be used to set the speed of the neko.
         *
         * @default 10
         *
         * @type {number}
         *
         * @see maxNekoSpeed = 20
         * @see minNekoSpeed = 10
         *
         * @example
         * const neko = new Neko({
         *   speed: 20,
         * });
         *
         */
        speed?: number | null;
        /**
         * It will be used to set the origin of the neko. When the neko is created, it will be placed at this position and when neko.sleep() is called, it will return to this position.
         *
         * @default { x: 0, y: 0 }
         *
         * @type {{ x: number, y: number }}
         *
         * @example
         * const neko = new Neko({
         *  origin: {
         *    x: 100,
         *    y: 100,
         *   },
         * });
         *
         * Or you can use an element as origin:
         * @example
         * const restingPlace = document.getElementById("restingPlace");
         * const neko = new Neko({
         *  origin: {
         *    x: restingPlace.offsetLeft + restingPlace.offsetWidth / 2,
         *    y: restingPlace.offsetTop + restingPlace.offsetHeight / 2,
         *  },
         * });
         */
        origin?: {
            x: number;
            y: number;
        };
        /**
         * It will be used to set the parent of the neko. The neko will be created inside this element and neko will listen to mousemove and touchmove events only inside this element.
         *
         * @default document.body
         *
         * @type {HTMLElement}
         *
         * @example
         * const nekoContainer = document.getElementById("nekoContainer");
         * const neko = new Neko({
         *    parent: nekoContainer,
         * });
         */
        parent?: HTMLElement;
        /**
         * It will be used to set the initial state of the neko. If it is set to "sleep", the neko will be created in sleep state and will not listen to mousemove and touchmove events.
         * @default "awake"
         * @type {"awake" | "sleep"}
         * @example
         * const neko = new Neko({
         *   defaultState: "sleep",
         * });
         */
        defaultState?: "awake" | "sleep";
    });
    private getOffset;
    private create;
    private setSprite;
    private resetIdleAnimation;
    private idle;
    private frame;
    /**
     * If id is not provided, it will try to destroy the neko associated with this instance.
     * @param {number} id
     * @returns {void}
     * @example
     * const neko = new Neko({
     *    nekoId: 1,
     * });
     *
     * neko.destroy();
     *
     */
    destroy(id?: number): void;
    /**
     * Put the neko to sleep. It will stop listening to mousemove and touchmove events and neko will return to its origin(+/- some random pixels).
     *
     * @returns {void}
     * @example
     * const neko = new Neko();
     *
     * neko.sleep();
     */
    sleep(): void;
    /**
     * Wake up the neko. It will start listening to mousemove and touchmove events.
     * @returns {void}
     * @example
     * const neko = new Neko();
     * neko.wake();
     */
    wake(): void;
    /**
     * Set the size of the neko.
     * @param {NekoSizeVariations} size
     * @returns {void}
     * @example
     * const neko = new Neko();
     * neko.setSize(NekoSizeVariations.MEDIUM);
     * neko.setSize(NekoSizeVariations.LARGE);
     * neko.setSize(NekoSizeVariations.SMALL);
     */
    setSize(size: NekoSizeVariations): void;
}
