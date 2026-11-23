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
          "A continuously scrolling carousel of the surgery's accreditations and awards. Loops automatically without navigation or playback buttons and respects reduced motion preferences.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AutoCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
