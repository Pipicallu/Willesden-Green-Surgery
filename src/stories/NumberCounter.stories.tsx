import type { Meta, StoryObj } from "@storybook/react-vite";
import NumberCounter, {
  type NumberCounterProps,
} from "@/components/ui/NumberCounter";

const meta = {
  title: "Components/NumberCounter",
  component: NumberCounter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof NumberCounter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    target: 1000,
    duration: 2000,
    suffix: "+",
  } as NumberCounterProps,
};

export const Reverse: Story = {
  args: {
    target: 0,
    duration: 2000,
    suffix: "%",
    reverse: true,
  } as NumberCounterProps,
};

export const FastCount: Story = {
  args: {
    target: 500,
    duration: 500,
    suffix: " units",
  } as NumberCounterProps,
};

export const SlowCount: Story = {
  args: {
    target: 100,
    duration: 5000,
    suffix: " pts",
  } as NumberCounterProps,
};

export const NoSuffix: Story = {
  args: {
    target: 750,
    duration: 1500,
  } as NumberCounterProps,
};
