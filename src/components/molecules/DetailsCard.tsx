import { cn } from "@/lib/utils";
import { Detail } from "@/components/atoms/Detail";

export interface DetailItem {
  title: string;
  value: string;
  /** Pass an href to make the value a link. For phone numbers use "tel:...", for emails use "mailto:..." */
  href?: string;
  divider?: "hr" | "border-bottom" | false;
}

export interface DetailsCardProps {
  heading: string;
  description?: string;
  details: DetailItem[];
  className?: string;
  alertVariant?: boolean;
}

export function DetailsCard({
  heading,
  description,
  details,
  className,
  alertVariant = false,
}: DetailsCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-6 mb-8 mt-8 shadow-sm space-y-2",
        alertVariant
          ? "border-l-4 border-destructive bg-destructive/5"
          : "border-border",
        className,
      )}
    >
      <h3
        className={cn(
          "text-lg font-bold flex items-center gap-2",
          alertVariant ? "text-destructive" : "text-foreground",
        )}
      >
        {alertVariant && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 shrink-0"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {heading}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground pb-2">{description}</p>
      )}
      <div>
        {details.map((item, index) => (
          <Detail
            key={index}
            title={item.title}
            value={item.value}
            href={item.href}
            divider={item.divider ?? "border-bottom"}
          />
        ))}
      </div>
    </div>
  );
}
