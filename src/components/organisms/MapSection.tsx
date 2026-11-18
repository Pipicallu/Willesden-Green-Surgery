import { useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { X } from "lucide-react";

const locations = [
  {
    id: "willesden-green",
    name: "Willesden Green",
    openingHours: "Mon-Fri 8am-6:30pm | Sat 10am-1pm",
    address: "59 Anson Road, London, England, NW2 3UY",
    lat: 51.55381618972602,
    lng: -0.2168939614034659,
  },

  {
    id: "queens-park",
    name: "Queens Park",
    openingHours: "Mon-Fri 9am-5pm | Sat Closed",
    address: "Albert Road, London, England, NW6 5DE",
    lat: 51.534111758179867,
    lng: -0.2013367875283005,
  },
];

const locationBounds = {
  north: Math.max(...locations.map((location) => location.lat)),
  south: Math.min(...locations.map((location) => location.lat)),
  east: Math.max(...locations.map((location) => location.lng)),
  west: Math.min(...locations.map((location) => location.lng)),
  padding: 64,
};

const GOOGLE_MAPS_API_KEY = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY || "";

// Match map surfaces, labels and parks to the site palette.
const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#F2F7FA" }],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#203D64" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#397DB5" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#F2F7FA" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#203D64" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#F2F7FA" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#E6F1EE" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#F2F7FA" }],
  },
];

function MapSection() {
  const [hoveredLocation, setHoveredLocation] = useState<
    (typeof locations)[number] | null
  >(null);
  const [selectedLocation, setSelectedLocation] = useState<
    (typeof locations)[number] | null
  >(null);
  const activeLocation = selectedLocation ?? hoveredLocation;

  return (
    <section id="mapSection" className="scroll-mt-16 py-10 lg:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2>Find Us</h2>
          <p className="text-muted-foreground">Be seen at one of our sites.</p>
        </div>
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <div
            className="relative rounded-lg border overflow-hidden h-96 w-full"
            onMouseLeave={() => setHoveredLocation(null)}
          >
            <Map
              defaultBounds={locationBounds}
              gestureHandling="cooperative"
              disableDefaultUI={false}
              styles={mapStyles}
              onClick={() => {
                setSelectedLocation(null);
                setHoveredLocation(null);
              }}
            >
              {locations.map((location) => (
                <Marker
                  key={location.id}
                  position={{ lat: location.lat, lng: location.lng }}
                  title={location.name}
                  onMouseOver={() => {
                    if (window.matchMedia("(hover: hover)").matches) {
                      setSelectedLocation(null);
                      setHoveredLocation(location);
                    }
                  }}
                  onMouseOut={() => setHoveredLocation(null)}
                  icon={{
                    path: "M0 0C-2-3-10-12-10-18a10 10 0 0 1 20 0C10-12 2-3 0 0Z",
                    fillColor: "#317F7B",
                    fillOpacity: 1,
                    strokeColor: "#E6F1EE",
                    strokeWeight: 2,
                    scale: 1.25,
                  }}
                  onClick={(event) => {
                    if (
                      window.matchMedia("(hover: none), (pointer: coarse)").matches
                    ) {
                      event.stop();
                      setSelectedLocation(location);
                      setHoveredLocation(null);
                      return;
                    }
                    setSelectedLocation(null);
                    setHoveredLocation(null);
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`,
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                />
              ))}
            </Map>
            {activeLocation && (
              <div
                role="region"
                aria-label="Location details"
                aria-live="polite"
                className="pointer-events-none absolute bottom-10 left-4 right-4 z-10 rounded-xl border border-border bg-card/95 p-4 text-foreground shadow-lg backdrop-blur-sm sm:right-auto sm:max-w-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="card-title">{activeLocation.name}</h3>
                  {selectedLocation && (
                    <button
                      type="button"
                      aria-label="Close location details"
                      onClick={() => setSelectedLocation(null)}
                      className="pointer-events-auto shrink-0 rounded-full p-1 text-icon hover:bg-icon-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <X aria-hidden="true" className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <p className="mt-2 text-caption">{activeLocation.address}</p>
                <p className="mt-1 text-caption">{activeLocation.openingHours}</p>
                {selectedLocation ? (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${activeLocation.lat},${activeLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto small-label mt-3 inline-block rounded-sm text-link underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Open in Google Maps
                  </a>
                ) : (
                  <p className="small-label mt-3 text-link">
                    Click the pin to open Google Maps
                  </p>
                )}
              </div>
            )}
          </div>
        </APIProvider>
      </div>
    </section>
  );
}

export default MapSection;
