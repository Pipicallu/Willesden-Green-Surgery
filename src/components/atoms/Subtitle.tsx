import React from "react";
import { cn } from "@/lib/utils";

interface SubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export function Subtitle({ children, className }: SubtitleProps) {
  return (
    <p className={cn("text-lg text-muted-foreground", className)}>{children}</p>
  );
}
