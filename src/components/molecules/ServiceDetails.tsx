import { UserRound, X } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { ImageCard } from "@/components/atoms/ImageCard";
import type { Service } from "@/data/services";

type ServiceDetailsProps = {
  service: Service;
  onClose: () => void;
  triggerId?: string;
};

export default function ServiceDetails({
  service,
  onClose,
  triggerId,
}: ServiceDetailsProps) {
  return (
    <section
      id="service-details"
      role="region"
      aria-labelledby={triggerId ?? "service-details-heading"}
      tabIndex={-1}
      className="mt-6 scroll-mt-40 rounded-2xl border border-primary/10 bg-card p-4 font-sans text-base font-normal leading-normal tracking-normal sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-2">
          <h3
            id="service-details-heading"
            className="text-2xl leading-snug text-foreground"
          >
            {service.name}
          </h3>
          {service.description && service.clinicians.length > 0 && (
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          )}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon-lg"
          onClick={onClose}
          aria-label="Close service details"
          className="-mr-1 -mt-1 shrink-0"
        >
          <X className="size-5" aria-hidden="true" />
        </Button>
      </div>

      {service.clinicians.length > 0 ? (
        <div
          className={
            service.clinicians.length > 1
              ? "mt-6 grid gap-6 xl:grid-cols-2"
              : "mt-6 grid gap-6"
          }
        >
          {service.clinicians.map((clinician) => (
            <article
              key={clinician.name}
              className="grid min-w-0 gap-5 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)] sm:items-start"
            >
              {clinician.photo ? (
                <ImageCard
                  src={clinician.photo}
                  alt={clinician.name}
                  ratio="portrait"
                  fit="cover"
                  radius="xl"
                  shadow="none"
                  style={{ aspectRatio: "4 / 5" }}
                  className="max-w-48 border-0 bg-muted [&_img]:object-top sm:max-w-none"
                />
              ) : (
                <div className="flex aspect-[4/5] max-w-48 flex-col items-center justify-center gap-3 rounded-xl bg-muted p-4 text-center sm:max-w-none">
                  <UserRound className="size-12 text-icon" aria-hidden="true" />
                  <span className="text-sm text-muted-foreground">
                    Photo to be confirmed
                  </span>
                </div>
              )}
              <div className="min-w-0 space-y-3">
                <div className="space-y-1">
                  <h4 className="card-title text-foreground">{clinician.name}</h4>
                  <p className="small-label text-icon">{clinician.role}</p>
                </div>
                <p className="text-base leading-relaxed text-muted-foreground">
                  {clinician.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-5 space-y-2 rounded-xl bg-muted p-5">
          <p className="font-semibold text-foreground">Details to be confirmed.</p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Please contact the practice for more information about this service.
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-border pt-5">
        <Button
          href="https://accurx.nhs.uk/patient-initiated/E84702"
          target="_blank"
          size="lg"
          className="h-auto min-h-11 px-5 py-2.5"
        >
          Contact the practice
        </Button>
      </div>
    </section>
  );
}
