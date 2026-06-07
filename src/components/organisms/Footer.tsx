import { Button } from "@/components/atoms/button";
import type { L } from "node_modules/vitest/dist/chunks/reporters.d.CWXNI2jG";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../molecules/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { type PatientCornerPage } from "./Navbar";

export default function Footer({
  patientCornerPages = [],
}: {
  patientCornerPages?: PatientCornerPage[];
}) {
  return (
    <footer className="bg-muted/30 border-t rounded-xl mt-10 lg:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="grid grid-cols-1  p-4 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* CTAs Section */}
          <div className="lg:col-span-1 space-y-8">
            {/* NHS App Download */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Download the NHS App</h3>
              <p className="text-muted-foreground text-sm">
                Access your health records, order prescriptions, and manage
                appointments all in one place.
              </p>
              <Button size="lg" variant="default" className="w-full sm:w-auto">
                <a
                  client:load
                  href="https://www.nhs.uk/nhs-app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download NHS App
                </a>
              </Button>
            </div>

            {/* Book Appointment CTA */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Book an Appointment</h3>
              <p className="text-muted-foreground text-sm">
                Schedule your visit with our team of healthcare professionals.
              </p>
              <Button
                client:load
                size="lg"
                variant="default"
                className="w-full sm:w-auto"
              >
                <a href="/new-patients">Book Now</a>
              </Button>
            </div>
          </div>

          {/* Locations Section */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Main Site</h3>
              <p className="text-muted-foreground text-sm">
                59 Anson Road
                <br />
                London, NW2 3UY
              </p>
              <p className="text-muted-foreground text-sm font-medium mt-2">
                Mon-Fri: 8am-6:30pm
                <br />
                Sat: 10am-1pm
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Branch Site</h3>
              <p className="text-muted-foreground text-sm">
                Albert Road
                <br />
                London, NW6 5DE
              </p>
              <p className="text-muted-foreground text-sm font-medium mt-2">
                Mon-Fri: 9am-5pm
                <br />
                Sat: Closed
              </p>
            </div>
          </div>

          {/* Resources Section */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/feedback"
                  className="text-sm text-foreground hover:scale-[1.02] transition-transform inline-block"
                >
                  Patient feedback
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
          </div>
        </nav>

        {/* Copyright */}
        <div className="mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Willesden Green Surgery. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
