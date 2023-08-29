# neko-ts

[![install size](https://packagephobia.com/badge?p=neko-ts@0.0.5)](https://packagephobia.com/result?p=neko-ts@0.0.5)

A simple fun addition to your website, a neko that follows your mouse around! (or just sits there if you don't move your mouse)

## Installation

```bash
npm install neko-ts

yarn add neko-ts
```

## Usage

### Simple usage

```ts
import { Neko, NekoSizeVariations } from "neko-ts";

let neko: Neko | null = null;

document.addEventListener("DOMContentLoaded", () => {
  neko = new Neko();
});
```

### With options

```ts
import { Neko, NekoSizeVariations } from "neko-ts";

document.addEventListener("DOMContentLoaded", () => {
  neko = new Neko({
    nekoId: 1,
    nekoSize: NekoSizeVariations.SMALL,
    speed: 10,
    origin: {
      x: 500,
      y: 500,
    },
    parent: nekoContainer,
  });
});
```

### React

```tsx
import { Neko } from "neko-ts";

const neko = useRef<Neko>();

useEffect(() => {
  if (!neko.current) {
    neko.current = new Neko({
      origin: {
        x: 100,
        y: 100,
      },
    });
  }
  // React does not know when object properties change, so we have to manually force a re-render
}, [neko]);
```

## Options

| Option   | Type                   | Default                  | Description                                            |
| -------- | ---------------------- | ------------------------ | ------------------------------------------------------ |
| nekoId   | number                 | 0                        | The id of the neko you want to use. `data-neko="{id}"` |
| nekoSize | NekoSizeVariations     | NekoSizeVariations.SMALL | The size of the neko.                                  |
| speed    | number                 | 10                       | The speed of the neko.                                 |
| origin   | {x: number, y: number} | {x: 0, y: 0}             | The origin of the neko.                                |
| parent   | HTMLElement            | document.body            | The parent of the neko.                                |

## Methods and properties

| Method                            | Description                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------ |
| sleep()                           | Neko goes back to origin and stops following the cursor                        |
| wake()                            | Neko starts following the cursor again                                         |
| destroy(id?: number)              | Destroys the neko with the given id, or tries to destroy neko of that instance |
| setSize(size: NekoSizeVariations) | Sets the size of the neko.                                                     |
| size: NekoSizeVariations          | The size of the neko.                                                          |
| isAwake: boolean                  | Whether the neko is awake or not.                                              |

## Testing

Someone please test this in multiple frameworks. I know this works in Svelte, but I don't know about others.

- [x] Svelte
- [x] React
- [ ] Vue
- [ ] Angular
- and more...

## TODO

- [ ] why is the package size so big? [This](https://github.com/Nekos-life/nekos-dot-life#readme) package has 9 files and only 12.1kb while this has only 6 files and its 35.5kb

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Credits

I used these repos as a reference and made it type-safe.

- [oneko.js](https://github.com/adryd325/oneko.js/)
- [jneko](https://github.com/evert/jneko)
