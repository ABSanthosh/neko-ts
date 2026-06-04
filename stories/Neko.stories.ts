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

// ── DOM helpers ────────────────────────────────────────────────────────────────

function btn(text: string, onClick: () => void, disabled = false): HTMLButtonElement {
  const el = document.createElement("button");
  el.textContent = text;
  el.onclick = onClick;
  el.disabled = disabled;
  return el;
}

function row(...els: HTMLElement[]): HTMLDivElement {
  const d = document.createElement("div");
  d.className = "row";
  els.forEach((e) => d.appendChild(e));
  return d;
}

function app(...els: HTMLElement[]): HTMLDivElement {
  const d = document.createElement("div");
  d.id = "app";
  els.forEach((e) => d.appendChild(e));
  return d;
}

function desc(text: string): HTMLParagraphElement {
  const p = document.createElement("p");
  p.className = "story-desc";
  p.textContent = text;
  return p;
}

function code(text: string): HTMLElement {
  const el = document.createElement("code");
  el.className = "story-code";
  el.textContent = text;
  return el;
}

function pill(text: string): HTMLSpanElement {
  const el = document.createElement("span");
  el.className = "story-status";
  el.textContent = text;
  return el;
}

// ── Args type & breed map ──────────────────────────────────────────────────────

type NekoArgs = {
  nekoSize: "SMALL" | "MEDIUM" | "LARGE";
  speed: number;
  animationSpeed: number;
  defaultState: "awake" | "sleep";
  breed: string;
};

const breedEntries = Object.entries(breeds) as [string, BreedConfig][];
const breedByName = new Map<string, BreedConfig>(breedEntries);
const breedOptions = ["default (gif)", ...breedEntries.map(([name]) => name)];

// Persisted across renders so breed/size/speed changes hot-swap instead of recreate
let playgroundNeko: Neko | null = null;

// ── Meta ───────────────────────────────────────────────────────────────────────

const meta = {
  title: "Neko",
  parameters: { layout: "fullscreen" },
  argTypes: {
    nekoSize: {
      control: "select",
      options: ["SMALL", "MEDIUM", "LARGE"],
      description:
        "Size of the neko element. Maps to `NekoSizeVariations` (SMALL=32px, MEDIUM=38px, LARGE=42px).",
      table: { defaultValue: { summary: "SMALL" } },
    },
    speed: {
      control: { type: "range", min: 10, max: 20, step: 1 },
      description: "Pixels moved per animation frame. Clamped to [10, 20].",
      table: { defaultValue: { summary: "10" } },
    },
    animationSpeed: {
      name: "Frame delay (ms)",
      control: { type: "range", min: 16, max: 500, step: 10 },
      description:
        "Delay between sprite frame updates in ms — lower = faster animation. " +
        "e.g. 16ms ≈ 60fps, 100ms ≈ 10fps, 500ms ≈ 2fps.",
      table: { defaultValue: { summary: "100" } },
    },
    defaultState: {
      control: "radio",
      options: ["awake", "sleep"],
      description: "Initial state. `sleep` spawns neko at origin and waits for `wake()`.",
      table: { defaultValue: { summary: "awake" } },
    },
    breed: {
      control: "select",
      options: breedOptions,
      description: "Preset breed sprite sheet. Select `default (gif)` for the built-in neko.gif.",
      table: { defaultValue: { summary: "default (gif)" } },
    },
  },
  args: {
    nekoSize: "SMALL",
    speed: 10,
    animationSpeed: 100,
    defaultState: "awake",
    breed: "default (gif)",
  },
} satisfies Meta<NekoArgs>;

export default meta;

// ── Playground ─────────────────────────────────────────────────────────────────

export const Playground: StoryObj<NekoArgs> = {
  name: "Playground",
  tags: ["autodocs"],
  render: (args) => {
    const resolvedBreed = args.breed === "default (gif)" ? undefined : breedByName.get(args.breed);
    const resolvedSize = NekoSizeVariations[args.nekoSize];
    const isAlive = !!document.querySelector('[data-neko="1"]');

    if (playgroundNeko && isAlive) {
      // Hot-swap every property in place — neko keeps its current position
      playgroundNeko.setBreed(resolvedBreed);
      playgroundNeko.setSize(resolvedSize);
      playgroundNeko.setSpeed(args.speed);
      playgroundNeko.setAnimationSpeed(args.animationSpeed);
      if (args.defaultState === "sleep" && playgroundNeko.isAwake) playgroundNeko.sleep();
      if (args.defaultState === "awake" && !playgroundNeko.isAwake) playgroundNeko.wake();
    } else {
      nukeAll();
      playgroundNeko = new Neko({
        nekoId: 1,
        nekoSize: resolvedSize,
        speed: args.speed,
        animationSpeed: args.animationSpeed,
        defaultState: args.defaultState,
        origin: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        breed: resolvedBreed,
      });
    }

    const breedLine = args.breed === "default (gif)" ? "" : `\n  breed: breeds.${args.breed},`;

    const snippet = [
      `new Neko({`,
      `  nekoSize: NekoSizeVariations.${args.nekoSize},`,
      `  speed: ${args.speed},`,
      `  animationSpeed: ${args.animationSpeed},`,
      `  defaultState: "${args.defaultState}",`,
      `  origin: { x: window.innerWidth / 2, y: window.innerHeight / 2 },` + breedLine,
      `})`,
    ].join("\n");

    return app(
      desc(
        "Move your cursor to make the neko follow it. Adjust controls in the panel to see changes."
      ),
      code(snippet)
    );
  },
};

