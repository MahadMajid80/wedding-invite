"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface VenueMapProps {
  lat: number;
  lng: number;
  venueName: string;
}

export const VenueMap = ({ lat, lng, venueName }: VenueMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
        version: "weekly",
      });

      try {
        const { Map } = await loader.importLibrary("maps");
        const { Marker } = await loader.importLibrary("marker");

        if (mapRef.current) {
          const map = new Map(mapRef.current, {
            center: { lat, lng },
            zoom: 15,
            styles: [
              {
                featureType: "all",
                elementType: "geometry",
                stylers: [{ color: "#1e293b" }],
              },
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ color: "#eab308" }],
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#0f172a" }],
              },
            ],
            disableDefaultUI: true,
            zoomControl: true,
          });

          new Marker({
            map,
            position: { lat, lng },
            title: venueName,
          });
        }
      } catch (error) {
        console.error("Error loading map:", error);
      }
    };

    initMap();
  }, [lat, lng, venueName]);

  return (
    <div className="bg-navy-800/50 backdrop-blur-sm rounded-2xl p-2 luxury-shadow border border-champagne-500/20">
      <div ref={mapRef} className="w-full h-96 rounded-xl" />
    </div>
  );
};

