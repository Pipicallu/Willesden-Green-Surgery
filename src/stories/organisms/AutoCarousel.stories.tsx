import type { Meta, StoryObj } from "@storybook/react-vite";
import AutoCarousel from "@/components/organisms/AutoCarousel";

const meta = {
  title: "Organisms/AutoCarousel",
  component: AutoCarousel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "An auto-playing carousel of the surgery's accreditations and awards. Auto-plays every 3 seconds and pauses on hover.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AutoCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
