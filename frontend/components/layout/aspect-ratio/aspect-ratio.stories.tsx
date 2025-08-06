import type { Meta, StoryFn } from "@storybook/nextjs-vite";
import { AspectRatio } from "./aspect-ratio";

export default {
  title: "Layout/AspectRatio",
  component: AspectRatio,
  tags: ["autodocs"],
  parameters:{
    layout: "padded",
  },
  argTypes: {
    ratio: {
      control: {type: "number"},
      description: "宽高比，例如 16/9、4/3",
    },
    className: {
      control: {type: "text"},
      description: "额外的 Tailwind 类名",
    },
    children: {
      control: false,
      description: "要展示的媒体内容（图片或视频）",
    },
  },
  args: {
    ratio: 4 / 3,
  }
} as Meta<typeof AspectRatio>;

const Template: StoryFn<typeof AspectRatio> = (args) => <AspectRatio {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <img
      src="https://ce5f1919-25c0-40b5-a6d6-cc089742c7aa.mdnplay.dev/shared-assets/images/examples/grapefruit-slice.jpg"
      alt="Demo"
      className="rounded-lg"
    />
  ),
};

export const WithVideo = Template.bind({});
WithVideo.args = {
  ratio: 21 / 9,
  children: (
    <video
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      autoPlay
      muted
      loop
      className="rounded-lg"
    />
  ),
};

export const Square = Template.bind({});
Square.args = {
  ratio: 1,
  children: (
    <img
      src="https://ce5f1919-25c0-40b5-a6d6-cc089742c7aa.mdnplay.dev/shared-assets/images/examples/grapefruit-slice.jpg"
      alt="Kitten"
      className="rounded-full"
    />
  ),
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
  ratio: 2,
  className: "border-4 border-blue-500 shadow-xl",
  children: (
    <img
      src="https://ce5f1919-25c0-40b5-a6d6-cc089742c7aa.mdnplay.dev/shared-assets/images/examples/grapefruit-slice.jpg"
      alt="Styled Kitten"
      className="rounded-lg"
    />
  ),
};