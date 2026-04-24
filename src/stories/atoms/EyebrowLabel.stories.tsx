import type { Meta, StoryObj } from "@storybook/react-vite";
import { EyebrowLabel } from "@/components/atoms/EyebrowLabel";

const meta = {
  title: "Atoms/EyebrowLabel",
  component: EyebrowLabel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Small uppercase label used as an eyebrow above headings or as a section tag. Optionally renders a primary-coloured dot prefix.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
    },
    color: {
      control: "select",
      options: ["foreground", "muted", "primary"],
    },
    uppercase: {
      control: "boolean",
    },
    withDot: {
      control: "boolean",
      description: "Prepends a primary-coloured · character.",
    },
    block: {
      control: "boolean",
      description: "Makes the element block-level (full width).",
    },
    text: {
      control: "text",
    },
  },
} satisfies Meta<typeof EyebrowLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Our Services",
  },
};

export const WithDot: Story = {
  args: {
    text: "New Patients",
    withDot: true,
  },
};

export const Large: Story = {
  args: {
    size: "sm",
    text: "Health Information",
  },
};

export const Centered: Story = {
  args: {
    text: "Patient Corner",
    align: "center",
    withDot: true,
    block: true,
  },
};
