import type { Meta, StoryObj } from "@storybook/react-vite";
import { Link } from "@/components/atoms/Link";
import { Phone, Mail, FileDown } from "lucide-react";

const meta = {
  title: "Atoms/Link",
  component: Link,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Styled anchor element with icon-position variations. Use `iconPosition` to place an arrow/icon before or after the label, or omit it entirely. Pass `external` to automatically open in a new tab with a safe `rel` and an ExternalLink icon.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "underline", "subtle", "muted"],
      description: "Visual treatment of the link.",
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    weight: {
      control: "select",
      options: ["normal", "medium", "semibold"],
    },
    iconPosition: {
      control: "select",
      options: ["none", "left", "right"],
      description:
        "Where the icon appears relative to the label. 'none' hides the icon entirely.",
    },
    label: {
      control: "text",
    },
    href: {
      control: "text",
    },
    external: {
      control: "boolean",
      description:
        "Opens link in a new tab (target=_blank) and swaps the icon to ExternalLink.",
    },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Core variations ────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    label: "Learn more",
    href: "#",
  },
};

export const IconLeft: Story = {
  name: "Icon — Left",
  args: {
    label: "Back to top",
    href: "#",
    iconPosition: "left",
  },
};

export const IconRight: Story = {
  name: "Icon — Right",
  args: {
    label: "View all services",
    href: "#",
    iconPosition: "right",
  },
};

export const NoIcon: Story = {
  name: "No Icon",
  args: {
    label: "Privacy policy",
    href: "#",
    iconPosition: "none",
    variant: "underline",
  },
};

// ─── Variant showcase ────────────────────────────────────────────────────────

export const Underline: Story = {
  args: {
    label: "Read our patient guide",
    href: "#",
    variant: "underline",
    iconPosition: "none",
  },
};

export const Subtle: Story = {
  args: {
    label: "Find out more",
    href: "#",
    variant: "subtle",
  },
};

export const Muted: Story = {
  args: {
    label: "Terms & conditions",
    href: "#",
    variant: "muted",
    iconPosition: "none",
  },
};

// ─── External ────────────────────────────────────────────────────────────────

export const External: Story = {
  args: {
    label: "NHS guidance",
    href: "https://www.nhs.uk",
    external: true,
    variant: "subtle",
  },
};

// ─── Size scale ──────────────────────────────────────────────────────────────

export const Sizes: Story = {
  args: { label: "Link" },
  render: () => (
    <div className="flex flex-col gap-4">
      <Link label="Small link" href="#" size="sm" />
      <Link label="Default link" href="#" size="default" />
      <Link label="Large link" href="#" size="lg" />
    </div>
  ),
};

// ─── Custom icons ────────────────────────────────────────────────────────────

export const PhoneLink: Story = {
  name: "Custom Icon — Phone",
  args: {
    label: "020 3355 0928",
    href: "tel:02033550928",
    iconPosition: "left",
    icon: <Phone />,
    variant: "subtle",
  },
};

export const EmailLink: Story = {
  name: "Custom Icon — Email",
  args: {
    label: "reception@wgsurgery.nhs.uk",
    href: "mailto:reception@wgsurgery.nhs.uk",
    iconPosition: "left",
    icon: <Mail />,
    variant: "subtle",
  },
};

export const DownloadLink: Story = {
  name: "Custom Icon — Download",
  args: {
    label: "Download patient form",
    href: "#",
    iconPosition: "left",
    icon: <FileDown />,
    variant: "default",
    weight: "semibold",
  },
};
