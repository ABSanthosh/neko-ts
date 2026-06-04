import NekoGif from "./neko.gif";
import { gifSpriteSets } from "./types";
import type { BreedConfig } from "./types";

export enum NekoSizeVariations {
  SMALL = 32,
  MEDIUM = 38,
  LARGE = 42,
}

enum NekoOffset {
  SMALL = 3,
  MEDIUM = -2,
  LARGE = -6,
}

const defaultBreed: BreedConfig = {
  src: NekoGif,
  spriteSets: gifSpriteSets,
  gap: 0,
  cols: 8,
  rows: 4,
};

export default class Neko {
  /**
   * The size of the neko.
   *
   * @default NekoSizeVariations.SMALL
   * @readonly
   *
   * can be changed with setSize() method.
   */
  public size: NekoSizeVariations = NekoSizeVariations.SMALL;

  /**
   * Status of the neko. If it is awake or not.
   *
   * @default true
   * @readonly
   *
   * can be changed with wake() and sleep() methods.
   */
  public isAwake: boolean = true;

  private nekoEl: HTMLDivElement | undefined;
  private nekoId: number = 0;
  private nekoPosX: number = this.size / 2;
  private nekoPosY: number = this.size / 2;
  private mousePosX: number = this.size / 2;
  private mousePosY: number = this.size / 2;
  private isReduced: boolean = window.matchMedia(
    `(prefers-reduced-motion: reduce)`
  ).matches;
  private mouseMoveController = new AbortController();
  private touchController = new AbortController();

  private frameCount: number = 0;
  private idleTime: number = 0;
  private idleAnimation: string | null = null;
  private idleAnimationFrame: number = 0;
  private nekoSpeed: number = 10;
  private animationSpeed: number = 100;
  private breed: BreedConfig = defaultBreed;

  private distanceFromMouse: number = 25;

  private origin = {
    x: 0,
    y: 0,
  };

  private maxNekoSpeed: number = 20;
  private minNekoSpeed: number = 10;

