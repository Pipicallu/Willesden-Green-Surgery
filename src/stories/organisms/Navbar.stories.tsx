import type { Meta, StoryObj } from "@storybook/react-vite";
import Navbar from "@/components/organisms/Navbar";

const meta = {
  title: "Organisms/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The main navigation bar with logo, menu links, registration button, and theme toggle. Becomes sticky with shadow on scroll.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Navbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 px-8">
        <h1 className="text-4xl font-bold mb-4">Navbar Example</h1>
        <p className="text-muted-foreground mb-8">
          Scroll down to see the navbar shadow effect.
        </p>
        <div className="space-y-8">
          {Array.from({ length: 20 }).map((_, i) => (
            <p key={i} className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const NavbarOnly: Story = {
  render: () => <Navbar />,
};
