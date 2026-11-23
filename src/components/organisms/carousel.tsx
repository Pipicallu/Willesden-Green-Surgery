import type { ComponentProps } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

import { cn } from "@/lib/utils";

type CarouselProps = ComponentProps<"div"> & {
  opts?: Parameters<typeof useEmblaCarousel>[0];
  speed?: number;
};

function Carousel({
  opts,
  speed = 1,
  className,
  children,
  ...props
}: CarouselProps) {
  const [carouselRef] = useEmblaCarousel(
    { align: "start", loop: true, dragFree: true, ...opts },
    [
      AutoScroll({
        speed,
        startDelay: 0,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        breakpoints: {
          "(prefers-reduced-motion: reduce)": {
            active: false,
          },
        },
      }),
    ],
  );

  return (
    <div
      className={cn("relative", className)}
      role="region"
      aria-label="Carousel"
      aria-roledescription="carousel"
      data-slot="carousel"
      {...props}
    >
      <div ref={carouselRef} className="overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function CarouselContent({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="carousel-content"
      className={cn("-ml-4 flex touch-pan-y touch-pinch-zoom", className)}
      {...props}
    />
  );
}

function CarouselItem({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn("min-w-0 shrink-0 grow-0 basis-full pl-4", className)}
      {...props}
    />
  );
}

export { Carousel, CarouselContent, CarouselItem };
