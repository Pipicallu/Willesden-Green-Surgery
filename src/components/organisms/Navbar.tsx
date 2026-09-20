import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

import { logo } from "@/assets/logo";
import { Button } from "@/components/atoms/button";
import ThemeToggle from "@/components/molecules/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/molecules/dropdown-menu";
import { type sortedLinksProps } from "@/lib/dynamicNavLinks/dynamicNavLinkSorter";

type NavbarProps = {
  pages?: sortedLinksProps[];
};

export default function Navbar({ pages = [] }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Handles Safari restoring the page at an existing scroll position.
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className={`
        fixed inset-x-0 top-0 z-50 isolate
        pt-[env(safe-area-inset-top)]
        bg-background
        md:bg-background/75 md:backdrop-blur-md
        transition-shadow duration-300
        ${isScrolled ? "shadow-sm" : ""}
      `}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            aria-label="Willesden Green Surgery home"
            className="
              flex min-w-0 items-center text-foreground
              [&_svg]:h-auto [&_svg]:max-h-14 [&_svg]:max-w-full [&_svg]:w-auto
              [&_path]:fill-current
              [&_line]:stroke-current
            "
          >
            {logo}
          </a>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-8 md:flex">
            <li>
              <a
                href="/#mapSection"
                className="
                  inline-block text-sm text-foreground
                  transition-colors hover:text-primary
                "
              >
                Locations
              </a>
            </li>

            {pages.map((page) => {
              if (!page.childLinks?.length) {
                return (
                  <li key={page.slug}>
                    <a
                      href={`/${page.slug}`}
                      className="
                        inline-block text-sm text-foreground
                        transition-colors hover:text-primary
                      "
                    >
                      {page.name}
                    </a>
                  </li>
                );
              }

              return (
                <li key={page.slug}>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="
                        flex items-center gap-1 text-sm text-foreground
                        outline-none transition-colors hover:text-primary
                        focus-visible:ring-2 focus-visible:ring-ring
                        focus-visible:ring-offset-2
                      "
                    >
                      {page.name}

                      <ChevronDown aria-hidden="true" className="h-4 w-4" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start" className="w-56">
                      {page.childLinks.map((childPage) => (
                        <DropdownMenuItem key={childPage.slug} asChild>
                          <a
                            href={`/${childPage.slug}`}
                            className="cursor-pointer"
                          >
                            {childPage.name}
                          </a>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              );
            })}
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            <Button
              size="lg"
              onClick={() => {
                window.location.href = "/new-patients";
              }}
            >
              Register New Patient
            </Button>

            <ThemeToggle />
          </div>

          {/* Mobile actions */}
          <div className="flex shrink-0 items-center gap-2 md:hidden">
            <ThemeToggle />

            <details className="group md:hidden">
              <summary
                aria-label="Toggle menu"
                className="
                  list-none rounded-md p-2 text-foreground
                  transition-colors hover:bg-accent
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-ring focus-visible:ring-offset-2
                  [&::-webkit-details-marker]:hidden
                "
              >
                <Menu aria-hidden="true" className="h-5 w-5 group-open:hidden" />
                <X aria-hidden="true" className="hidden h-5 w-5 group-open:block" />
              </summary>

              {/* Mobile navigation remains usable before React hydrates. */}
              <div
                id="mobile-navigation"
                className="
                  absolute inset-x-0 top-full
                  max-h-[calc(100svh-4rem)]
                  overflow-y-auto overscroll-contain
                  border-t border-border
                  bg-background
                "
              >
                <ul className="flex flex-col gap-1 px-4 py-4">
                  <li>
                    <a
                      href="/#mapSection"
                      className="block py-2 text-sm text-foreground transition-colors hover:text-primary"
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
                              flex w-full list-none items-center justify-between py-2
                              text-sm text-foreground transition-colors hover:text-primary
                              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                              [&::-webkit-details-marker]:hidden
                            "
                          >
                            {page.name}
                            <ChevronDown
                              aria-hidden="true"
                              className="h-4 w-4 transition-transform group-open/submenu:rotate-180"
                            />
                          </summary>
                          <ul className="mb-1 mt-1 flex flex-col gap-1 pl-4">
                            {page.childLinks.map((childPage) => (
                              <li key={childPage.slug}>
                                <a
                                  href={`/${childPage.slug}`}
                                  className="block py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
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
                          className="block py-2 text-sm text-foreground transition-colors hover:text-primary"
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
                    className="block w-full rounded-md bg-primary px-6 py-2 text-center text-sm font-medium text-primary-foreground"
                  >
                    Register New Patient
                  </a>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </nav>
  );
}
