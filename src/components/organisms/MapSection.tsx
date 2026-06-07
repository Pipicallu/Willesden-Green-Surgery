import { useState, useEffect } from "react";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import LabeledSwitch from "@/components/molecules/LabeledSwitch";

const locations = {
  willesdenGreen: {
    name: "Willesden Green",
    openingHours: "Mon-Fri 8am-6:30pm | Sat 10am-1pm",
    address: "59 Anson Road, London, England, NW2 3UY",
    lat: 51.5628,
    lng: -0.2216,
  },
  queensPark: {
    name: "Queens Park",
    openingHours: "Mon-Fri 9am-5pm | Sat Closed",
    address: "Albert Road, London, England, NW6 5DE",
    lat: 51.5347,
    lng: -0.2067,
  },
};

const GOOGLE_MAPS_API_KEY = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY || "";

// Light mode map styling
const lightMapStyles = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#f0f0f5" }], // Light background
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#7c83fd" }], // Primary color (239 84% 67%)
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#1a1a2e" }], // Foreground
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#e8e8f5" }], // Muted
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#c5c9ff" }], // Lighter primary
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#e8e8f5" }],
  },
];

// Dark mode map styling
const darkMapStyles = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#2a2a40" }], // Dark background (239 30% 20%)
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#e8e8f5" }], // Light text
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#2a2a40" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#7c83fd" }], // Primary color
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#3d3d5c" }], // Dark muted (239 30% 28%)
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#e8e8f5" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#4a4a6d" }],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#333350" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#5a5a85" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#3d3d5c" }],
  },
];

function MapSection() {
  const [isQueensPark, setIsQueensPark] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const currentLocation = isQueensPark
    ? locations.queensPark
    : locations.willesdenGreen;

  const handleLocationChange = () => {
    setIsQueensPark(!isQueensPark);
  };

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();

    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const mapStyles = isDark ? darkMapStyles : lightMapStyles;

  return (
    <section id="mapSection" className="scroll-mt-16 py-10 lg:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Find Us</h2>
          <p className="text-xl text-muted-foreground">
            Visit our practice locations
          </p>
          <LabeledSwitch
            leftLabel="Willesden Green"
            rightLabel="Queens Park"
            defaultChecked={false}
            onCheckedChange={handleLocationChange}
          />
        </div>
        <div className="flex justify-center">
          <div></div>
          <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <div className="rounded-lg border overflow-hidden h-96 w-full">
              <Map
                defaultCenter={currentLocation}
                center={currentLocation}
                defaultZoom={15}
                minZoom={12}
                gestureHandling="cooperative"
                disableDefaultUI={false}
                styles={mapStyles}
              >
                <Marker
                  position={currentLocation}
                  title={currentLocation.name}
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${currentLocation.lat},${currentLocation.lng}`,
                      "_blank",
                    )
                  }
                />
                <InfoWindow position={currentLocation}>
                  <div className="p-2">
                    <h3 className="font-semibold text-base mb-1">
                      {currentLocation.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {currentLocation.address}
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {currentLocation.openingHours}
                    </p>
                  </div>
                </InfoWindow>
              </Map>
            </div>
          </APIProvider>
        </div>
      </div>
    </section>
  );
}

export default MapSection;
