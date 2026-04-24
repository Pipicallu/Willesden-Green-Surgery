import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "@/components/atoms/Heading";

const meta = {
  title: "Atoms/Heading",
  component: Heading,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Configurable semantic heading (h1–h6) with alignment, weight and colour variants. Use the `text` prop in Storyblok; children are also supported.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: "select",
      options: ["h1", "h2", "h3", "h4", "h5", "h6"],
      description: "Rendered HTML element and default font-size scale.",
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
      description: "Text alignment.",
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold", "bold"],
    },
    color: {
      control: "select",
      options: ["foreground", "muted", "primary"],
    },
    text: {
      control: "text",
      description: "String content — used by the Storyblok integration.",
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    level: "h1",
    text: "Willesden Green Surgery",
  },
};

export const H2: Story = {
  args: {
    level: "h2",
    text: "Our Services",
  },
};

export const H3: Story = {
  args: {
    level: "h3",
    text: "Meet the Team",
  },
};

export const Centered: Story = {
  args: {
    level: "h2",
    align: "center",
    text: "Caring for your health",
  },
};

export const MutedSubheading: Story = {
  args: {
    level: "h4",
    color: "muted",
    weight: "medium",
    text: "General practice & specialist referrals",
  },
};
