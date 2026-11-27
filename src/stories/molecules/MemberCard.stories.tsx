import type { Meta, StoryObj } from "@storybook/react-vite";
import { useArgs } from "storybook/preview-api";
import MemberCard from "@/components/molecules/MemberCard";

const meta = {
  title: "Molecules/MemberCard",
  component: MemberCard,
  args: {
    memberId: "storybook-member",
    isExpanded: false,
    onToggle: () => {},
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
          "A card component that displays a member's name, role, speciality, and bio. The details can be toggled to show or hide.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MemberCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    member: {
      name: "Dr. Jane Doe",
      role: "Cardiologist",
      speciality: "Heart Health",
      bio: "Dr. Jane Doe has over 15 years of experience in cardiology, specializing in heart health and preventive care.",
    },
  },
};

export const Expanded: Story = {
  args: {
    isExpanded: true,
    member: {
      name: "Dr. John Smith",
      role: "Neurologist",
      speciality: "Brain and Nervous System",
      bio: "Dr. John Smith is a leading neurologist with a focus on brain and nervous system disorders, providing comprehensive care and treatment.",
    },
  },
};
