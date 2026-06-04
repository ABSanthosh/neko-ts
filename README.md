# neko-ts

[![install size](https://packagephobia.com/badge?p=neko-ts@0.0.6)](https://packagephobia.com/result?p=neko-ts@0.0.6)

A simple fun addition to your website, a neko that follows your mouse around! (or just sits there if you don't move your mouse)

### Check out the demo [here](https://absanthosh.github.io/neko-ts/?path=/story/neko-nekodemo--base-demo)

## Installation

```bash
npm install neko-ts

yarn add neko-ts
```

## Usage

### Simple usage

```ts
import { Neko } from "neko-ts";

document.addEventListener("DOMContentLoaded", () => {
  new Neko();
});
```

### With all options

```ts
import { Neko, NekoSizeVariations } from "neko-ts";
import { tabby } from "neko-ts/breeds";

document.addEventListener("DOMContentLoaded", () => {
  const neko = new Neko({
    nekoId: 1,
    nekoSize: NekoSizeVariations.MEDIUM,
    speed: 10,
    animationSpeed: 100,
    defaultState: "awake",
    origin: { x: 500, y: 500 },
    parent: document.getElementById("app")!,
    breed: tabby,
  });
});
```

### Using a preset breed

```ts
import { Neko } from "neko-ts";
import { marmalade } from "neko-ts/breeds";

const neko = new Neko({ breed: marmalade });
```

### Custom breed (own sprite sheet)

```ts
import { Neko, breedSpriteSets } from "neko-ts";
import type { BreedConfig } from "neko-ts";

const myBreed: BreedConfig = {
  src: "/my-cat.png",
  spriteSets: breedSpriteSets,
  gap: 1,
  cols: 8,
  rows: 4,
};

const neko = new Neko({ breed: myBreed });
```

### Hot-swapping breed at runtime

```ts
neko.setBreed(marmalade);   // swap to a preset
neko.setBreed(undefined);   // reset to built-in neko.gif
```

### React

```tsx
import { Neko } from "neko-ts";
import { tabby } from "neko-ts/breeds";
import { useEffect, useRef } from "react";

function App() {
  const neko = useRef<Neko>();

  useEffect(() => {
    if (!neko.current) {
      neko.current = new Neko({
        breed: tabby,
        origin: { x: 100, y: 100 },
      });
    }
    return () => neko.current?.destroy();
  }, []);
}
```

## Options

| Option | Type | Default | Description |
|---|---|---|---|
| nekoId | number | 0 | Used as `data-neko` attribute and `id="neko-{nekoId}"` |
| nekoSize | NekoSizeVariations | NekoSizeVariations.SMALL | Rendered size (32/38/42px) |
| speed | number | 10 | Pixels moved per animation frame. Clamped to [10, 20]. |
| animationSpeed | number | 100 | Frame refresh interval in ms (min 16ms ≈ 60fps). |
| origin | {x: number, y: number} | {x: 0, y: 0} | Spawn position and sleep return position. |
| parent | HTMLElement | document.body | Parent element; restricts cursor event tracking to this element. |
| defaultState | "awake" \| "sleep" | "awake" | Initial state. |
| breed | BreedConfig | built-in neko.gif | Preset or custom sprite sheet config. Import presets from `neko-ts/breeds`. |

## NekoSizeVariations

```ts
enum NekoSizeVariations {
  SMALL = 32,
  MEDIUM = 38,
  LARGE = 42,
}
```

## Methods and properties

| Method/Property | Description |
|---|---|
| `sleep()` | Stops cursor tracking; neko idles in place |
| `wake()` | Resumes cursor tracking |
| `destroy(id?: number)` | Removes neko from DOM and clears its interval. Targets instance's id if none provided. |
| `setSize(size: NekoSizeVariations)` | Hot-swap size without recreating neko |
| `setBreed(breed?: BreedConfig)` | Hot-swap sprite sheet. Pass `undefined` to reset to built-in neko.gif |
| `setSpeed(speed: number)` | Update movement speed. Clamped to [10, 20]. |
| `setAnimationSpeed(ms: number)` | Update frame refresh rate in ms. Resets the interval. Min 16ms. |
| `size: NekoSizeVariations` | Current size (read) |
| `isAwake: boolean` | Whether neko is awake (read) |
| `position: {x: number, y: number}` | Current viewport position of the neko center (read) |

## Breeds

Import any of the 35 built-in breeds from `neko-ts/breeds`:

```ts
import { tabby, marmalade, calico /* ... */ } from "neko-ts/breeds";
```

Available breeds: `ace`, `air`, `black`, `blue`, `calico`, `colourful`, `dave`, `dog`, `earth`, `fancy`, `fire`, `ghetto`, `ghost`, `jess`, `lucky`, `lucy`, `marmalade`, `mermaid`, `mike`, `moka`, `neko`, `neon`, `orange`, `peach`, `pink`, `rainbow`, `robot`, `royal`, `silversky`, `socks`, `spirit`, `tabby`, `usa`, `valentine`, `water`

Each breed is a `BreedConfig` object that can be passed directly to the `breed` option or to `setBreed()`.

## Sprite sheet constants

| Export | Description |
|---|---|
| `gifSpriteSets` | Sprite layout for the built-in neko.gif (8 cols × 4 rows, no gap) |
| `breedSpriteSets` | Sprite layout for the breed PNG sheets (8 cols × 4 rows, 1px gap) |

Use these constants when defining a custom `BreedConfig`.

## Testing

Someone please test this in multiple frameworks. I know this works in Svelte, but I don't know about others.

- [x] Svelte
- [x] React
- [ ] Vue
- [ ] Angular
- and more...

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Credits

I used these repos as a reference and made it type-safe.

- [oneko.js](https://github.com/adryd325/oneko.js/)
- [jneko](https://github.com/evert/jneko)
