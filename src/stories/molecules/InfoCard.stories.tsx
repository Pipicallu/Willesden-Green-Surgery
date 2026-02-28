import type { Meta, StoryObj } from "@storybook/react-vite";
import InfoCard from "@/components/molecules/InfoCard";

const meta = {
  title: "Molecules/InfoCard",
  component: InfoCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A simple card component to display information with an optional image.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InfoCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Info Card Title",
    description:
      "This is a description for the info card. It provides additional details about the content.",
  },
};
