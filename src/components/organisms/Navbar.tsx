import { Button } from "@/components/atoms/button";
import ThemeToggle from "@/components/molecules/ThemeToggle";
import { logo } from "@/assets/logo";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/molecules/dropdown-menu";
import { ChevronDown, Menu, X } from "lucide-react";
import { type sortedLinksProps } from "@/lib/dynamicNavLinks/dynamicNavLinkSorter";

export default function Navbar({ pages = [] }: { pages?: sortedLinksProps[] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [patientCornerOpen, setPatientCornerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change / resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? "shadow-sm bg-background/40" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="text-foreground [&_svg]:h-14 [&_svg]:w-auto [&_path]:fill-current [&_line]:stroke-current"
            >
              {logo}
            </a>
          </div>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            <li>
              <a
                data-slot="link"
                className="text-foreground text-sm inline-block"
                href="/#mapSection"
              >
                Locations
              </a>
            </li>
            {pages.length > 0 &&
              pages.map((page) => {
                if (!page.childLinks) {
                  return (
                    <li key={page.slug}>
                      <a
                        href={`/${page.slug}`}
                        className="text-foreground text-sm inline-block"
                      >
                        {page.name}
                      </a>
                    </li>
                  );
                } else if (page.childLinks) {
                  const patientCornerPages = page.childLinks;
                  return (
                    <li key={page.slug}>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="flex items-center gap-1 text-foreground text-sm outline-none hover:scale-[1.02] transition-transform">
                          {page.name}
                          <ChevronDown className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-56">
                          {patientCornerPages.map((childPage) => (
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
                }
              })}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button size="lg">Register New Patient</Button>
            <ThemeToggle />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              aria-label="Toggle menu"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="p-2 rounded-md text-foreground hover:bg-accent transition-colors"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
          <ul className="flex flex-col px-4 py-4 gap-1">
            <li>
              <a
                href="/#mapSection"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm text-foreground hover:text-primary transition-colors"
              >
                Locations
              </a>
            </li>
            <li>
              <a
                href="/new-patients"
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm text-foreground hover:text-primary transition-colors"
              >
                New Patients
              </a>
            </li>
            {patientCornerPages.length > 0 && (
              <li>
                <button
                  onClick={() => setPatientCornerOpen((prev) => !prev)}
                  className="flex items-center justify-between w-full py-2 text-sm text-foreground hover:text-primary transition-colors"
                >
                  Patient Corner
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${patientCornerOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {patientCornerOpen && (
                  <ul className="pl-4 flex flex-col gap-1 mt-1 mb-1">
                    {patientCornerPages.map((page) => (
                      <li key={page.slug}>
                        <a
                          href={`/patient-corner/${page.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {page.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )}
          </ul>
          <div className="px-4 pb-4">
            <Button
              size="lg"
              className="w-full"
              onClick={() => setMobileOpen(false)}
            >
              Register New Patient
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
