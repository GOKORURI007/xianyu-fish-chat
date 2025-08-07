import React from "react";
import { Meta, StoryFn } from "@storybook/nextjs-vite";
import { Box } from "./box";

export default {
  title: "Layout/Box",
  component: Box,
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["div", "span", "section", "header", "footer", "aside"],
    },
    className: {control: "text"}, // 自定义类名
    children: {control: "text"}, // 子元素内容
  },
  args: {
    as: "div"
  }
} satisfies Meta<typeof Box>;

// 渲染函数：为组件添加样式
const Template: StoryFn<typeof Box> = (args) => (
  <Box {...args} />
);

// 默认示例 - div
export const Default = Template.bind({});
Default.args = {
  className: "p-4 bg-card text-card-foreground border border-chart-1",
  children: "这是一个 div 盒子",
};

// span 示例
export const AsSpan = Template.bind({});
AsSpan.args = {
  as: "span",
  className: "p-2 bg-card text-card-foreground border border-chart-1 inline-block",
  children: "这是一个 span 盒子",
};

// 嵌套内容示例
export const WithNestedContent = Template.bind({});
WithNestedContent.args = {
  as: "div",
  className: "p-4 bg-card text-card-foreground border border-chart-1",
  children: (
    <>
      <h3 className="text-lg font-bold mb-2"> 嵌套内容示例 </h3>
      <p className="mb-2">Box 组件可以包含任何内容，包括其他 React 组件。</p>
      <Box as="div" className="p-2 border border-chart-2">
        这是一个嵌套的 Box
      </Box>
    </>
  ),
};

// 自定义样式示例
export const WithCustomStyles = Template.bind({});
WithCustomStyles.args = {
  as: "div",
  className: "p-6 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg",
  children: "带有自定义样式的 Box",
};
