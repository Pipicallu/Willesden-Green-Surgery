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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null,
  );

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

  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
        setOpenMobileDropdown(null);
      }
    };

    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 150);
    };

    window.addEventListener("resize", debouncedResize);

    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenMobileDropdown(null);
  };

  const toggleMobileDropdown = (slug: string) => {
    setOpenMobileDropdown((currentSlug) =>
      currentSlug === slug ? null : slug,
    );
  };

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

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => {
                setMobileOpen((current) => !current);
              }}
              className="
                rounded-md p-2 text-foreground
                transition-colors hover:bg-accent
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2
              "
            >
              {mobileOpen ? (
                <X aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="
            max-h-[calc(100svh-4rem)]
            overflow-y-auto overscroll-contain
            border-t border-border
            bg-background
            md:hidden
          "
        >
          <ul className="flex flex-col gap-1 px-4 py-4">
            <li>
              <a
                href="/#mapSection"
                onClick={closeMobileMenu}
                className="
                  block py-2 text-sm text-foreground
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
                      onClick={closeMobileMenu}
                      className="
                        block py-2 text-sm text-foreground
                        transition-colors hover:text-primary
                      "
                    >
                      {page.name}
                    </a>
                  </li>
                );
              }

              const dropdownId = `mobile-dropdown-${page.slug}`;
              const isDropdownOpen = openMobileDropdown === page.slug;

              return (
                <li key={page.slug}>
                  <button
                    type="button"
                    aria-expanded={isDropdownOpen}
                    aria-controls={dropdownId}
                    onClick={() => toggleMobileDropdown(page.slug)}
                    className="
                      flex w-full items-center justify-between py-2
                      text-sm text-foreground
                      transition-colors hover:text-primary
                      focus-visible:outline-none focus-visible:ring-2
                      focus-visible:ring-ring
                    "
                  >
                    {page.name}

                    <ChevronDown
                      aria-hidden="true"
                      className={`
                        h-4 w-4 transition-transform
                        ${isDropdownOpen ? "rotate-180" : ""}
                      `}
                    />
                  </button>

                  {isDropdownOpen && (
                    <ul
                      id={dropdownId}
                      className="mb-1 mt-1 flex flex-col gap-1 pl-4"
                    >
                      {page.childLinks.map((childPage) => (
                        <li key={childPage.slug}>
                          <a
                            href={`/${childPage.slug}`}
                            onClick={closeMobileMenu}
                            className="
                              block py-1.5 text-sm text-muted-foreground
                              transition-colors hover:text-primary
                            "
                          >
                            {childPage.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="px-4 pb-4">
            <Button
              size="lg"
              className="w-full"
              onClick={() => {
                closeMobileMenu();
                window.location.href = "/new-patients";
              }}
            >
              Register New Patient
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
