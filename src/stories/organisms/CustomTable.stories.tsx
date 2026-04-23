import type { Meta, StoryObj } from "@storybook/react-vite";
import { CustomTable } from "@/components/organisms/CustomTable";

const meta = {
  title: "Organisms/CustomTable",
  component: CustomTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A flexible table component that maps headings and rows from data arrays. Supports an optional caption and footer row.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CustomTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    headings: ["Name", "Role", "Department"],
    rows: [
      ["Dr. Sarah Ahmed", "GP", "General Practice"],
      ["Dr. James Okafor", "GP", "General Practice"],
      ["Nurse Lisa Patel", "Practice Nurse", "Nursing"],
    ],
  },
};

export const WithCaption: Story = {
  args: {
    caption: "Surgery Staff Directory",
    headings: ["Name", "Role", "Department"],
    rows: [
      ["Dr. Sarah Ahmed", "GP", "General Practice"],
      ["Dr. James Okafor", "GP", "General Practice"],
      ["Nurse Lisa Patel", "Practice Nurse", "Nursing"],
    ],
  },
};

export const WithFooter: Story = {
  args: {
    caption: "Maternity Units",
    headings: ["Hospital", "Distance", "CQC Rating"],
    rows: [
      ["Northwick Park Hospital", "1.2 miles", "Good"],
      ["Central Middlesex Hospital", "2.4 miles", "Outstanding"],
      ["Whittington Hospital", "4.1 miles", "Good"],
    ],
    footer: ["3 hospitals listed", "", ""],
  },
};

export const Empty: Story = {
  args: {
    caption: "No data available",
    headings: ["Column A", "Column B", "Column C"],
    rows: [],
  },
};
