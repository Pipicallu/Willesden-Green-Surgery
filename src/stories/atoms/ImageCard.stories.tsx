import type { Meta, StoryObj } from "@storybook/react-vite";
import { ImageCard } from "@/components/atoms/ImageCard";

const meta = {
  title: "Atoms/ImageCard",
  component: ImageCard,
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: "480px", display: "block" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A rounded card that wraps an image with optional CSS filter effects.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    effect: {
      control: "select",
      options: ["none", "grayscale", "fade", "sepia"],
    },
    fit: {
      control: "select",
      options: ["cover", "contain", "fill"],
    },
    ratio: {
      control: "select",
      options: ["square", "video", "portrait", "auto"],
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
    },
    shadow: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
    },
    hoverable: { control: "boolean" },
    caption: { control: "text" },
    src: { control: "text" },
    alt: { control: "text" },
  },
} satisfies Meta<typeof ImageCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const IMG =
  "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80"; // doctor with patient, landscape
const IMG_PORTRAIT =
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80"; // smiling female doctor, portrait
const IMG_SQUARE =
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80"; // female doctor, square
// Inline SVG — no external request, never breaks
const NHS_LOGO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 160'%3E%3Crect width='400' height='160' fill='%23005EB8'/%3E%3Ctext x='50%25' y='57%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial Black,Arial,sans-serif' font-weight='900' font-size='96' fill='white'%3ENHS%3C/text%3E%3C/svg%3E";

export const Default: Story = {
  args: {
    src: IMG,
    alt: "Doctor consulting with a patient",
    effect: "none",
    fit: "cover",
    ratio: "video",
    radius: "lg",
    shadow: "sm",
    hoverable: false,
  },
};

export const Grayscale: Story = {
  args: { ...Default.args, effect: "grayscale" },
};

export const Sepia: Story = {
  args: { ...Default.args, effect: "sepia" },
};

export const Fade: Story = {
  args: { ...Default.args, effect: "fade" },
};

export const Square: Story = {
  args: {
    src: IMG_SQUARE,
    alt: "Square image",
    ratio: "square",
    radius: "xl",
    shadow: "md",
    effect: "none",
    fit: "cover",
    hoverable: false,
  },
};

export const Portrait: Story = {
  args: {
    src: IMG_PORTRAIT,
    alt: "Portrait image",
    ratio: "portrait",
    fit: "cover",
    radius: "lg",
    shadow: "md",
    effect: "none",
    hoverable: true,
  },
};

export const WithCaption: Story = {
  args: {
    ...Default.args,
    caption: "Willesden Green Surgery — NW10",
    shadow: "lg",
  },
};

export const Hoverable: Story = {
  args: { ...Default.args, hoverable: true, shadow: "md" },
};

export const ContainFit: Story = {
  name: "Contain fit (logos / PNGs)",
  args: {
    src: NHS_LOGO,
    alt: "NHS logo",
    fit: "contain",
    ratio: "video",
    radius: "lg",
    shadow: "sm",
    effect: "none",
    hoverable: false,
  },
};
