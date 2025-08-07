import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs-vite";
import { Center } from "./center";

// 定义组件的元数据
export default {
  title: "Layout/Center", // 组件在 Storybook 中的路径
  component: Center, // 组件本身
  tags: ["autodocs"], // 自动生成文档
  argTypes: {
    inline: {
      control: "boolean",
      description: "是否使用inline-flex布局",
    },
    className: {control: "text"},
    children: {control: "text"},
  },
} satisfies Meta<typeof Center>;

// 渲染函数：为组件添加容器样式
const Template: StoryFn<typeof Center> = (args) => (
  <Center {...args}
          className={`w-64 h-64 m-2 bg-card border border-chart-1 ${args.className || ""}`}>
    <span className={"text-card-foreground border border-chart-2 p-2"}>
      {args.children}
    </span>
  </Center>
);

// 默认示例
export const Default = Template.bind({});
Default.args = {
  children: "默认居中",
};

// 内联居中示例
export const Inline = Template.bind({});
Inline.args = {
  inline: true,
  children: "内联居中",
};

// 自定义样式示例
export const CustomStyle = Template.bind({});
CustomStyle.args = {
  className: "bg-primary/20",
  children: "自定义样式",
};

// 多个子元素示例
export const MultipleChildren: StoryFn<typeof Center> = (args) => (
  <Center {...args}
          className="w-64 h-64 m-2 bg-card border border-chart-1 flex-col gap-2">
    <span
      className="text-card-foreground border border-chart-2 p-2"> 第一个子元素 </span>
    <span
      className="text-card-foreground border border-chart-2 p-2"> 第二个子元素 </span>
  </Center>
);
