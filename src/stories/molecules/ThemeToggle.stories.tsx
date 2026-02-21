import type { Meta, StoryObj } from "@storybook/react-vite";
import ThemeToggle from "@/components/molecules/ThemeToggle";

const meta = {
  title: "Molecules/ThemeToggle",
  component: ThemeToggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A theme toggle button that switches between light and dark modes. Persists preference in localStorage.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ThemeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
