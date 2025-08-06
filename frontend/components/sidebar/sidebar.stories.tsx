import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Sidebar } from "./sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className={"h-screen w-16 border-amber-600 border-1"}>
        <Story/>
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};
