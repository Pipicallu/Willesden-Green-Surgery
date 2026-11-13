import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("text-balance", {
  variants: {
    level: {
      h1: "text-hero",
      h2: "text-section",
      h3: "text-subsection",
      h4: "text-2xl md:text-3xl",
      h5: "text-xl md:text-2xl",
      h6: "text-lg md:text-xl",
    },
    align: {
      start: "text-start",
      center: "text-center",
      end: "text-end",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    color: {
      foreground: "text-foreground",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    level: "h2",
    align: "start",
    color: "foreground",
  },
});

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
export type HeadingAlign = "start" | "center" | "end";
export type HeadingWeight = "normal" | "medium" | "semibold" | "bold";
export type HeadingColor = "foreground" | "muted";

export interface HeadingProps extends Omit<
  React.HTMLAttributes<HTMLHeadingElement>,
  "color"
> {
  level?: HeadingLevel;
  align?: HeadingAlign;
  weight?: HeadingWeight;
  color?: HeadingColor;
  text?: string;
}

export function Heading({
  className,
  level = "h2",
  align,
  weight,
  color,
  text,
  children,
  ...props
}: HeadingProps) {
  const Comp = level;
  return (
    <Comp
      className={cn(
        headingVariants({ level, align, weight: weight ?? (level === "h1" ? "medium" : "semibold"), color }),
        className,
      )}
      {...props}
    >
      {text ?? children}
    </Comp>
  );
}
