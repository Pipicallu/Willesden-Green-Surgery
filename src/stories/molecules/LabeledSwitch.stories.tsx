import type { Meta, StoryObj } from "@storybook/react-vite";
import LabeledSwitch from "@/components/molecules/LabeledSwitch";

const meta = {
  title: "Molecules/LabeledSwitch",
  component: LabeledSwitch,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A custom switch component with labels on both sides and a sliding bubble animation.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LabeledSwitch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    leftLabel: "Left",
    rightLabel: "Right",
  },
};

export const MapView: Story = {
  args: {
    leftLabel: "Map",
    rightLabel: "List",
    defaultChecked: false,
  },
};

export const DarkLight: Story = {
  args: {
    leftLabel: "Dark",
    rightLabel: "Light",
    defaultChecked: true,
  },
};

export const YesNo: Story = {
  args: {
    leftLabel: "No",
    rightLabel: "Yes",
  },
};
