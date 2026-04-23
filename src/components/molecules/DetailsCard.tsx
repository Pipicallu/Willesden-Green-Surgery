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
}

export function DetailsCard({
  heading,
  description,
  details,
  className,
}: DetailsCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-6 shadow-sm space-y-2",
        className,
      )}
    >
      <h3 className="text-lg font-bold text-foreground">{heading}</h3>
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
