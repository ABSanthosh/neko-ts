import { readdirSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const breedsDir = resolve(__dirname, "src/breeds");
const breedEntries = Object.fromEntries(
  readdirSync(breedsDir)
    .filter((f) => f.endsWith(".ts") && f !== "index.ts")
    .map((f) => [`breeds/${f.slice(0, -3)}`, resolve(breedsDir, f)])
);

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      entry: {
        "neko-ts": resolve(__dirname, "src/index.ts"),
        "breeds/index": resolve(__dirname, "src/breeds/index.ts"),
        ...breedEntries,
      },
      name: "neko-ts",
      formats: ["es", "cjs"],
      fileName: (format, entryName) =>
        format === "cjs" ? `${entryName}.cjs` : `${entryName}.js`,
    },
    minify: "terser",
  },
  plugins: [dts()],
});
