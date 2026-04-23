import type { Meta, StoryObj } from "@storybook/react-vite";
import { Detail } from "@/components/atoms/Detail";

const meta = {
  title: "Atoms/Detail",
  component: Detail,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A simple detail display showing a labelled title and value. Optionally renders a divider below as either an `<hr>` or a `border-bottom`.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Detail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NoDivider: Story = {
  args: {
    title: "GP Name",
    value: "Dr. Sarah Ahmed",
  },
};

export const WithHr: Story = {
  args: {
    title: "Date of Birth",
    value: "12 March 1990",
    divider: "hr",
  },
};

export const WithBorderBottom: Story = {
  args: {
    title: "NHS Number",
    value: "485 777 3456",
    divider: "border-bottom",
  },
};

export const PhoneNumber: Story = {
  args: {
    title: "Telephone",
    value: "0208 937 5490",
    href: "tel:02089375490",
    divider: "border-bottom",
  },
};

export const Website: Story = {
  args: {
    title: "Website",
    value: "www.wdp.org.uk/brent",
    href: "https://www.wdp.org.uk/brent",
    divider: "border-bottom",
  },
};

export const Stacked: Story = {
  args: {
    title: "",
    value: "",
  },
  render: () => (
    <div className="max-w-sm">
      <Detail title="Full Name" value="John Smith" divider="border-bottom" />
      <Detail
        title="Date of Birth"
        value="12 March 1990"
        divider="border-bottom"
      />
      <Detail title="NHS Number" value="485 777 3456" divider="border-bottom" />
      <Detail title="GP" value="Dr. Sarah Ahmed" />
    </div>
  ),
};
