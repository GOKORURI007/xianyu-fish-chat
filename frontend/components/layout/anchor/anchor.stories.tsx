import type { Meta, StoryFn } from "@storybook/nextjs-vite";
import { Anchor } from "./anchor";
import React from "react";

export default {
  title: "Layout/Float",
  component: Anchor,
  tags: ["autodocs"],
  parameters: {},
  argTypes: {
    placement: {
      control: {type: "select"},
      options: [
        "top-start",
        "top-center",
        "top-end",
        "middle-start",
        "middle-center",
        "middle-end",
        "bottom-start",
        "bottom-center",
        "bottom-end",
      ],
      description: "浮动元素的位置",
    },
    className: {
      control: {type: "text"},
      description: "额外的Tailwind类名",
    },
    children: {
      control: false,
      description: "子元素",
    },
  },
  args: {
    placement: "top-end",
  },
} as Meta<typeof Anchor>;

// 创建一个示例容器
const Container = ({children}: { children: React.ReactNode }) => (
  <div
    className="relative w-64 h-64 border border-chart-1 rounded-md flex items-center justify-center">
    <div className="p-4"> 主要内容</div>
    {children}
  </div>
);

// 创建一个示例浮动元素
const FloatItem = ({children, className = ""}: {
  children: React.ReactNode;
  className?: string
}) => (
  <div className={`p-2 border rounded-md border-chart-2 ${className}`}>
    {children}
  </div>
);

const Template: StoryFn<typeof Anchor> = (args) => (
  <Container>
    <Anchor {...args}>
      {args.children || <FloatItem> 浮动元素 </FloatItem>}
    </Anchor>
  </Container>
);

export const Default = Template.bind({});
Default.args = {};

export const TopStart = Template.bind({});
TopStart.args = {
  placement: "top-start",
};

export const TopCenter = Template.bind({});
TopCenter.args = {
  placement: "top-center",
};

export const MiddleCenter = Template.bind({});
MiddleCenter.args = {
  placement: "middle-center",
};

export const BottomEnd = Template.bind({});
BottomEnd.args = {
  placement: "bottom-end",
};

export const MultipleFloats = () => (
  <Container>
    <Anchor placement="top-start">
      <FloatItem className="border-chart-1"> 左上 </FloatItem>
    </Anchor>
    <Anchor placement="top-end" className="translate-x-1/2">
      <FloatItem className="border-chart-2"> 右上 </FloatItem>
    </Anchor>
    <Anchor placement="bottom-start">
      <FloatItem className="border-chart-3"> 左下 </FloatItem>
    </Anchor>
    <Anchor placement="bottom-end">
      <FloatItem className="border-chart-4"> 右下 </FloatItem>
    </Anchor>
    <Anchor placement="middle-center">
      <FloatItem className="border-chart-5"> 中心 </FloatItem>
    </Anchor>
  </Container>
);