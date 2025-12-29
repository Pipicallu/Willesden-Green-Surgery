import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-3xl font-bold text-primary">
              WGS
            </a>
          </div>
          <div className="flex items-center gap-2 dark:gap-2">
            <Button size="lg">Register New Patient</Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
