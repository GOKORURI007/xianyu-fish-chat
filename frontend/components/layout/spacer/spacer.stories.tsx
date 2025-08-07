import type { Meta, StoryFn } from "@storybook/nextjs-vite";
import { Spacer } from "./spacer";

export default {
  title: "Layout/Spacer",
  component: Spacer,
  tags: ["autodocs"],
  parameters: {},
  argTypes: {
    className: {
      control: {type: "text"},
      description: "额外的 Tailwind 类名",
    },
  },
} as Meta<typeof Spacer>;

const Template: StoryFn<typeof Spacer> = (args) => (
  <div className="flex w-[50vw] h-20 rounded-lg p-4 border border-chart-1">
    <div
      className="w-20 h-full rounded flex items-center justify-center border border-chart-1">
      左侧
    </div>
    <Spacer {...args} />
    <div
      className=" w-20 h-full rounded flex items-center justify-center border border-chart-1">
      右侧
    </div>
  </div>
);

export const Default = Template.bind({});
Default.args = {};

export const WithCustomClass = Template.bind({});
WithCustomClass.args = {
  className: "border border-chart-2",
};

export const MultipleSpacers: StoryFn<typeof Spacer> = (args) => (
  <div className="flex w-[50vw] h-20 rounded-lg p-4 border border-chart-1">
    <div
      className="w-20 h-full rounded flex items-center justify-center border border-chart-3">
      左侧
    </div>
    <Spacer {...args} />
    <div
      className="w-20 h-full rounded flex items-center justify-center border border-chart-3">
      中间
    </div>
    <Spacer {...args} />
    <div
      className="w-20 h-full rounded flex items-center justify-center border border-chart-3">
      右侧
    </div>
  </div>
);

export const VerticalSpacing: StoryFn<typeof Spacer> = (args) => (
  <div className="flex flex-col w-full h-80 rounded-lg p-4 border border-chart-1">
    <div
      className="w-full h-16 rounded flex items-center justify-center border border-chart-4">
      顶部
    </div>
    <Spacer {...args} />
    <div
      className="w-full h-16 rounded flex items-center justify-center border border-chart-4">
      底部
    </div>
  </div>
);
