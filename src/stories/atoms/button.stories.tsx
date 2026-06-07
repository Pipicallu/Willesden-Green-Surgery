import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/atoms/button";

const meta = {
  title: "atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
    },
    align: {
      control: "select",
      options: ["start", "center", "end"],
    },
    spacing: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
    },
    href: {
      control: "text",
    },
    target: {
      control: "select",
      options: ["_self", "_blank"],
    },
    label: {
      control: "text",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    label: "Delete",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    label: "Outline",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    label: "Secondary",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    label: "Ghost",
  },
};

export const LinkVariant: Story = {
  args: {
    variant: "link",
    label: "Link",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    label: "Small Button",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    label: "Large Button",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    label: "Disabled",
  },
};

export const AsLink: Story = {
  args: {
    label: "Go to Homepage",
    href: "/",
  },
};

export const AsExternalLink: Story = {
  args: {
    label: "Open in new tab",
    href: "https://example.com",
    target: "_blank",
    variant: "outline",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div className="w-64 border p-4 space-y-2">
      <Button align="start">Align Start</Button>
      <Button align="center">Align Center</Button>
      <Button align="end">Align End</Button>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="flex flex-col">
      <p className="text-sm text-muted-foreground">Reference text</p>
      <Button spacing="sm">Spacing sm (mt-4)</Button>
      <Button spacing="md">Spacing md (mt-8)</Button>
      <Button spacing="lg">Spacing lg (mt-12)</Button>
      <Button spacing="xl">Spacing xl (mt-16)</Button>
    </div>
  ),
};
