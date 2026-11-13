import { cn } from "@/lib/utils";

export interface DetailProps {
  title: string;
  value: string;
  divider?: "hr" | "border-bottom" | false;
  href?: string;
  className?: string;
}

export function Detail({
  title,
  value,
  divider = false,
  href,
  className,
}: DetailProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <div className="flex flex-col gap-1 py-2">
        <h5 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {title}
        </h5>
        {href ? (
          <a
            href={href}
            className="text-sm text-link underline underline-offset-4 hover:text-foreground transition-colors"
          >
            {value}
          </a>
        ) : (
          <span className="text-sm text-foreground">{value}</span>
        )}
      </div>

      {divider === "hr" && <hr className="border-border" />}
      {divider === "border-bottom" && (
        <div className="border-b border-border" />
      )}
    </div>
  );
}
