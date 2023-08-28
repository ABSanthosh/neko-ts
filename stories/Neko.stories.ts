import type { Meta, StoryObj } from "@storybook/html";
import { RenderPage } from "./NekoDemo";

const meta = {
  title: "Neko/NekoDemo",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;

export const BaseDemo: StoryObj = {
  render: () => RenderPage(),
};
