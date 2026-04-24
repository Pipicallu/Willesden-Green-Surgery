import type { Meta, StoryObj } from "@storybook/react-vite";
import { Banner } from "@/components/molecules/Banner";

const meta = {
  title: "Molecules/Banner",
  component: Banner,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A full-width or contained alert banner with `info` (blue) and `warning` (amber) variants. Follows the same heavy left-border style as DetailsCard.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "warning", "alert"],
    },
    width: {
      control: "select",
      options: ["full", "contained"],
    },
    spacing: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
    },
    title: { control: "text" },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: "info",
    width: "full",
    spacing: "none",
    title: "Your appointment is confirmed",
    children:
      "Please arrive 10 minutes early and bring a valid form of ID. If you need to cancel, call us at least 24 hours in advance.",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    width: "full",
    title: "Action required",
    children:
      "We have been unable to reach you regarding your recent test results. Please call the surgery as soon as possible on 020 8459 3788.",
  },
};

export const Alert: Story = {
  args: {
    variant: "alert",
    width: "full",
    title: "Urgent: call 999 or go to A&E",
    children:
      "If you are experiencing chest pain, difficulty breathing, or think you may be having a stroke, do not wait — call 999 immediately or go to your nearest A&E.",
  },
};

export const AlertContained: Story = {
  name: "Alert — contained",
  args: {
    variant: "alert",
    width: "contained",
    title: "Surgery closure — emergency",
    children:
      "The surgery is closed today due to an unforeseen emergency. Please contact NHS 111 for urgent medical advice.",
  },
};

export const InfoContained: Story = {
  name: "Info — contained",
  args: {
    variant: "info",
    width: "contained",
    title: "Did you know?",
    children:
      "You can request repeat prescriptions online via the NHS App without calling the surgery.",
  },
};

export const WarningContained: Story = {
  name: "Warning — contained",
  args: {
    variant: "warning",
    width: "contained",
    title: "Urgent notice",
    children:
      "The surgery will be closed on Bank Holiday Monday 26 May. For urgent medical needs please call 111.",
  },
};

export const NoTitle: Story = {
  name: "No title (info)",
  args: {
    variant: "info",
    width: "full",
    children:
      "Online booking is temporarily unavailable. Please call us on 020 8459 3788 to make an appointment.",
  },
};

export const WarningNoTitle: Story = {
  name: "No title (warning)",
  args: {
    variant: "warning",
    width: "full",
    children:
      "Due to high demand, same-day appointments are fully booked. Walk-in slots may be available from 8:30 am.",
  },
};
