import type { Meta, StoryObj } from "@storybook/react-vite";
import MapSection from "@/components/organisms/MapSection";

const meta = {
  title: "Organisms/MapSection",
  component: MapSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Interactive map showing all practice locations together. Hover over a pin for its address and opening hours, or tap on touch devices to reveal details and a Google Maps link. Desktop pin clicks open Google Maps directly. Uses the site colour palette.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MapSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen">
      <MapSection />
    </div>
  ),
};
