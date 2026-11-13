import * as React from "react";
import { cn } from "@/lib/utils";

export type BannerVariant = "info" | "warning" | "alert";
export type BannerWidth = "full" | "contained";
export type BannerSpacing = "none" | "sm" | "md" | "lg" | "xl";

const spacingClasses: Record<BannerSpacing, string> = {
  none: "py-0",
  sm: "py-2",
  md: "py-4",
  lg: "py-8",
  xl: "py-16",
};

// Share the site palette while retaining distinct icons for each notice type.
const noticeStyle = {
  border: "hsl(var(--secondary))",
  bg: "hsl(var(--card) / 0.9)",
  text: "hsl(var(--foreground))",
  icon: "hsl(var(--secondary))",
};
const variantStyles = {
  info: noticeStyle,
  warning: noticeStyle,
  alert: { ...noticeStyle, border: "hsl(var(--destructive))", icon: "hsl(var(--destructive))" },
};

// Icons
function InfoIcon({ color }: { color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
      className="size-5 shrink-0 mt-0.5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function WarningIcon({ color }: { color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={color}
      className="size-5 shrink-0 mt-0.5"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BannerVariant;
  width?: BannerWidth;
  spacing?: BannerSpacing;
  title?: string;
  children: React.ReactNode;
}

export function Banner({
  variant = "info",
  width = "full",
  spacing = "none",
  title,
  children,
  className,
  ...props
}: BannerProps) {
  const v = variantStyles[variant];

  return (
    <div
      className={cn(
        spacingClasses[spacing],
        width === "contained" && "mx-auto max-w-3xl",
        className,
      )}
      {...props}
    >
      <div
        className="rounded-lg border border-l-4 p-4 flex gap-3"
        style={{
          borderColor: v.border,
          borderLeftColor: v.border,
          backgroundColor: v.bg,
        }}
      >
        {/* Icon */}
        {variant === "info" ? (
          <InfoIcon color={v.icon} />
        ) : (
          <WarningIcon color={v.icon} />
        )}
        {/* alert also uses WarningIcon — handled above since both non-info variants share it */}

        {/* Content */}
        <div className="flex-1 space-y-1">
          {title && (
            <p
              className="text-sm font-semibold leading-snug"
              style={{ color: v.text }}
            >
              {title}
            </p>
          )}
          <div className="text-sm leading-relaxed" style={{ color: v.text }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
