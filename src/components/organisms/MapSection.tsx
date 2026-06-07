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
    stylers: [{ color: "#eff6ff" }], // blue-50
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#3b82f6" }], // blue-500
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
    stylers: [{ color: "#1e3a5f" }], // blue-950 tone
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#dbeafe" }], // blue-100
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#bfdbfe" }], // blue-200
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#dbeafe" }], // blue-100
  },
];

// Dark mode map styling
const darkMapStyles = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#1e3a5f" }], // blue-950
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#eff6ff" }], // blue-50
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1e3a5f" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#3b82f6" }], // blue-500
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#1d4ed8" }], // blue-700
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#eff6ff" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#2563eb" }], // blue-600
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#1e40af" }], // blue-800
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#1d4ed8" }], // blue-700
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#1d4ed8" }], // blue-700
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
