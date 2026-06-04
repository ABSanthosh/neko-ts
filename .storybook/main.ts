import type { StorybookConfig } from "@storybook/html-vite";

const config: StorybookConfig = {
  stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
  ],
  framework: {
    name: "@storybook/html-vite",
    options: {},
  },
};
export default config;
