import type { Meta, StoryObj } from "@storybook/react-vite";
import Detail from "@/components/molecules/Detail";

const meta = {
  title: "Molecules/Detail",
  component: Detail,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "A simple detail component for displaying information.",
      },
    },
  },
  args: {
    title: "Detail Title",
    description:
      "This is a detailed description that provides more information about the detail component. It can be used to display additional context or information.",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Detail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
