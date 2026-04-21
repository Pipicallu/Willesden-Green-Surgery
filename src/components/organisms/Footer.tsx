import { Button } from "@/components/atoms/button";

export default function Footer() {
  return (
    <footer className="bg-muted/30 border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* CTAs Section */}
          <div className="lg:col-span-1 space-y-8">
            {/* NHS App Download */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Download the NHS App</h3>
              <p className="text-muted-foreground text-sm">
                Access your health records, order prescriptions, and manage
                appointments all in one place.
              </p>
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <a
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
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <a href="/new-patients">Book Now</a>
              </Button>
            </div>
          </div>

          {/* Locations Section */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Main Site</h3>
              <p className="text-muted-foreground">
                59 Anson Road
                <br />
                London, NW2 3UY
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Branch Site</h3>
              <p className="text-muted-foreground">
                Albert Road
                <br />
                London, NW6 5DE
              </p>
            </div>
          </div>
        </nav>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Willesden Green Surgery. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
