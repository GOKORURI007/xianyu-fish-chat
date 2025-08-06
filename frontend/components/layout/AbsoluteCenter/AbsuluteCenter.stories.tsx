import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs-vite";
import { AbsoluteCenter } from "@/components/layout/AbsoluteCenter";

// 定义组件的元数据
export default {
  title: "Layout/AbsoluteCenter", // 组件在 Storybook 中的路径
  component: AbsoluteCenter, // 组件本身
  tags: ["autodocs"], // 自动生成文档
  argTypes: { // 定义参数类型和控制方式
    axis: { // 居中轴类型
      control: "radio",
      options: ["horizontal", "vertical", "both"],
    },
    dir: { // 文本方向
      control: "radio",
      options: ["ltr", "rtl"],
    },
    className: {control: "text"}, // 自定义类名
    children: {control: "text"}, // 子元素内容
  },
} satisfies Meta<typeof AbsoluteCenter>;

// 渲染函数：为组件添加容器样式
const Template: StoryFn<typeof AbsoluteCenter> = (args) => (
  <div className={"w-64 h-64 m-2 bg-card relative border border-chart-1"} dir={args.dir}>
    <AbsoluteCenter {...args}>
      <span
        className={"text-card-foreground border border-chart-2 p-2"}>{args.children}</span>
    </AbsoluteCenter>
  </div>
);

// 默认示例
export const Default = Template.bind({});
Default.args = {
  children: "默认双向居中",
};

// 双向居中示例
export const Both = Template.bind({});
Both.args = {
  axis: "both",
  children: "双向居中",
};

// RTL 双向居中示例
export const RTLBoth = Template.bind({});
RTLBoth.args = {
  axis: "both",
  dir: "rtl",
  children: "RTL 双向居中",
};

// 水平居中示例
export const Horizontal = Template.bind({});
Horizontal.args = {
  axis: "horizontal",
  children: "水平居中",
};


// 垂直居中示例
export const Vertical = Template.bind({});
Vertical.args = {
  axis: "vertical",
  children: "垂直居中",
};


// RTL 垂直居中示例
export const RTLVertical = Template.bind({});
RTLVertical.args = {
  axis: "vertical",
  dir: "rtl",
  children: "RTL 垂直居中",
};

// 非法输入
export const Invalid = Template.bind({});
Invalid.args = {
  // @ts-ignore
  // 测试边际条件
  axis: "***",
  children: "默认双向居中",
};