import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * CSS filter effects applied to the image itself.
 * "invert-dark" uses a CSS class that inverts the image only in dark mode —
 * useful for logos/PNGs that are dark on white and need to flip for dark backgrounds.
 */
export type ImageEffect =
  | "none"
  | "grayscale"
  | "invert-dark"
  | "fade"
  | "sepia";

/** How the image fills its container */
export type ImageFit = "cover" | "contain" | "fill";

/** Aspect ratio of the card */
export type ImageRatio = "square" | "video" | "portrait" | "auto";

/** Border radius of the card */
export type ImageRadius = "sm" | "md" | "lg" | "xl" | "full" | "none";

const cardVariants = cva(
  "relative overflow-hidden bg-card border border-border transition-all duration-300 w-full",
  {
    variants: {
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
      shadow: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
    },
    defaultVariants: {
      radius: "lg",
      shadow: "sm",
    },
  },
);

const ratioStyles: Record<ImageRatio, React.CSSProperties> = {
  square: { aspectRatio: "1 / 1" },
  video: { aspectRatio: "16 / 9" },
  portrait: { aspectRatio: "3 / 4" },
  auto: {},
};

const ratioClasses: Record<ImageRatio, string> = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
  auto: "",
};

const imageEffectStyles: Record<ImageEffect, React.CSSProperties> = {
  none: {},
  grayscale: { filter: "grayscale(100%)" },
  "invert-dark": {}, // applied via className below
  fade: { opacity: 0.7 },
  sepia: { filter: "sepia(100%)" },
};

const imageFitClasses: Record<ImageFit, string> = {
  cover: "object-cover",
  contain: "object-contain",
  fill: "object-fill",
};

export interface ImageCardProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  src: string;
  alt: string;
  effect?: ImageEffect;
  fit?: ImageFit;
  ratio?: ImageRatio;
  radius?: ImageRadius;
  shadow?: "none" | "sm" | "md" | "lg";
  caption?: string;
  /** Makes the card scale up slightly on hover */
  hoverable?: boolean;
}

export function ImageCard({
  src,
  alt,
  effect = "none",
  fit = "cover",
  ratio = "video",
  radius = "lg",
  shadow = "sm",
  caption,
  hoverable = false,
  className,
  style,
  ...props
}: ImageCardProps) {
  return (
    <figure
      className={cn(
        cardVariants({ radius, shadow }),
        ratioClasses[ratio],
        hoverable && "hover:scale-[1.02] cursor-pointer",
        className,
      )}
      style={{ ...ratioStyles[ratio], ...style }}
      {...props}
    >
      <img
        src={src}
        alt={alt}
        className={cn(
          "transition-all duration-300",
          ratio === "auto"
            ? "w-full h-auto block"
            : "absolute inset-0 w-full h-full",
          imageFitClasses[fit],
          effect === "invert-dark" && "dark:invert dark:brightness-90",
        )}
        style={imageEffectStyles[effect]}
      />
      {caption && (
        <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-background/70 backdrop-blur-sm text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
