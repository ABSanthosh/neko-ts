# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`neko-ts` is a TypeScript library that renders an animated cat (neko) on a webpage that follows the user's mouse cursor. It is published to npm as a UMD + ESM dual-format package.

## Commands

```bash
yarn dev              # Vite dev server (for manual browser testing)
yarn build            # tsc + vite library build → dist/
yarn storybook        # Storybook dev server on :6006 (primary way to test the neko)
yarn build-storybook  # Build static Storybook → storybook-static/
yarn deploy           # Build Storybook and push to GitHub Pages via gh-pages
```

There are no test or lint scripts.

## Architecture

The library is intentionally minimal — essentially a single class.

**`src/Neko.ts`** — the entire implementation. Key internals:
- Constructor appends a `<div>` to the parent (defaults to `document.body`), sets `neko.gif` as its CSS background, and starts a `setInterval` loop at ~60ms ticks.
- The `frame()` method is the animation loop: it computes distance to the tracked cursor position and updates position + sprite frame on each tick.
- Sprite state is one of: 8 directional walk frames, idle (alert → scratching → sleeping), or a forced-sleep state that walks the neko back to `origin`.
- `wake()` / `sleep()` toggle the forced-sleep state. `destroy()` clears the interval and removes the DOM element. `setSize()` swaps CSS size class.
- Multiple neko instances are keyed by `nekoId` (a `data-neko` attribute); `destroy(id)` can target any instance by id.

**`src/index.ts`** — re-exports `Neko` and `NekoSizeVariations`.

**`src/neko.gif`** — the sprite sheet. Vite inlines it as a data URL in the library build.

**`stories/`** — Storybook stories using the `@storybook/html-vite` framework. `NekoDemo.ts` builds the interactive demo page with sleep/wake controls. This is how the library is visually tested during development.

## Build output

Vite is configured in library mode (`vite.config.ts`). Outputs:
- `dist/neko-ts.js` — ESM
- `dist/neko-ts.umd.cjs` — UMD
- `dist/index.d.ts` — types (via `vite-plugin-dts`)

`package.json` points `main` → UMD, `module` → ESM, `types` → `dist/index.d.ts`.

## NekoSizeVariations

```ts
enum NekoSizeVariations {
  SMALL = 32,
  MEDIUM = 38,
  LARGE = 42,
}
```

Size controls both the rendered element dimensions and the CSS `background-size` scale of the sprite sheet.
