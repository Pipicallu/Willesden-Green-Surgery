import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-base font-sans font-semibold leading-[1.2] tracking-button transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20",
        outline:
          "border border-secondary bg-background text-link shadow-xs hover:bg-muted hover:text-foreground [&_svg]:text-icon",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-primary",
        ghost:
          "hover:bg-muted hover:text-foreground [&_svg]:text-icon",
        link: "text-link underline underline-offset-4 hover:text-foreground [&_svg]:text-icon",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-8 has-[>svg]:px-6",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
      align: {
        start: "block w-fit ml-0 mr-auto",
        center: "block w-fit mx-auto",
        end: "block w-fit ml-auto mr-0",
      },
      spacing: {
        none: "",
        sm: "mt-4",
        md: "mt-8",
        lg: "mt-12",
        xl: "mt-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type Variants = VariantProps<typeof buttonVariants>;

export type ButtonVariant = NonNullable<Variants["variant"]>;
export type ButtonSize = NonNullable<Variants["size"]>;
export type ButtonAlign = NonNullable<Variants["align"]>;
export type ButtonSpacing = NonNullable<Variants["spacing"]>;

export interface ButtonProps extends React.ComponentProps<"button">, Variants {
  asChild?: boolean;
  /** Renders the button as an <a> element when provided */
  href?: string;
  target?: string;
  rel?: string;
  /** Convenience prop for text content (falls back to children) */
  label?: string;
}

function Button({
  className,
  variant = "default",
  size = "default",
  align,
  spacing,
  asChild = false,
  href,
  target,
  rel,
  label,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    buttonVariants({ variant, size, align, spacing }),
    className,
    "leading-[1.2]",
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        data-slot="button"
        data-variant={variant}
        data-size={size}
        className={classes}
      >
        {label ?? children}
      </a>
    );
  }

  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={classes}
      {...props}
    >
      {label ?? children}
    </Comp>
  );
}

export { Button, buttonVariants };
