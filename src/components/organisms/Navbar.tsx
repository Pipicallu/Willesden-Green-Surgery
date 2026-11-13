import { useState } from "react";
import { ChevronDown, Menu, X, MapPin, Clock3, Phone } from "lucide-react";

import { logo } from "@/assets/logo";
import { Button } from "@/components/atoms/button";
import { type sortedLinksProps } from "@/lib/dynamicNavLinks/dynamicNavLinkSorter";

type NavbarProps = {
  pages?: sortedLinksProps[];
};

export default function Navbar({ pages = [] }: NavbarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [displayedMenu, setDisplayedMenu] = useState<string | null>(null);

  const activePage = pages.find((page) => page.slug === displayedMenu);

  const openMenu = (slug: string) => {
    setDisplayedMenu(slug);
    setActiveMenu(slug);
  };

  return (
    <div className="pointer-events-none flex flex-col items-center justify-center">
      {/* TOP INFORMATION BAR */}
      <div
        className="
          pointer-events-auto
          flex w-full items-center justify-between
          gap-6 rounded-t-2xl
          bg-muted px-6 py-2
          text-xs backdrop-blur-md
        "
      >
        {/* Address */}
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-icon" />

          <div className="h-6 overflow-hidden">
            <div className="animate-[slideAddresses_12s_ease-in-out_infinite]">
              <div className="h-6 whitespace-nowrap leading-6">
                Willesden Green | 59 Anson Road, London, England, NW2 3UY
              </div>

              <div className="h-6 whitespace-nowrap leading-6">
                Queen's Park | Albert Road, London, England, NW6 5DE
              </div>

              <div className="h-6 whitespace-nowrap leading-6">
                Willesden Green | 59 Anson Road, London, England, NW2 3UY
              </div>
            </div>
          </div>
        </div>

        {/* Opening hours and phone */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2">
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

          <span className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0 text-icon" />
            0208 208 4141
          </span>
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
        className="
           group/nav relative isolate
    pointer-events-auto
    w-fit max-w-[calc(100vw-2rem)]
    rounded-b-2xl
    bg-card
    shadow-xl shadow-primary/20
    backdrop-blur-md
        "
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
        <div className="mx-auto w-fit px-4 sm:px-6">
          <div className="flex h-18 items-center gap-6">
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
                        text-sm transition-colors
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
                        inline-block text-sm text-link
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
            <div className="flex shrink-0 items-center gap-2 md:hidden">
              <details className="group md:hidden">
                <summary
                  aria-label="Toggle menu"
                  className="
                    list-none rounded-full bg-icon-background p-2 text-icon
                    transition-colors hover:bg-icon-background/80
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-ring
                    focus-visible:ring-offset-2
                    [&::-webkit-details-marker]:hidden
                  "
                >
                  <Menu
                    aria-hidden="true"
                    className="h-5 w-5 group-open:hidden"
                  />
                  <X
                    aria-hidden="true"
                    className="hidden h-5 w-5 group-open:block"
                  />
                </summary>

                {/* MOBILE NAVIGATION */}
                <div
                  id="mobile-navigation"
                  className="
                    absolute inset-x-0 top-full
                    max-h-[calc(100svh-4rem)]
                    overflow-y-auto overscroll-contain
                    border-t border-border
                    bg-card
                  "
                >
                  <ul className="flex flex-col gap-1 px-4 py-4">
                    <li>
                      <a
                        href="/#mapSection"
                        className="
                          block py-2 text-sm text-link
                          transition-colors hover:text-foreground
                        "
                      >
                        Locations
                      </a>
                    </li>

                    {pages.map((page) => (
                      <li key={page.slug}>
                        {page.childLinks?.length ? (
                          <details className="group/submenu">
                            <summary
                              className="
                                flex w-full list-none items-center
                                justify-between py-2
                                text-sm text-link
                                transition-colors hover:text-foreground
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-ring
                                [&::-webkit-details-marker]:hidden
                              "
                            >
                              {page.name}

                              <ChevronDown
                                aria-hidden="true"
                                className="
                                  h-4 w-4 text-icon transition-transform
                                  group-open/submenu:rotate-180
                                "
                              />
                            </summary>

                            <ul className="mb-1 mt-1 flex flex-col gap-1 pl-4">
                              {page.childLinks.map((childPage) => (
                                <li key={childPage.slug}>
                                  <a
                                    href={`/${childPage.slug}`}
                                    className="
                                      block py-1.5 text-sm
                                      text-link
                                      transition-colors hover:text-foreground
                                    "
                                  >
                                    {childPage.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </details>
                        ) : (
                          <a
                            href={`/${page.slug}`}
                            className="
                              block py-2 text-sm text-link
                              transition-colors hover:text-foreground
                            "
                          >
                            {page.name}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>

                  <div className="px-4 pb-4">
                    <a
                      href="/new-patients"
                      className="
                        block w-full rounded-full
                        bg-primary px-6 py-2 text-center
                        text-sm font-medium text-primary-foreground
                      "
                    >
                      Register New Patient
                    </a>
                  </div>
                </div>
              </details>
            </div>
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
              <h3
                className="
                  mb-6 text-xs font-semibold
                  uppercase tracking-widest
                "
              >
                {activePage?.name}
              </h3>

              <ul className="grid grid-cols-2 gap-x-12 gap-y-4">
                {activePage?.childLinks?.map((child) => (
                  <li key={child.slug}>
                    <a
                      href={`/${child.slug}`}
                      tabIndex={activeMenu ? 0 : -1}
                      className="
                        text-sm text-link
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
    </div>
  );
}
