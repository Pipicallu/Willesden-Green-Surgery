import { ImageCard } from "@/components/atoms/ImageCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/organisms/carousel";

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
    src: "/general-practice-awards-2025.png",
    alt: "General Practice Awards 2025: shortlisted for General Practice Team of the Year",
    caption: "Shortlisted for General Practice Team of the Year 2025.",
    width: 800,
    height: 800,
  },
  {
    src: "/climate-essentials.png",
    alt: "Climate Essentials Net Zero Community logo",
    caption: "Part of the Net Zero Community.",
    width: 134,
    height: 256,
  },
  {
    src: "/general-practice-awards-2026.png",
    alt: "General Practice Awards 2026: shortlisted for General Practice Team of the Year",
    caption: "Shortlisted for General Practice Team of the Year 2026.",
    width: 800,
    height: 800,
  },
];

export default function AutoCarousel() {
  return (
    <Carousel
      className="w-full max-w-5xl mx-auto"
      aria-label="Accreditations and awards"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {images.map((image) => (
          <CarouselItem
            key={image.src}
            className="basis-2/3 pl-2 md:basis-1/2 md:pl-4 lg:basis-1/4"
          >
            <div className="flex h-64 w-full flex-col gap-2 rounded-lg border border-border p-3 md:h-96 md:gap-3 md:p-4">
              <div className="flex min-h-0 flex-1 items-center justify-center">
                <ImageCard
                  src={image.src}
                  alt={image.alt}
                  fit="contain"
                  ratio="auto"
                  className="flex h-full items-center justify-center border-0 bg-transparent shadow-none md:block md:h-auto [&_img]:max-h-full [&_img]:w-auto [&_img]:max-w-full [&_img]:rounded-lg md:[&_img]:max-h-none md:[&_img]:w-full"
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
    </Carousel>
  );
}
