import type { Meta, StoryObj } from "@storybook/react-vite";
import RegistrationCard from "@/components/organisms/RegistrationCard";

const meta = {
  title: "Organisms/RegistrationCard",
  component: RegistrationCard,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A card component for displaying registration options with icon, title, description, and action button. Designed to work with Storyblok CMS data.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RegistrationCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OnlineRegistration: Story = {
  args: {
    option: {
      icon: {
        filename:
          "https://api.iconify.design/mdi/web.svg?color=%234f46e5&width=32&height=32",
        alt: "Online icon",
      },
      title: "Register Online",
      description:
        "Complete your registration form online for a quick and convenient process.",
      buttonText: "Start Online Registration",
      buttonVariant: "default",
      link: {
        url: "#",
      },
      download: false,
    },
  },
};

export const DownloadForm: Story = {
  args: {
    option: {
      icon: {
        filename:
          "https://api.iconify.design/mdi/file-download.svg?color=%2310b981&width=32&height=32",
        alt: "Download icon",
      },
      title: "Download Form",
      description:
        "Download the PDF registration form to complete and submit in person.",
      buttonText: "Download PDF",
      buttonVariant: "outline",
      link: {
        url: "#",
      },
      download: true,
    },
  },
};

export const InPerson: Story = {
  args: {
    option: {
      icon: {
        filename:
          "https://api.iconify.design/mdi/hospital-building.svg?color=%23f59e0b&width=32&height=32",
        alt: "In person icon",
      },
      title: "Register In Person",
      description:
        "Visit our practice during opening hours to complete your registration.",
      buttonText: "View Opening Hours",
      buttonVariant: "outline",
      link: {
        url: "#",
      },
      download: false,
    },
  },
};
