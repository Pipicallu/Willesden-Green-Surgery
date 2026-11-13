import { useState } from "react";
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
    lat: 51.55381618972602,
    lng: -0.2168939614034659,
  },

  queensPark: {
    name: "Queens Park",
    openingHours: "Mon-Fri 9am-5pm | Sat Closed",
    address: "Albert Road, London, England, NW6 5DE",
    lat: 51.534111758179867,
    lng: -0.2013367875283005,
  },
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
  const [isQueensPark, setIsQueensPark] = useState(false);

  const currentLocation = isQueensPark
    ? locations.queensPark
    : locations.willesdenGreen;

  const handleLocationChange = () => {
    setIsQueensPark(!isQueensPark);
  };

  return (
    <section id="mapSection" className="scroll-mt-16 py-10 lg:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Find Us</h2>
          <p className="text-xl text-muted-foreground">
            Be seen at one of our two sites. <br /> Open on Saturdays.
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
                  icon={{
                    path: "M0 0C-2-3-10-12-10-18a10 10 0 0 1 20 0C10-12 2-3 0 0Z",
                    fillColor: "#317F7B",
                    fillOpacity: 1,
                    strokeColor: "#E6F1EE",
                    strokeWeight: 2,
                    scale: 1.25,
                  }}
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
                    <p className="text-sm text-foreground mb-2">
                      {currentLocation.address}
                    </p>
                    <p className="text-sm font-medium text-foreground">
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
