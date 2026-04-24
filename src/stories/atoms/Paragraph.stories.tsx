import type { Meta, StoryObj } from "@storybook/react-vite";
import { Paragraph } from "@/components/atoms/Paragraph";

const meta = {
  title: "Atoms/Paragraph",
  component: Paragraph,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Body text paragraph with size, alignment and colour variants. Pairs well with `Heading` and `EyebrowLabel`.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "base", "lg", "xl"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
    },
    color: {
      control: "select",
      options: ["foreground", "muted", "primary"],
    },
    text: {
      control: "text",
    },
  },
} satisfies Meta<typeof Paragraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "We are a friendly and caring GP practice serving the Willesden Green community. Our dedicated team of doctors, nurses and support staff are here to help you with all your healthcare needs.",
  },
};

export const Muted: Story = {
  args: {
    color: "muted",
    text: "Opening hours: Monday–Friday 8 am – 6:30 pm. Closed on bank holidays.",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    text: "Register as a new patient today and get access to our full range of services.",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    color: "muted",
    text: "Last updated: April 2026",
  },
};

export const Centered: Story = {
  args: {
    align: "center",
    text: "Your health is our priority. We offer same-day appointments for urgent concerns.",
  },
};