// ── SleepWake ──────────────────────────────────────────────────────────────────

export const SleepWake: StoryObj<NekoArgs> = {
  name: "State / Sleep & Wake Controls",
  args: {
    defaultState: "awake",
  },
  render: (args) => {
    nukeAll();

    const resolvedSize = NekoSizeVariations[args.nekoSize];

    const neko = new Neko({
      nekoId: 1,
      nekoSize: resolvedSize,
      speed: args.speed,
      animationSpeed: args.animationSpeed,
      defaultState: args.defaultState,
      origin: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    });

    const st = pill(neko.isAwake ? "awake" : "asleep");

    const sleepBtn = btn(
      "sleep()",
      () => {
        neko.sleep();
        st.textContent = "asleep";
        sleepBtn.disabled = true;
        wakeBtn.disabled = false;
      },
      !neko.isAwake
    );

    const wakeBtn = btn(
      "wake()",
      () => {
        neko.wake();
        st.textContent = "awake";
        wakeBtn.disabled = true;
        sleepBtn.disabled = false;
      },
      neko.isAwake
    );

    return app(
      desc("sleep() stops cursor tracking and idles the neko in place. wake() resumes it."),
      row(sleepBtn, wakeBtn),
      row(code("neko.isAwake: "), st)
    );
  },
};

// ── DestroyDemo ────────────────────────────────────────────────────────────────

export const DestroyDemo: StoryObj<NekoArgs> = {
  name: "State / Destroy & Recreate",
  render: (args) => {
    nukeAll();

    const resolvedSize = NekoSizeVariations[args.nekoSize];
    const resolvedBreed = args.breed === "default (gif)" ? undefined : breedByName.get(args.breed);

    let neko: Neko | null = new Neko({
      nekoId: 1,
      nekoSize: resolvedSize,
      speed: args.speed,
      animationSpeed: args.animationSpeed,
      breed: resolvedBreed,
    });

    const st = pill("alive");

    const destroyBtn = btn("destroy()", () => {
      neko?.destroy();
      neko = null;
      st.textContent = "destroyed";
      destroyBtn.disabled = true;
      recreateBtn.disabled = false;
    });

    const recreateBtn = btn(
      "Recreate",
      () => {
        nukeAll();
        neko = new Neko({
          nekoId: 1,
          nekoSize: resolvedSize,
          speed: args.speed,
          animationSpeed: args.animationSpeed,
          breed: resolvedBreed,
        });
        st.textContent = "alive";
        destroyBtn.disabled = false;
        recreateBtn.disabled = true;
      },
      true
    );

    return app(
      desc(
        "destroy() removes the neko from the DOM and clears its animation interval. Recreate spawns a fresh instance."
      ),
      row(destroyBtn, recreateBtn),
      row(code("status: "), st)
    );
  },
};

// ── CustomParent ───────────────────────────────────────────────────────────────

export const CustomParent: StoryObj = {
  name: "Parent / Custom Container",
  parameters: { controls: { disable: true } },
  render: () => {
    nukeAll();

    const container = document.createElement("div");
    container.id = "nekoContainer";

    // setTimeout(0) fires after Storybook finishes inserting the element,
    // so getBoundingClientRect() returns the final layout position.
    setTimeout(() => {
      if (!document.body.contains(container)) return;
      const rect = container.getBoundingClientRect();
      new Neko({
        nekoId: 1,
        parent: container,
        origin: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
      });
    }, 0);

    return app(
      desc(
        "parent restricts mouse-event tracking to the container. " +
          "The neko uses position:fixed so it can still move across the full viewport — " +
          "it just won't react to the cursor outside the blue box."
      ),
      container,
      code("new Neko({ parent: containerEl })")
    );
  },
};

// ── CustomOrigin ───────────────────────────────────────────────────────────────

export const CustomOrigin: StoryObj = {
  name: "Parent / Custom Origin",
  parameters: { controls: { disable: true } },
  render: () => {
    nukeAll();

    const restingPlace = document.createElement("div");
    restingPlace.id = "restingPlace";

    const container = document.createElement("div");
    container.id = "nekoContainer";
    container.appendChild(restingPlace);

    const controls = row();

    setTimeout(() => {
      if (!document.body.contains(restingPlace)) return;
      const rect = restingPlace.getBoundingClientRect();
      const neko = new Neko({
        nekoId: 1,
        parent: container,
        origin: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 },
      });

      const sleepBtn = btn("sleep()", () => {
        neko.sleep();
        sleepBtn.disabled = true;
        wakeBtn.disabled = false;
      });

      const wakeBtn = btn(
        "wake()",
        () => {
          neko.wake();
          wakeBtn.disabled = true;
          sleepBtn.disabled = false;
        },
        true
      );

      controls.appendChild(sleepBtn);
      controls.appendChild(wakeBtn);
    }, 0);

    return app(
      desc(
        "The brown square marks the spawn origin. sleep() idles the neko in place; wake() resumes cursor tracking."
      ),
      container,
      controls,
      code("new Neko({ origin: { x, y } })")
    );
  },
};
