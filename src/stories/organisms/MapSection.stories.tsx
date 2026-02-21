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
          "Interactive map section showing practice locations with switchable map/list view. Uses Google Maps API with custom styling for light/dark themes.",
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
