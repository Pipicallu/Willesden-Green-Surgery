import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const linkVariants = cva(
  "inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
  {
    variants: {
      variant: {
        /** Primary colour, no underline — pairs well with icons */
        default: "text-primary hover:text-primary/80",
        /** Classic underlined hyperlink */
        underline:
          "text-primary underline underline-offset-4 decoration-primary/40 hover:decoration-primary",
        /** Neutral foreground, becomes primary on hover */
        subtle: "text-foreground hover:text-primary",
        /** Dimmed — for secondary / footnote links */
        muted: "text-muted-foreground hover:text-foreground",
      },
      size: {
        sm: "text-sm [&_svg]:size-3.5",
        default: "text-base [&_svg]:size-4",
        lg: "text-lg [&_svg]:size-5",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
      },
      /**
       * Where the icon sits relative to the label text.
       * none  → no icon is rendered
       * left  → [icon] Label
       * right → Label [icon]
       */
      iconPosition: {
        none: "",
        left: "",
        right: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      weight: "medium",
      iconPosition: "right",
    },
  },
);

export type LinkVariant = "default" | "underline" | "subtle" | "muted";
export type LinkSize = "sm" | "default" | "lg";
export type LinkWeight = "normal" | "medium" | "semibold";
export type LinkIconPosition = "none" | "left" | "right";

export interface LinkProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "children"
> {
  /** Text content of the link */
  label: string;
  variant?: LinkVariant;
  size?: LinkSize;
  weight?: LinkWeight;
  /** Where the icon appears relative to the label. Defaults to "right". */
  iconPosition?: LinkIconPosition;
  /**
   * Custom icon node. When omitted:
   * - iconPosition "right" → ArrowRight
   * - iconPosition "left"  → ArrowRight (visually leads the label)
   * - iconPosition "none"  → no icon
   */
  icon?: React.ReactNode;
  /**
   * Convenience prop: adds target="_blank" and rel="noopener noreferrer"
   * and swaps the default icon for ExternalLink.
   */
  external?: boolean;
}

function Link({
  className,
  label,
  variant = "default",
  size = "default",
  weight = "medium",
  iconPosition = "right",
  icon,
  external = false,
  href,
  target,
  rel,
  ...props
}: LinkProps) {
  const resolvedTarget = external ? "_blank" : target;
  const resolvedRel = external ? "noopener noreferrer" : rel;

  const defaultIcon = external ? <ExternalLink /> : <ArrowRight />;
  const resolvedIcon = icon ?? defaultIcon;

  return (
    <a
      href={href}
      target={resolvedTarget}
      rel={resolvedRel}
      className={cn(
        linkVariants({ variant, size, weight, iconPosition }),
        className,
      )}
      {...props}
    >
      {iconPosition === "left" && resolvedIcon}
      {label}
      {iconPosition === "right" && resolvedIcon}
    </a>
  );
}

export { Link, linkVariants };
