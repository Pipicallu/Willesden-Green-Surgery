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
import { ChevronDown } from "lucide-react";

interface PatientCornerPage {
  title: string;
  slug: string;
}

export default function Navbar({
  patientCornerPages = [],
}: {
  patientCornerPages?: PatientCornerPage[];
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm transition-shadow ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a
              href="/"
              className="text-foreground [&_svg]:h-14 [&_svg]:w-auto [&_path]:fill-current [&_line]:stroke-current"
            >
              {logo}
            </a>
          </div>
          <ul className="flex items-center gap-8">
            <li>
              <a
                data-slot="link"
                className="text-foreground  text-sm inline-block"
                href="/#mapSection"
              >
                locations
              </a>
            </li>
            <li>
              {" "}
              <a
                data-slot="link"
                className="text-foreground text-sm inline-block"
                href="/new-patients"
              >
                New Patients
              </a>
            </li>
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-foreground text-sm outline-none hover:scale-[1.02] transition-transform">
                  Patient Corner
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  {patientCornerPages.map((page) => (
                    <DropdownMenuItem key={page.slug} asChild>
                      <a
                        href={`/patient-corner/${page.slug}`}
                        className="cursor-pointer"
                      >
                        {page.title}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          </ul>
          <div className="flex items-center gap-2 dark:gap-2">
            <Button size="lg">Register New Patient</Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
