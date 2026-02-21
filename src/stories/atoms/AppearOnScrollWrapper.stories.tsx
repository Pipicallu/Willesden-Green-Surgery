import type { Meta, StoryObj } from "@storybook/react-vite";
import AppearOnScrollWrapper from "@/components/atoms/AppearOnScrollWrapper";

const meta = {
  title: "Atoms/AppearOnScrollWrapper",
  component: AppearOnScrollWrapper,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A wrapper component that animates its children into view when scrolled into viewport. Uses Intersection Observer API.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AppearOnScrollWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-8 bg-primary text-primary-foreground rounded-lg">
        <h2 className="text-2xl font-bold mb-2">Scroll to see animation</h2>
        <p>This content will fade in and slide up when scrolled into view.</p>
      </div>
    ),
  },
};

export const FastTransition: Story = {
  args: {
    transitionDuration: 200,
    children: (
      <div className="p-8 bg-secondary text-secondary-foreground rounded-lg">
        <h2 className="text-2xl font-bold">Fast Animation</h2>
        <p>Appears quickly (200ms)</p>
      </div>
    ),
  },
};

export const SlowTransition: Story = {
  args: {
    transitionDuration: 1000,
    children: (
      <div className="p-8 bg-accent text-accent-foreground rounded-lg">
        <h2 className="text-2xl font-bold">Slow Animation</h2>
        <p>Appears slowly (1000ms)</p>
      </div>
    ),
  },
};
