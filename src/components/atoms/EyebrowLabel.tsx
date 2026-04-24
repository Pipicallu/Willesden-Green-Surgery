import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Label / eyebrow text — small descriptive line above a heading.
 * Not to be confused with a form <label>.
 */
const labelVariants = cva("inline-block font-semibold tracking-widest", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
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
    uppercase: {
      true: "uppercase",
      false: "",
    },
    withDot: {
      true: "before:content-['·'] before:mr-2 before:text-primary",
      false: "",
    },
  },
  defaultVariants: {
    size: "xs",
    align: "start",
    color: "muted",
    uppercase: true,
    withDot: false,
  },
});

export type LabelSize = "xs" | "sm";
export type LabelAlign = "start" | "center" | "end";
export type LabelColor = "foreground" | "muted";

export interface EyebrowLabelProps extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "color"
> {
  size?: LabelSize;
  align?: LabelAlign;
  color?: LabelColor;
  uppercase?: boolean;
  withDot?: boolean;
  text?: string;
  /** Full-width block display instead of inline */
  block?: boolean;
}

export function EyebrowLabel({
  className,
  size,
  align,
  color,
  uppercase,
  withDot,
  text,
  block = false,
  children,
  ...props
}: EyebrowLabelProps) {
  return (
    <span
      className={cn(
        labelVariants({ size, align, color, uppercase, withDot }),
        block && "block w-full",
        className,
      )}
      {...props}
    >
      {text ?? children}
    </span>
  );
}
