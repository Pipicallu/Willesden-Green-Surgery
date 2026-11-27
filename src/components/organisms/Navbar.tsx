import { useEffect, useId, useState } from "react";
import { MapPin, Clock3, Phone, ChevronUp } from "lucide-react";
import { logo } from "@/assets/logo";
import { Button } from "@/components/atoms/button";
import MobileNavigation from "@/components/organisms/MobileNavigation";
import { type sortedLinksProps } from "@/lib/dynamicNavLinks/dynamicNavLinkSorter";

type NavbarProps = {
  pages?: sortedLinksProps[];
};

export default function Navbar({ pages = [] }: NavbarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [displayedMenu, setDisplayedMenu] = useState<string | null>(null);
  const [isInformationExpanded, setIsInformationExpanded] = useState(false);
  const informationId = useId();

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const syncInformationVisibility = () => {
      setIsInformationExpanded(desktop.matches);
    };

    syncInformationVisibility();
    desktop.addEventListener("change", syncInformationVisibility);
    return () => desktop.removeEventListener("change", syncInformationVisibility);
  }, []);

  const activePage = pages.find((page) => page.slug === displayedMenu);

  const openMenu = (slug: string) => {
    setDisplayedMenu(slug);
    setActiveMenu(slug);
  };

  return (
    <div className="pointer-events-none relative mx-auto flex w-full flex-col items-center justify-center max-md:rounded-b-2xl max-md:bg-white max-md:shadow-md max-md:shadow-primary/20 md:w-auto">
      {/* Contact details drop below the mobile nav and sit above it on desktop. */}
      <div className="pointer-events-auto order-2 w-full md:order-1">
        <div
          id={informationId}
          aria-hidden={!isInformationExpanded}
          inert={!isInformationExpanded}
          className={`grid transition-[grid-template-rows,opacity] duration-200 ease-in-out motion-reduce:transition-none ${
            isInformationExpanded
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              className="
                pointer-events-auto
                max-md:[contain:inline-size]
                flex flex-col md:flex-row w-full md:items-center justify-between
                gap-2 md:gap-6 rounded-b-2xl md:rounded-b-none md:rounded-t-2xl
                bg-white px-6 pb-6 pt-3 md:bg-muted md:py-2
                small-label backdrop-blur-md
              "
            >
              {/* Address */}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-icon" />

                <div className="h-6 overflow-hidden">
                  <div className="animate-[slideAddresses_12s_ease-in-out_infinite]">
                    <div className="h-6 whitespace-nowrap leading-6">
                      <a
                        className="cursor-pointer"
                        target="_blank"
                        aria-label="Willesden Green Surgery Location"
                        href="https://www.google.com/maps/dir/?api=1&destination=59+Anson+Road,+London,+England+NW2+3UY"
                      >
                        {" "}
                        Willesden Green | 59 Anson Road, London, England, NW2 3UY
                      </a>
                    </div>

                    <div className="h-6 whitespace-nowrap leading-6">
                      <a
                        className="cursor-pointer"
                        target="_blank"
                        aria-label="Queen's Park Surgery Location"
                        href="https://www.google.com/maps/dir/?api=1&destination=Queen's+Park,+London,+England+NW6+5DE"
                      >
                        {" "}
                        Queen's Park | Albert Road, London, England, NW6 5DE
                      </a>
                    </div>

                    <div className="h-6 whitespace-nowrap leading-6">
                      <a
                        className="cursor-pointer"
                        target="_blank"
                        aria-label="Willesden Green Surgery Location"
                        href="https://www.google.com/maps/dir/?api=1&destination=59+Anson+Road,+London,+England+NW2+3UY"
                      >
                        {" "}
                        Willesden Green | 59 Anson Road, London, England, NW2 3UY
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Opening hours and phone */}
              <div className="flex items-center gap-10">
                <div className="flex min-w-0 items-center gap-2">
                  <Clock3 className="h-4 w-4 shrink-0 text-icon" />

                  <div className="h-6 overflow-hidden">
                    <div className="animate-[slideAddresses_12s_ease-in-out_infinite]">
                      <div className="h-6 whitespace-nowrap leading-6">
                        Mon-Fri 8am-6:30pm | Sat 10am-1pm
                      </div>

                      <div className="h-6 whitespace-nowrap leading-6">
                        Mon-Fri 9am-5pm | Sat Closed
                      </div>

                      <div className="h-6 whitespace-nowrap leading-6">
                        Mon-Fri 8am-6:30pm | Sat 10am-1pm
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-icon" />
                <a
                  className="cursor-pointer"
                  target="_blank"
                  aria-label="Willesden Green Surgery Phone Number"
                  href="tel:02082084141"
                >
                  0208 208 4141
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <nav
        aria-label="Main navigation"
        onMouseLeave={() => setActiveMenu(null)}
        onPointerMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();

          event.currentTarget.style.setProperty(
            "--mouse-x",
            `${event.clientX - rect.left}px`,
          );

          event.currentTarget.style.setProperty(
            "--mouse-y",
            `${event.clientY - rect.top}px`,
          );
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            setActiveMenu(null);
          }
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setActiveMenu(null);
          }
        }}
        className={`
           group/nav relative isolate order-1 md:order-2
    pointer-events-auto
    w-full md:w-fit md:max-w-[calc(100vw-2rem)]
    rounded-b-2xl ${isInformationExpanded ? "" : "md:rounded-t-2xl"}
    bg-card
    md:shadow-md md:shadow-primary/20
    backdrop-blur-md
        `}
      >
        <div
          aria-hidden="true"
          className="
      pointer-events-none absolute inset-0 z-0
      opacity-0 transition-opacity duration-200
      group-hover/nav:opacity-100
    "
          style={{
            background: `
        radial-gradient(
          400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
          color-mix(in srgb, var(--secondary) 18%, transparent),
          transparent 70%
        )
      `,
          }}
        />
        {/* MAIN NAVIGATION ROW */}
        <div className="mx-auto w-full px-4 sm:px-6 md:w-fit">
          <div className="flex h-18 items-center justify-between gap-6 md:justify-start">
            {/* Logo */}
            <a
              href="/"
              aria-label="Willesden Green Surgery home"
              className="
                flex min-w-0 items-center text-foreground
                [&_svg]:h-auto
                [&_svg]:max-h-14
                [&_svg]:max-w-full
                [&_svg]:w-auto
                [&_path]:fill-current
                [&_line]:stroke-current
              "
            >
              {logo}
            </a>

            {/* DESKTOP NAVIGATION */}
            <ul className="hidden items-center gap-8 md:flex">
              {pages.map((page) => (
                <li key={page.slug}>
                  {page.childLinks?.length ? (
                    <button
                      type="button"
                      onMouseEnter={() => openMenu(page.slug)}
                      onFocus={() => openMenu(page.slug)}
                      onClick={() =>
                        activeMenu === page.slug
                          ? setActiveMenu(null)
                          : openMenu(page.slug)
                      }
                      aria-expanded={activeMenu === page.slug}
                      aria-controls="nav-expanded-menu"
                      className={`
                        transition-colors
                        hover:text-foreground
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-ring
                        ${
                          activeMenu === page.slug
                            ? "text-foreground"
                            : "text-link"
                        }
                      `}
                    >
                      {page.name}
                    </button>
                  ) : (
                    <a
                      href={`/${page.slug}`}
                      onMouseEnter={() => setActiveMenu(null)}
                      className="
                        inline-block text-link
                        transition-colors hover:text-foreground
                      "
                    >
                      {page.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* DESKTOP ACTIONS */}
            <div className="hidden items-center gap-2 md:flex">
              <Button
                size="lg"
                onClick={() => {
                  window.location.href = "/new-patients";
                }}
              >
                Register New Patient
              </Button>
            </div>

            {/* MOBILE ACTIONS */}
            <MobileNavigation pages={pages} />
          </div>
        </div>

        {/* EXPANDING DESKTOP NAVIGATION */}
        <div
          id="nav-expanded-menu"
          aria-hidden={!activeMenu}
          className={activeMenu ? "hidden md:block" : "hidden"}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="px-8 py-8">
              <h3 className="small-label mb-6 uppercase tracking-widest">
                {activePage?.name}
              </h3>

              <ul className="grid grid-cols-2 gap-x-12 gap-y-4">
                {activePage?.childLinks?.map((child) => (
                  <li key={child.slug}>
                    <a
                      href={`/${child.slug}`}
                      tabIndex={activeMenu ? 0 : -1}
                      className="
                        text-link
                        transition-colors hover:text-foreground
                      "
                    >
                      {child.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <button
        type="button"
        aria-label={`${isInformationExpanded ? "Hide" : "Show"} practice information`}
        aria-expanded={isInformationExpanded}
        aria-controls={informationId}
        onClick={() => setIsInformationExpanded((expanded) => !expanded)}
        className="pointer-events-auto absolute -bottom-4 left-1/2 z-20 flex size-8 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-icon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:hidden"
      >
        {!isInformationExpanded && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full border border-icon opacity-0 motion-safe:animate-[information-ping_3s_ease-out_infinite] motion-reduce:hidden"
          />
        )}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 rounded-b-full border border-t-0 border-border"
        />
        <ChevronUp
          aria-hidden="true"
          className={`size-4 transition-transform duration-200 motion-reduce:transition-none ${
            isInformationExpanded ? "" : "rotate-180"
          }`}
        />
      </button>
    </div>
  );
}
