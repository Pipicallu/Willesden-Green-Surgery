import * as React from "react";
import { ImageCard } from "@/components/atoms/ImageCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/organisms/carousel";
import Autoplay from "embla-carousel-autoplay";

const images = [
  {
    src: "/living-wage-employer.png",
    alt: "Living Wage Employer logo",
    caption: "Proud to be a Living Wage Employer.",
    width: 507,
    height: 401,
  },
  {
    src: "/safe-surgery.png",
    alt: "Proud to be a Safe Surgery logo",
    caption: "Proud to be a Safe Surgery.",
    width: 600,
    height: 400,
  },
  {
    src: "/climate-essentials.png",
    alt: "Climate Essentials Net Zero Community logo",
    caption: "Part of the Net Zero Community.",
    width: 134,
    height: 256,
  },
  {
    src: "/general-practice-awards-2025.png",
    alt: "General Practice Awards 2025: shortlisted for General Practice Team of the Year",
    caption: "Shortlisted for General Practice Team of the Year 2025.",
    width: 800,
    height: 800,
  },
];

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
        {images.map((image) => (
          <CarouselItem
            key={image.src}
            className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4"
          >
            <div className="flex h-96 w-full flex-col gap-3 rounded-lg border border-border p-4">
              <div className="flex min-h-0 flex-1 items-center justify-center">
                <ImageCard
                  src={image.src}
                  alt={image.alt}
                  fit="contain"
                  ratio="auto"
                  className="border-0 bg-transparent shadow-none [&_img]:rounded-lg"
                  style={{
                    maxWidth: Math.min(
                      image.width,
                      (image.width / image.height) * 288,
                    ),
                  }}
                />
              </div>
              <p className="text-caption flex min-h-12 items-center justify-center px-2 text-center text-muted-foreground">
                {image.caption}
              </p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
