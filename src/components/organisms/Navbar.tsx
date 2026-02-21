import { Button } from "@/components/atoms/button";
import ThemeToggle from "@/components/molecules/ThemeToggle";
import { logo } from "@/assets/logo";
import { useState, useEffect } from "react";

export default function Navbar() {
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
              {" "}
              <a
                data-slot="link"
                className="text-foreground text-sm inline-block"
                href="#mapSection"
              >
                Patient Corner
              </a>
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
