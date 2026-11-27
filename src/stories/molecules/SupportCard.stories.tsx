import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import MemberCard from "@/components/molecules/MemberCard";

const meta = {
  title: "Molecules/SupportCard",
  component: MemberCard,
  args: {
    memberId: "storybook-support-member",
    variant: "support",
    isExpanded: false,
    onToggle: () => {},
    member: {
      name: "Jane Doe",
      role: "Practice administrator",
      bio: "Helps patients with appointments and administrative enquiries.",
    },
  },
  render: function Render(args) {
    const [{ isExpanded }, updateArgs] = useArgs();
    return (
      <MemberCard
        {...args}
        isExpanded={isExpanded}
        onToggle={() => updateArgs({ isExpanded: !isExpanded })}
      />
    );
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "An expandable card for Admin and Back of House staff. Shows Pencil when closed and a filled PencilOff when expanded.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MemberCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Expanded: Story = {
  args: {
    isExpanded: true,
  },
};
