import type { Meta, StoryFn } from "@storybook/nextjs-vite";
import { TitleBar } from "./titlebar";
import React from "react";
import { Flex } from "@/components/layout/flex";
import Image from "next/image";

export default {
  title: "Components/TitleBar",
  component: TitleBar,
  tags: ["autodocs"],
  parameters: {},
  argTypes: {
    title: {
      control: "text",
      description: "窗口标题文本",
    },
    appIcon: {
      control: false,
      description: "左侧 Icon",
    },
    showMinimize: {
      control: "boolean",
      description: "是否显示最小化按钮",
    },
    showMaximize: {
      control: "boolean",
      description: "是否显示最大化按钮",
    },
    showClose: {
      control: "boolean",
      description: "是否显示关闭按钮",
    },
    onMinimize: {
      action: "minimize",
      description: "最小化按钮点击事件",
    },
    onMaximize: {
      action: "maximize",
      description: "最大化按钮点击事件",
    },
    onClose: {
      action: "close",
      description: "关闭按钮点击事件",
    },
    isDraggable: {
      control: "boolean",
      description: "是否启用标题栏拖拽功能",
    },
    isMaximized: {
      control: "boolean",
      description: "当前窗口是否处于最大化状态",
    },
    className: {
      control: "text",
      description: "额外的Tailwind类名",
    },
    children: {
      control: false,
      description: "子元素",
    },
  },
  args: {
    title: "应用标题",
    showMinimize: true,
    showMaximize: true,
    showClose: true,
    isDraggable: true,
    isMaximized: false,
  },
} as Meta<typeof TitleBar>;

const Template: StoryFn<typeof TitleBar> = (args) => (
  <div className="w-[50vw] h-[50vh] border rounded-md shadow-md overflow-hidden">
    <TitleBar {...args} />
    <div className="p-4 bg-background">
      <p>窗口内容区域</p>
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: "默认标题栏",
};

export const WithCustomTitle = Template.bind({});
WithCustomTitle.args = {
  children: (
    <Flex align="center" className="gap-2">
      <div className="w-4 h-4 rounded-full bg-primary"></div>
      <span className="font-bold">自定义标题内容</span>
    </Flex>
  ),
};

export const WithCustomIcon = Template.bind({});
WithCustomIcon.args = {
  appIcon: (
    <Image src={"window.svg"} alt={"Icon"} height={16} width={16}/>
  ),
};

export const NoMinimizeButton = Template.bind({});
NoMinimizeButton.args = {
  title: "无最小化按钮",
  showMinimize: false,
};

export const NoMaximizeButton = Template.bind({});
NoMaximizeButton.args = {
  title: "无最大化按钮",
  showMaximize: false,
};

export const CloseButtonOnly = Template.bind({});
CloseButtonOnly.args = {
  title: "仅关闭按钮",
  showMinimize: false,
  showMaximize: false,
};

export const MaximizedState = Template.bind({});
MaximizedState.args = {
  title: "最大化状态",
  isMaximized: true,
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
  title: "自定义样式",
  className: "bg-gradient-to-r from-blue-500 to-purple-500 text-white",
};

export const NonDraggable = Template.bind({});
NonDraggable.args = {
  title: "禁用拖拽",
  isDraggable: false,
};