  private parent: HTMLElement = document.body;

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
    /**
     * The animation speed of neko (refresh rate in ms)
     * @default 100
     * @type {number}
     * @example
     * const neko = new Neko({
     *   animationSpeed: 100,
     * });
     */
    animationSpeed?: number;
    /**
     * Preset breed or custom image config. Import presets from `neko-ts/breeds`.
     * For a custom image pass `{ src, spriteSets, gap, cols, rows }`.
     * Use `gifSpriteSets` or `breedSpriteSets` from `neko-ts` as the spriteSets value,
     * or supply your own complete layout.
     * @example
     * import { tabby } from "neko-ts/breeds";
     * new Neko({ breed: tabby });
     *
     * @example
     * import { breedSpriteSets } from "neko-ts";
     * new Neko({ breed: { src: "/my-cat.png", spriteSets: breedSpriteSets, gap: 1, cols: 8, rows: 6 } });
     */
    breed?: BreedConfig;
  }) {
    // get element with attribute data-neko
    const isNekoAlive = document.querySelector("[data-neko]") as HTMLDivElement;
    if (this.isReduced || isNekoAlive) {
      return;
    }

    if (options && options.speed) {
      this.nekoSpeed =
        options.speed > this.maxNekoSpeed
          ? this.maxNekoSpeed
          : options.speed < this.minNekoSpeed
          ? this.minNekoSpeed
          : options.speed;
    }

    if (options && options.origin) {
      this.nekoPosX = options.origin.x;
      this.nekoPosY = options.origin.y + this.getOffset(this.size);
      this.mousePosX = this.nekoPosX;
      this.mousePosY = this.nekoPosY;

      this.origin.x = options.origin.x;
      this.origin.y = options.origin.y;
    }

    if (options && options.parent) {
      this.parent = options.parent;
    }

    if (options && options.defaultState === "sleep") {
      this.isAwake = false;
    }

    this.size =
      options && options.nekoSize ? options.nekoSize : NekoSizeVariations.SMALL;
    this.nekoId = options && options.nekoId ? options.nekoId : this.nekoId;

    if (options && options.animationSpeed !== undefined) {
      this.animationSpeed = Math.max(16, options.animationSpeed);
    }

    if (options && options.breed) {
      this.breed = options.breed;
    }

    this.create();
  }

  private getOffset(size: NekoSizeVariations) {
    switch (size) {
      case NekoSizeVariations.SMALL:
        return NekoOffset.SMALL;
      case NekoSizeVariations.MEDIUM:
        return NekoOffset.MEDIUM;
      case NekoSizeVariations.LARGE:
        return NekoOffset.LARGE;
    }
  }

  private create() {
    this.nekoEl = document.createElement("div");
    this.nekoEl.dataset.neko = `${this.nekoId}`;
    this.nekoEl.id = `neko-${this.nekoId}`;
    this.nekoEl.style.width = `${this.size}px`;
    this.nekoEl.style.height = `${this.size}px`;
    this.nekoEl.style.left = `${this.nekoPosX - this.size / 2}px`;
    this.nekoEl.style.top = `${this.nekoPosY - this.size / 2}px`;

    this.nekoEl.style.position = "fixed";
    this.nekoEl.style.imageRendering = "pixelated";
    this.nekoEl.style.backgroundImage = `url(${this.breed.src})`;
    // compute sheet dimensions: cols/rows × sprite size + (cols/rows - 1) × gap
    const { cols, rows, gap } = this.breed;
    const sheetW = cols * this.size + (cols - 1) * gap;
    const sheetH = rows * this.size + (rows - 1) * gap;
    this.nekoEl.style.backgroundSize = `${sheetW}px ${sheetH}px`;
    this.nekoEl.style.userSelect = "none";
    this.nekoEl.style.pointerEvents = "none";
    this.nekoEl.style.zIndex = "5";

    this.parent.appendChild(this.nekoEl);
    (window as any).nekoInterval = setInterval(this.frame.bind(this), this.animationSpeed);

    if (!this.isAwake) {
      this.idle();
      return;
    }

    this.parent.addEventListener(
      "mousemove",
      (event: MouseEvent) => {
        this.mousePosX = event.clientX;
        this.mousePosY = event.clientY;
      },
      { signal: this.mouseMoveController.signal }
    );
    this.parent.addEventListener(
      "touchmove",
      (event: TouchEvent) => {
        this.mousePosX = event.touches[0].clientX;
        this.mousePosY = event.touches[0].clientY;
      },
      { signal: this.touchController.signal }
    );
  }

  private setSprite(name: string, frame: number) {
    const { spriteSets, gap } = this.breed;
    const frames = spriteSets[name as keyof typeof spriteSets];
    if (!frames) return;
    const sprite = frames[frame % frames.length];
    const cellSize = this.size + gap;
    this.nekoEl!.style.backgroundPosition = `${-sprite[0] * cellSize}px ${-sprite[1] * cellSize}px`;
  }

  private resetIdleAnimation() {
    this.idleAnimation = null;
    this.idleAnimationFrame = 0;
  }

  private idle() {
    this.idleTime += 1;

    // every ~20 seconds
    if (
      this.idleTime > 5 &&
      Math.floor(Math.random() * 100) == 0 &&
      this.idleAnimation == null
    ) {
      let availableIdleAnimations = ["sleeping", "scratchSelf"];
      if (this.nekoPosX < 32) {
        availableIdleAnimations.push("scratchWallW");
      }
      if (this.nekoPosY < 32) {
        availableIdleAnimations.push("scratchWallN");
      }
      if (this.nekoPosX > window.innerWidth - 32) {
        availableIdleAnimations.push("scratchWallE");
      }
      if (this.nekoPosY > window.innerHeight - 32) {
        availableIdleAnimations.push("scratchWallS");
      }
      this.idleAnimation =
        availableIdleAnimations[
          Math.floor(Math.random() * availableIdleAnimations.length)
        ];
    }

    switch (this.idleAnimation) {
      case "sleeping":
        if (this.idleAnimationFrame < 8) {
          this.setSprite("tired", 0);
          break;
        }
        this.setSprite("sleeping", Math.floor(this.idleAnimationFrame / 4));
        if (this.idleAnimationFrame > 192) {
          this.resetIdleAnimation();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        this.setSprite(this.idleAnimation, this.idleAnimationFrame);
        if (this.idleAnimationFrame > 9) {
          this.resetIdleAnimation();
        }
        break;
      default:
        this.setSprite("idle", 0);
        return;
    }
    this.idleAnimationFrame += 1;
  }

  private frame() {
    this.frameCount += 1;
    const diffX = this.nekoPosX - this.mousePosX;
    const diffY = this.nekoPosY - this.mousePosY;
    const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

    if (distance < this.nekoSpeed || distance < this.distanceFromMouse) {
      this.idle();
      return;
    }

    this.idleAnimation = null;
    this.idleAnimationFrame = 0;

    if (this.idleTime > 1) {
      this.setSprite("alert", 0);
      // count down after being alerted before moving
      this.idleTime = Math.min(this.idleTime, 7);
      this.idleTime -= 1;
      return;
    }

    let direction;
    direction = diffY / distance > 0.5 ? "N" : "";
    direction += diffY / distance < -0.5 ? "S" : "";
    direction += diffX / distance > 0.5 ? "W" : "";
    direction += diffX / distance < -0.5 ? "E" : "";
    this.setSprite(direction, this.frameCount);

    this.nekoPosX -= (diffX / distance) * this.nekoSpeed;
    this.nekoPosY -= (diffY / distance) * this.nekoSpeed;

    this.nekoPosX = Math.min(
      Math.max(this.size / 2, this.nekoPosX),
      window.innerWidth - this.size / 2
    );
    this.nekoPosY = Math.min(
      Math.max(this.size / 2, this.nekoPosY),
      window.innerHeight - this.size / 2
    );

    this.nekoEl!.style.left = `${this.nekoPosX - this.size / 2}px`;
    this.nekoEl!.style.top = `${this.nekoPosY - this.size / 2}px`;
  }

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
  public destroy(id?: number) {
    if (id && id !== this.nekoId) return;
    else {
      const neko = document.querySelector(`[data-neko="${this.nekoId}"]`);
      if (neko) {
        neko.remove();
        clearInterval((window as any).nekoInterval);
        this.nekoEl!.remove();
      }
    }
  }

  /**
   * Put the neko to sleep. It will stop listening to mousemove and touchmove events and idle in place.
   *
   * @returns {void}
   * @example
   * const neko = new Neko();
   *
   * neko.sleep();
   */
  public sleep() {
    if (!this.isAwake) return;

    this.mouseMoveController.abort();
    this.touchController.abort();

    this.mousePosX = this.nekoPosX;
    this.mousePosY = this.nekoPosY;

    this.isAwake = false;
  }

  /**
   * Wake up the neko. It will start listening to mousemove and touchmove events.
   * @returns {void}
   * @example
   * const neko = new Neko();
   * neko.wake();
   */
  public wake() {
    if (this.isAwake) return;

    this.mouseMoveController = new AbortController();
    this.touchController = new AbortController();

    this.parent.addEventListener(
      "mousemove",
      (event: MouseEvent) => {
        this.mousePosX = event.clientX;
        this.mousePosY = event.clientY;
      },
      { signal: this.mouseMoveController.signal }
    );
    this.parent.addEventListener(
      "touchmove",
      (event: TouchEvent) => {
        this.mousePosX = event.touches[0].clientX;
        this.mousePosY = event.touches[0].clientY;
      },
      { signal: this.touchController.signal }
    );

    this.isAwake = true;
  }

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
  public setSize(size: NekoSizeVariations) {
    this.size = size;
    this.nekoEl!.style.width = `${this.size}px`;
    this.nekoEl!.style.height = `${this.size}px`;
    const { cols, rows, gap } = this.breed;
    const sheetW = cols * this.size + (cols - 1) * gap;
    const sheetH = rows * this.size + (rows - 1) * gap;
    this.nekoEl!.style.backgroundSize = `${sheetW}px ${sheetH}px`;
  }

  /**
   * Hot-swap the sprite sheet without recreating the neko.
   * The current animation state is preserved; the new spriteSets take effect on the next frame.
   * Pass `undefined` to reset to the built-in neko.gif.
   */
  public setBreed(breed?: BreedConfig) {
    this.breed = breed ?? defaultBreed;
    this.nekoEl!.style.backgroundImage = `url(${this.breed.src})`;
    const { cols, rows, gap } = this.breed;
    const sheetW = cols * this.size + (cols - 1) * gap;
    const sheetH = rows * this.size + (rows - 1) * gap;
    this.nekoEl!.style.backgroundSize = `${sheetW}px ${sheetH}px`;
  }

  /** Update movement speed. Clamped to [10, 20]. */
  public setSpeed(speed: number) {
    this.nekoSpeed = Math.max(
      this.minNekoSpeed,
      Math.min(this.maxNekoSpeed, speed)
    );
  }

  /** Update the frame refresh rate in ms (minimum 16). Resets the interval. */
  public setAnimationSpeed(ms: number) {
    this.animationSpeed = Math.max(16, ms);
    clearInterval((window as any).nekoInterval);
    (window as any).nekoInterval = setInterval(
      this.frame.bind(this),
      this.animationSpeed
    );
  }

  /** Current viewport position of the neko center. */
  public get position(): { x: number; y: number } {
    return { x: this.nekoPosX, y: this.nekoPosY };
  }
}
