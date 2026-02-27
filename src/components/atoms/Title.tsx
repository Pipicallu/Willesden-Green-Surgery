import React from "react";
import { cn } from "@/lib/utils";

interface TitleProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export function Title({ children, className, as: Tag = "h2" }: TitleProps) {
  return <Tag className={cn("text-4xl font-bold", className)}>{children}</Tag>;
}
