import type { Meta, StoryObj } from "@storybook/react-vite";
import ProfileCard, {
  type ProfileCardProps,
} from "@/components/organisms/ProfileCard";

const defaultArgs: ProfileCardProps = {
  imageSrc: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2",
  imgDescription: "Medical professional",
  badgeText: "New",
  cardTitle: "Profile Card Title",
  cardDescription: "This is a description for the profile card.",
  buttonText: "View Profile",
  buttonVariant: "default",
  linkHref: "#",
};

const meta = {
  title: "Organisms/ProfileCard",
  component: ProfileCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A profile card component with image, badge, title, description, and action button.",
      },
    },
  },
  args: defaultArgs,
  tags: ["autodocs"],
} satisfies Meta<typeof ProfileCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoBadge: Story = {
  args: {
    ...defaultArgs,
    badgeText: undefined,
    cardTitle: "Profile Card Without Badge",
    cardDescription: "This profile card does not have a badge.",
  },
};

export const OutlineButton: Story = {
  args: {
    ...defaultArgs,
    badgeText: "Featured",
    cardTitle: "Profile with Outline Button",
    cardDescription: "This profile card uses an outline button variant.",
    buttonText: "View Details",
    buttonVariant: "outline",
  },
};

export const LinkButton: Story = {
  args: {
    ...defaultArgs,
    badgeText: undefined,
    cardTitle: "Profile with Link",
    cardDescription: "This profile card uses a link-style button.",
    buttonText: "View More",
    buttonVariant: "link",
  },
};
