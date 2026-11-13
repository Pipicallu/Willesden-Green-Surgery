import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const paragraphVariants = cva("font-sans font-normal text-balance", {
  variants: {
    size: {
      xs: "text-caption",
      sm: "text-caption",
      base: "text-body",
      lg: "text-body",
      xl: "text-body",
    },
    align: {
      start: "text-start",
      center: "text-center",
      end: "text-end",
    },
    color: {
      foreground: "text-foreground",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "base",
    align: "start",
    color: "foreground",
  },
});

export type ParagraphSize = "xs" | "sm" | "base" | "lg" | "xl";
export type ParagraphAlign = "start" | "center" | "end";
export type ParagraphColor = "foreground" | "muted";

export interface ParagraphProps extends Omit<
  React.HTMLAttributes<HTMLParagraphElement>,
  "color"
> {
  size?: ParagraphSize;
  align?: ParagraphAlign;
  color?: ParagraphColor;
  text?: string;
}

export function Paragraph({
  className,
  size,
  align,
  color,
  text,
  children,
  ...props
}: ParagraphProps) {
  return (
    <p
      className={cn(paragraphVariants({ size, align, color }), className)}
      {...props}
    >
      {text ?? children}
    </p>
  );
}
