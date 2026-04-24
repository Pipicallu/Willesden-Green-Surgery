import * as React from "react";
import { cn } from "@/lib/utils";

export type WrapperBackground = "default" | "muted" | "card";
export type WrapperSpacing = "none" | "sm" | "md" | "lg" | "xl";
export type WrapperMaxWidth = "narrow" | "medium" | "wide" | "full";
export type WrapperColumns = 1 | 2;
export type WrapperGap = "tight" | "normal" | "loose";
export type WrapperVerticalAlign = "start" | "center" | "end";

export interface WrapperProps {
  background?: WrapperBackground;
  spacing?: WrapperSpacing;
  maxWidth?: WrapperMaxWidth;
  columns?: WrapperColumns;
  gap?: WrapperGap;
  verticalAlign?: WrapperVerticalAlign;
  className?: string;
  children?: React.ReactNode;
}

const backgroundClasses: Record<WrapperBackground, string> = {
  default: "",
  muted: "bg-muted",
  card: "bg-card border-y border-border",
};

const spacingClasses: Record<WrapperSpacing, string> = {
  none: "py-0",
  sm: "py-6",
  md: "py-12",
  lg: "py-20",
  xl: "py-32",
};

const widthClasses: Record<WrapperMaxWidth, string> = {
  narrow: "max-w-3xl mx-auto px-4 md:px-8",
  medium: "max-w-5xl mx-auto px-4 md:px-8",
  wide: "max-w-7xl mx-auto px-4 md:px-8",
  full: "w-full px-4 md:px-8",
};

const gapClasses: Record<WrapperGap, string> = {
  tight: "gap-3",
  normal: "gap-6",
  loose: "gap-12",
};

const vAlignClasses: Record<WrapperVerticalAlign, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
};

const columnClasses: Record<WrapperColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
};

export function Wrapper({
  background = "default",
  spacing = "md",
  maxWidth = "medium",
  columns = 1,
  gap = "normal",
  verticalAlign = "start",
  className,
  children,
}: WrapperProps) {
  return (
    <section
      className={cn(
        backgroundClasses[background],
        spacingClasses[spacing],
        className,
      )}
    >
      <div className={widthClasses[maxWidth]}>
        <div
          className={cn(
            "grid",
            columnClasses[columns],
            gapClasses[gap],
            vAlignClasses[verticalAlign],
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
