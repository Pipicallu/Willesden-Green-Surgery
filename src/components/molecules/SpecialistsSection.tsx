import { type CSSProperties, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/atoms/button";
import ServiceDetails from "@/components/molecules/ServiceDetails";
import { DEFAULT_SERVICE_ID, services } from "@/data/services";

const SERVICE_INTERVAL_MS = 3000;
const firstServiceIndex = Math.max(
  0,
  services.findIndex((service) => service.id === DEFAULT_SERVICE_ID),
);
const rotatingServices = [
  ...services.slice(firstServiceIndex),
  ...services.slice(0, firstServiceIndex),
];
const slides = [...rotatingServices, rotatingServices[0]];
const serviceCycleDuration = `${rotatingServices.length * SERVICE_INTERVAL_MS}ms`;
// Each service holds for 2.625s, then shifts to the next row over 0.375s.
const serviceKeyframes = [
  ...rotatingServices.map((_, index) => {
    const start = (index / rotatingServices.length) * 100;
    const hold = ((index + 0.875) / rotatingServices.length) * 100;
    const position = (-index / slides.length) * 100;
    return `${start}%, ${hold}% { transform: translateY(${position}%); }`;
  }),
  `100% { transform: translateY(${(-rotatingServices.length / slides.length) * 100}%); }`,
].join("\n");
const detailsContainerId = "service-details-container";

export default function SpecialistsSection() {
  const [selectedServiceId, setSelectedServiceId] =
    useState(DEFAULT_SERVICE_ID);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [isRotating, setIsRotating] = useState(true);
  const titleTrackRef = useRef<HTMLDivElement>(null);
  const rotationEnabledRef = useRef(true);
  const selectedService =
    services.find((service) => service.id === selectedServiceId) ?? services[0];
  const selectedTriggerId = `services-${selectedService.id}`;
  const selectedIndex = rotatingServices.findIndex(
    (service) => service.id === selectedService.id,
  );
  const rotationStyle: CSSProperties = {
    transform: `translateY(${(-(isRotating ? 0 : selectedIndex) / slides.length) * 100}%)`,
  };

  function stopRotation(id: string) {
    rotationEnabledRef.current = false;
    setIsRotating(false);
    setSelectedServiceId(id);
  }

  useEffect(() => {
    function selectFromHash() {
      const id = window.location.hash.replace(/^#services-/, "");
      if (services.some((service) => service.id === id)) {
        stopRotation(id);
        setDetailsOpen(true);
      }
    }

    selectFromHash();
    window.addEventListener("hashchange", selectFromHash);
    return () => window.removeEventListener("hashchange", selectFromHash);
  }, []);

  useEffect(() => {
    const track = titleTrackRef.current;
    if (!track || !isRotating) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;

    const followRotation = () => {
      window.cancelAnimationFrame(frameId);
      if (!rotationEnabledRef.current) return;

      if (reducedMotion.matches) {
        setSelectedServiceId(rotatingServices[0].id);
        return;
      }

      const animation = track.getAnimations().find(
        (animation) =>
          animation instanceof CSSAnimation &&
          animation.animationName === "slideServices",
      );
      if (!animation) return;

      let previousIndex = -1;

      const updateActiveService = () => {
        if (!rotationEnabledRef.current) return;
        const currentTime = animation.currentTime;

        if (typeof currentTime === "number") {
          const elapsed = Math.max(0, currentTime);
          const index =
            Math.floor(elapsed / SERVICE_INTERVAL_MS) % rotatingServices.length;

          if (index !== previousIndex) {
            previousIndex = index;
            setSelectedServiceId(rotatingServices[index].id);
          }
        }

        frameId = window.requestAnimationFrame(updateActiveService);
      };

      frameId = window.requestAnimationFrame(updateActiveService);
    };

    followRotation();
    reducedMotion.addEventListener("change", followRotation);
    return () => {
      window.cancelAnimationFrame(frameId);
      reducedMotion.removeEventListener("change", followRotation);
    };
  }, [isRotating]);

  function selectService(id: string) {
    stopRotation(id);
    setDetailsOpen(true);
    window.history.replaceState(null, "", `#services-${id}`);
  }

  function closeDetails() {
    setDetailsOpen(false);
    document.getElementById(selectedTriggerId)?.focus({ preventScroll: true });
  }

  return (
    <section
      id="services"
      className="mx-auto w-full max-w-6xl rounded-2xl bg-muted p-3 text-left sm:p-6 lg:p-8"
      aria-labelledby="services-title"
      style={
        { "--service-cycle-duration": serviceCycleDuration } as CSSProperties
      }
    >
      <div className="font-serif text-4xl font-normal tracking-section leading-[1.1] sm:text-2xl lg:text-5xl">
        <div className="min-w-0">
          <h2
            id="services-title"
            className="text-4xl leading-[1.1] sm:text-2xl lg:text-5xl lg:mb-4"
          >
            Do you need
          </h2>
          <div className="text-[var(--deep-teal)] [--service-row-height:2.6em] sm:[--service-row-height:1.5em]">
            <div className="h-[var(--service-row-height)] overflow-hidden">
              <div
                ref={titleTrackRef}
                aria-hidden="true"
                data-service-track="titles"
                className={`motion-reduce:animate-none ${
                  isRotating
                    ? "animate-[slideServices_var(--service-cycle-duration)_ease-in-out_infinite]"
                    : ""
                }`}
                style={rotationStyle}
              >
                {slides.map((service, index) => (
                  <div
                    key={`${service.id}-${index}`}
                    className="flex h-[var(--service-row-height)] items-start py-[0.2em]"
                  >
                    <a
                      href={service.href}
                      tabIndex={-1}
                      className="block w-fit max-w-full cursor-pointer [overflow-wrap:anywhere]"
                      onClick={(event) => {
                        event.preventDefault();
                        selectService(service.id);
                      }}
                    >
                      {service.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          Select a service to stop the rotation and read about the clinician.
        </p>
        <Button
          type="button"
          size="lg"
          className="h-12 gap-3 px-6"
          aria-expanded={detailsOpen}
          aria-controls={detailsContainerId}
          onClick={() => setDetailsOpen((open) => !open)}
        >
          {detailsOpen ? "Hide service details" : "View service details"}
          {detailsOpen ? (
            <ChevronUp className="size-4" aria-hidden="true" />
          ) : (
            <ChevronDown className="size-4" aria-hidden="true" />
          )}
        </Button>
      </div>
      <nav
        aria-label="Our in-house services"
        className="mt-6 border-t border-primary/10 pt-4"
      >
        <ul className="flex flex-wrap gap-2">
          {services.map((service) => {
            const isSelected = selectedService.id === service.id;

            return (
              <li key={service.id}>
                <Button
                  id={`services-${service.id}`}
                  type="button"
                  variant={isSelected ? "default" : "ghost"}
                  size="sm"
                  aria-pressed={isSelected}
                  aria-expanded={detailsOpen && isSelected}
                  aria-controls={detailsContainerId}
                  onClick={() => selectService(service.id)}
                  className={`h-auto max-w-full scroll-mt-40 whitespace-normal rounded-full px-3 py-2 text-left text-sm ${
                    isSelected
                      ? ""
                      : "bg-card text-[var(--deep-teal)] hover:bg-accent"
                  }`}
                >
                  {service.label}
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div
        id={detailsContainerId}
        hidden={!detailsOpen}
        onFocusCapture={() => stopRotation(selectedService.id)}
      >
        {detailsOpen && (
          <ServiceDetails
            key={selectedService.id}
            service={selectedService}
            onClose={closeDetails}
            triggerId={selectedTriggerId}
          />
        )}
      </div>
      <style>{`@keyframes slideServices {\n${serviceKeyframes}\n}`}</style>
    </section>
  );
}
