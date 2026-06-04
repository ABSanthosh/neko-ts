import type { Meta, StoryObj } from "@storybook/html-vite";
import { Neko, NekoSizeVariations } from "../dist/neko-ts";
import type { BreedConfig } from "../dist/neko-ts";
import * as breeds from "../dist/breeds";
import "./storyStyle.css";

// ── Cleanup ────────────────────────────────────────────────────────────────────

function nukeAll() {
  document.querySelectorAll("[data-neko]").forEach((el) => el.remove());
  clearInterval((window as any).nekoInterval);
}

// ── Data ───────────────────────────────────────────────────────────────────────

const ALL_BREEDS = Object.entries(breeds) as [string, BreedConfig][];

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta = {
  title: "Neko/Breeds",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;

// ── BreedPicker ────────────────────────────────────────────────────────────────

let activeNeko: Neko | null = null;
let activeBtn: HTMLButtonElement | null = null;

export const BreedPicker: StoryObj = {
  name: "Breed Picker",
  parameters: { controls: { disable: true } },
  render: () => {
    nukeAll();
    activeNeko = null;

    const root = document.createElement("div");
    root.id = "app";

    const heading = document.createElement("p");
    heading.className = "story-desc";
    heading.textContent =
      "Click a breed to swap it in. All 35 presets are imported from neko-ts/breeds.";

    const importLine = document.createElement("code");
    importLine.className = "story-code";
    importLine.textContent = `import { _____ } from 'neko-ts/breeds'`;

    const grid = document.createElement("div");
    grid.className = "breed-grid";

    function spawn(name: string, breed: BreedConfig, clickedBtn: HTMLButtonElement) {
      if (activeNeko) {
        activeNeko.setBreed(breed);
      } else {
        nukeAll();
        activeNeko = new Neko({ nekoId: 1, breed, nekoSize: NekoSizeVariations.MEDIUM });
      }
      importLine.textContent = `import { ${name} } from 'neko-ts/breeds'`;
      if (activeBtn) activeBtn.classList.remove("active");
      activeBtn = clickedBtn;
      clickedBtn.classList.add("active");
    }

    ALL_BREEDS.forEach(([name, breed]) => {
      const b = document.createElement("button");
      b.textContent = name;
      b.className = "breed-btn";
      b.onclick = () => spawn(name, breed, b);
      grid.appendChild(b);
    });

    root.appendChild(heading);
    root.appendChild(importLine);
    root.appendChild(grid);

    // Spawn the first breed on initial render
    const [firstName, firstBreed] = ALL_BREEDS[0];
    const firstBtn = grid.firstElementChild as HTMLButtonElement;
    spawn(firstName, firstBreed, firstBtn);

    return root;
  },
};

// ── CustomBreed ────────────────────────────────────────────────────────────────

export const CustomBreed: StoryObj = {
  name: "Custom Breed (breedSpriteSets)",
  parameters: { controls: { disable: true } },
  render: () => {
    nukeAll();

    // Marmalade as a live example of a custom-supplied BreedConfig
    new Neko({ nekoId: 1, breed: breeds.marmalade, nekoSize: NekoSizeVariations.MEDIUM });

    const root = document.createElement("div");
    root.id = "app";

    const descEl = document.createElement("p");
    descEl.className = "story-desc";
    descEl.textContent =
      "You can supply your own sprite sheet via BreedConfig. " +
      "Use breedSpriteSets for a PNG sheet with 8 cols × 6 rows and 1 px gaps, " +
      "or gifSpriteSets for the bundled neko.gif layout (8 cols × 4 rows, no gap). " +
      "The marmalade breed is running live above as a reference.";

    const snippet = document.createElement("pre");
    snippet.className = "story-code story-pre";
    snippet.textContent = [
      `import { breedSpriteSets } from 'neko-ts';`,
      ``,
      `const myBreed: BreedConfig = {`,
      `  src: '/my-cat.png',`,
      `  spriteSets: breedSpriteSets,`,
      `  gap: 1,`,
      `  cols: 8,`,
      `  rows: 6,`,
      `};`,
      ``,
      `new Neko({ breed: myBreed });`,
    ].join("\n");

    root.appendChild(descEl);
    root.appendChild(snippet);
    return root;
  },
};
