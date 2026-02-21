import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/organisms/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function AutoCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-5xl mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
          <div className="p-6 md:p-8 rounded-lg border bg-card h-full flex flex-col">
            <div className="space-y-4 flex-1">
              <h3 className="text-xl md:text-2xl font-bold">
                Advanced Medical Technology
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                State-of-the-art equipment and facilities to provide you with
                the best care possible.
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
          <div className="p-6 md:p-8 rounded-lg border bg-card h-full flex flex-col">
            <div className="space-y-4 flex-1">
              <h3 className="text-xl md:text-2xl font-bold">
                Patient-Centered Care
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Your health and wellbeing are at the heart of everything we do.
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
          <div className="p-6 md:p-8 rounded-lg border bg-card h-full flex flex-col">
            <div className="space-y-4 flex-1">
              <h3 className="text-xl md:text-2xl font-bold">
                Experienced Professionals
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Our team of dedicated healthcare professionals brings years of
                expertise to your care.
              </p>
            </div>
          </div>
        </CarouselItem>
        <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
          <div className="p-6 md:p-8 rounded-lg border bg-card h-full flex flex-col">
            <div className="space-y-4 flex-1">
              <h3 className="text-xl md:text-2xl font-bold">
                Comprehensive Services
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                From routine check-ups to specialized treatments, we've got you
                covered.
              </p>
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
