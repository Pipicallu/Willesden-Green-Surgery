import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/organisms/carousel";

const meta = {
  title: "Organisms/Carousel",
  component: Carousel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A carousel component built with Embla Carousel. Supports horizontal and vertical orientations with navigation buttons.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center p-6 bg-primary text-primary-foreground rounded-lg">
                <span className="text-4xl font-semibold">{index + 1}</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const Multiple: Story = {
  render: () => (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-2xl"
    >
      <CarouselContent>
        {Array.from({ length: 8 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <div className="flex aspect-square items-center justify-center p-6 bg-secondary text-secondary-foreground rounded-lg">
                <span className="text-3xl font-semibold">{index + 1}</span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};

export const WithContent: Story = {
  render: () => (
    <Carousel className="w-full max-w-md">
      <CarouselContent>
        <CarouselItem>
          <div className="p-6 bg-card border rounded-lg">
            <h3 className="text-xl font-bold mb-2">Welcome</h3>
            <p className="text-muted-foreground">
              This is the first slide of the carousel.
            </p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-6 bg-card border rounded-lg">
            <h3 className="text-xl font-bold mb-2">Features</h3>
            <p className="text-muted-foreground">
              Explore the amazing features we offer.
            </p>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="p-6 bg-card border rounded-lg">
            <h3 className="text-xl font-bold mb-2">Get Started</h3>
            <p className="text-muted-foreground">
              Ready to begin your journey with us?
            </p>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
};
