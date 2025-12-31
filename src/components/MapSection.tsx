import { useState } from "react";
import LabeledSwitch from "./ui/LabeledSwitch";

const locations = {
  willesdenGreen: {
    name: "Willesden Green",
    lat: 51.5494,
    lng: -0.2245,
  },
  queensPark: {
    name: "Queens Park",
    lat: 51.5341,
    lng: -0.2046,
  },
};

function MapSection() {
  const [isQueensPark, setIsQueensPark] = useState(false);
  const currentLocation = isQueensPark
    ? locations.queensPark
    : locations.willesdenGreen;

  const handleLocationChange = () => {
    setIsQueensPark(!isQueensPark);
  };

  return (
    <section className="py-20 px-4">
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

        <div className="rounded-lg border overflow-hidden bg-muted h-96">
          {/* Google Maps will be integrated here */}
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <div className="text-center space-y-2">
              <p>Map will be displayed here</p>
              <p className="text-sm">
                Current: {currentLocation.name}
                <br />
                Lat: {currentLocation.lat}, Lng: {currentLocation.lng}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MapSection;
