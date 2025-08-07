import type { Meta, StoryFn } from "@storybook/nextjs-vite";
import { Flex } from "./flex";
import React from "react";

export default {
  title: "Layout/Flex",
  component: Flex,
  tags: ["autodocs"],
  parameters: {},
  argTypes: {
    as: {
      control: "select",
      options: ["div", "span", "section", "header", "footer", "aside"],
    },
    direction: {
      control: {type: "select"},
      options: ["row", "row-reverse", "column", "column-reverse"],
      description: "Flex布局方向",
    },
    align: {
      control: {type: "select"},
      options: ["start", "end", "center", "baseline", "stretch"],
      description: "交叉轴对齐方式",
    },
    justify: {
      control: {type: "select"},
      options: ["start", "end", "center", "between", "around", "evenly"],
      description: "主轴对齐方式",
    },
    wrap: {
      control: {type: "select"},
      options: ["nowrap", "wrap", "wrap-reverse"],
      description: "换行方式",
    },
    grow: {
      control: {type: "number"},
      description: "扩展比例",
    },
    shrink: {
      control: {type: "number"},
      description: "收缩比例",
    },
    basis: {
      control: {type: "text"},
      description: "基础尺寸",
    },
    inline: {
      control: {type: "boolean"},
      description: "是否使用inline-flex",
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
    direction: "row",
    align: "center",
    justify: "start",
    wrap: "nowrap",
    inline: false,
  },
} as Meta<typeof Flex>;

// 创建一个示例项目，用于展示在 Flex 容器中
const FlexItem = ({children, className = ""}: {
  children: React.ReactNode;
  className?: string
}) => (
  <div className={`p-4 border rounded-md border-chart-1 ${className}`}>
    {children}
  </div>
);

const Template: StoryFn<typeof Flex> = (args) => (
  <Flex {...args}>
    {args.children || (
      <>
        <FlexItem>Item 1</FlexItem>
        <FlexItem>Item 2</FlexItem>
        <FlexItem>Item 3</FlexItem>
      </>
    )}
  </Flex>
);

export const Default = Template.bind({});
Default.args = {
  className: "gap-4 p-4 border border-red-500 rounded-lg",
};

export const Column = Template.bind({});
Column.args = {
  direction: "column",
  className: "gap-4 p-4 rounded-lg border border-red-500",
};

export const JustifyBetween = Template.bind({});
JustifyBetween.args = {
  justify: "between",
  className: "gap-4 p-4 rounded-lg w-full border border-red-500",
};

export const Wrapped = Template.bind({});
Wrapped.args = {
  wrap: "wrap",
  className: "gap-4 p-4 rounded-lg w-64 border border-red-500",
  children: (
    <>
      <FlexItem>Item 1</FlexItem>
      <FlexItem>Item 2</FlexItem>
      <FlexItem>Item 3</FlexItem>
      <FlexItem>Item 4</FlexItem>
      <FlexItem>Item 5</FlexItem>
      <FlexItem>Item 6</FlexItem>
    </>
  ),
};

export const AlignEnd = Template.bind({});
AlignEnd.args = {
  align: "end",
  className: "gap-4 p-4 rounded-lg h-40 border border-red-500",
  children: (
    <>
      <FlexItem className="border-chart-1">Short</FlexItem>
      <FlexItem className="h-20 border-chart-2">Medium</FlexItem>
      <FlexItem className="h-32 border-chart-3">Tall</FlexItem>
    </>
  ),
};

export const InlineFlex = Template.bind({});
InlineFlex.args = {
  inline: true,
  className: "gap-4 p-4 rounded-lg border border-red-500",
};

export const GrowShrink = Template.bind({});
GrowShrink.args = {
  className: "gap-4 p-4 rounded-lg w-full border border-red-500",
  children: (
    <>
      <Flex grow={1} shrink={0} basis="100px"
            className="border border-chart-1 rounded-md p-2">
        <span>Grow: 1, Shrink: 0, Basis: 100px</span>
      </Flex>
      <Flex grow={2} shrink={1}
            className="border border-chart-2 rounded-md p-2">
        <span>Grow: 2, Shrink: 1</span>
      </Flex>
      <Flex grow={0} shrink={0}
            className="border border-chart-3 rounded-md p-2">
        <span>Grow: 0, Shrink: 0</span>
      </Flex>
    </>
  ),
};

export const Nested = Template.bind({});
Nested.args = {
  direction: "column",
  className: "gap-4 p-4 rounded-lg border border-chart-1",
  children: (
    <>
      <Flex justify="between" className="gap-2 p-2 border border-chart-2 rounded-md">
        <FlexItem>Row 1, Col 1</FlexItem>
        <FlexItem>Row 1, Col 2</FlexItem>
      </Flex>
      <Flex justify="center" className="gap-2 p-2 border border-chart-3 rounded-md">
        <FlexItem>Row 2, Col 1</FlexItem>
        <FlexItem>Row 2, Col 2</FlexItem>
        <FlexItem>Row 2, Col 3</FlexItem>
      </Flex>
      <Flex direction="column" className="gap-2 p-2 border border-chart-4 rounded-md">
        <FlexItem>Row 3, Nested Col 1</FlexItem>
        <FlexItem>Row 3, Nested Col 2</FlexItem>
      </Flex>
    </>
  ),
};
