import { useEffect, useState } from "react";
import { Dialog } from "radix-ui";
import { ChevronDown, Menu, X } from "lucide-react";
import { logo } from "@/assets/logo";
import { Button } from "@/components/atoms/button";
import { type sortedLinksProps } from "@/lib/dynamicNavLinks/dynamicNavLinkSorter";

type MobileNavigationProps = {
  pages: sortedLinksProps[];
};

export default function MobileNavigation({ pages }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setIsOpen(false);
    };

    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="
            shrink-0 rounded-full bg-icon-background p-2 text-icon md:hidden
            transition-colors hover:bg-icon-background/80
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-ring focus-visible:ring-offset-2
          "
        >
          <Menu aria-hidden="true" className="h-5 w-5" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className="
            fixed inset-0 z-[60] bg-primary/35 backdrop-blur-sm md:hidden
            duration-200
            data-[state=open]:animate-in data-[state=open]:fade-in-0
            data-[state=closed]:animate-out data-[state=closed]:fade-out-0
            motion-reduce:animate-none!
          "
        />
        <Dialog.Content
          aria-describedby={undefined}
          className="
            fixed inset-y-0 left-0 z-[70] flex h-dvh w-80 max-w-[calc(100vw-3rem)]
            flex-col rounded-r-3xl bg-card text-foreground shadow-2xl outline-none md:hidden
            data-[state=open]:animate-in data-[state=open]:slide-in-from-left
            data-[state=open]:duration-300
            data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left
            data-[state=closed]:duration-200
            motion-reduce:animate-none!
          "
        >
          <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>

          <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-6 py-6">
            <a
              href="/"
              aria-label="Willesden Green Surgery home"
              onClick={closeMenu}
              className="flex min-w-0 flex-1 items-center text-foreground [&_svg]:h-auto [&_svg]:max-w-full [&_svg]:w-full [&_path]:fill-current [&_line]:stroke-current"
            >
              {logo}
            </a>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="
                  shrink-0 rounded-full bg-icon-background p-2 text-icon
                  transition-colors hover:bg-icon-background/80
                  focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-ring focus-visible:ring-offset-2
                "
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
          >
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="/#mapSection"
                  onClick={closeMenu}
                  className="block py-2 text-link transition-colors hover:text-foreground"
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
                          small-label flex w-full cursor-pointer list-none items-center
                          justify-between gap-2 py-2 uppercase tracking-widest text-link
                          transition-colors hover:text-foreground
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
                          [&::-webkit-details-marker]:hidden
                        "
                      >
                        {page.name}
                        <ChevronDown
                          aria-hidden="true"
                          className="h-4 w-4 shrink-0 text-icon transition-transform group-open/submenu:rotate-180"
                        />
                      </summary>
                      <ul className="mb-1 mt-2 flex flex-col gap-2 pb-3">
                        {page.childLinks.map((childPage) => (
                          <li key={childPage.slug}>
                            <a
                              href={`/${childPage.slug}`}
                              onClick={closeMenu}
                              className="block py-1.5 text-link transition-colors hover:text-foreground"
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
                      onClick={closeMenu}
                      className="block py-2 text-link transition-colors hover:text-foreground"
                    >
                      {page.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            <Button asChild size="lg" className="mt-4 w-full">
              <a href="/new-patients" onClick={closeMenu}>
                Register New Patient
              </a>
            </Button>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
