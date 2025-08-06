import { Meta, StoryFn } from "@storybook/nextjs-vite";
import { ThemeToggle } from "./theme-toggle";
import React from "react";
import { within, userEvent, expect } from "@storybook/test";


export default {
  title: "Components/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  parameters: {
    __removeThemeToggle: true,
  },
  argTypes: {
    className: {
      control: "text",
      description: "外层容器的 Tailwind 类名",
    },
  },
} as Meta<typeof ThemeToggle>;

const Template: StoryFn<typeof ThemeToggle> = (args) => <ThemeToggle  {...args}/>;

export const Default = Template.bind({});
Default.play = async ({canvasElement}) => {
  const canvas = within(canvasElement);
  const button = canvas.getByRole("button");

  // Simulate clicks to trigger theme cycle
  await userEvent.click(button); // system → dark
  await expect(canvas.getByRole("button").getAttribute("name")).toBe("theme-dark");
  await userEvent.click(button); // dark → light
  await expect(canvas.getByRole("button").getAttribute("name")).toBe("theme-light");
  await userEvent.click(button); // light → system
  await expect(canvas.getByRole("button").getAttribute("name")).toBe("theme-system");
};


export const PositionedTopLeft = Template.bind({});
PositionedTopLeft.args = {
  className: "absolute top-4 left-4",
};
