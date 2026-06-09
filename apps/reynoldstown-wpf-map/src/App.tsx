import { LngLat, LngLatBounds, Marker } from "maplibre-gl";
import { useEffect, useRef, useState } from "react";
import { baseMap } from "@owa-components/utils";
import { maskLayer, maskSource, wpfGeoJson } from "./geojson/mask";
import type { Map } from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

const App = () => {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [activeFeature, setActiveFeature] = useState();
  const mapRef = useRef<Map>(undefined);
  const markersRef = useRef<Marker[]>([]);
  const containerRef = useRef<HTMLDivElement>(document.createElement("div"));

  useEffect(() => {
    const mapOptions = {
      container: containerRef.current,
      center: new LngLat(-84.3553, 33.74875082963197),
      pitch: 58,
      zoom: 15,
    };
    const map = baseMap({ container: containerRef.current, mapOptions });
    map.once("styledata", () => {
      mapRef.current = map;
      setMapLoaded(true);
    });

    return () => {
      for (const marker of markersRef.current) {
        marker.remove();
      }
      markersRef.current = [];
      mapRef.current = undefined;
      setMapLoaded(false);
    };
  }, []);

  useEffect(() => {
    const setupMap = async () => {
      mapRef.current?.setZoom(15);
      mapRef.current?.addSource("mask", maskSource);
      mapRef.current?.addLayer(maskLayer, "highway_name_other");
      const geojson = await wpfGeoJson();
      markersRef.current = geojson.features.map((feature) => {
        const marker = new Marker({ className: "cursor-pointer" })
          .setLngLat(feature.geometry.coordinates)
          .addTo(mapRef.current);

        marker
          .getElement()
          .addEventListener("click", () =>
            setActiveFeature(feature.properties)
          );
        return marker;
      });
    };
    if (mapLoaded) {
      setupMap();
      mapRef.current.on("zoomend", () =>
        console.log(mapRef.current.getZoom(), mapRef.current)
      );
    }
  }, [mapLoaded]);

  return (
    <div className="flex flex-row h-[50vh] bg-white">
      <div className="p-4 h-full overflow-auto w-1/3 content">
        {activeFeature ? (
          <div
            className=""
            dangerouslySetInnerHTML={{
              __html: activeFeature.description ?? "",
            }}
          />
        ) : (
          <div className="">
            <h2>Reynoldstown: What Are People For</h2>
            <p>
              What Are People For is a community- based public art project
              co-led by the Reynoldstown Civic Improvement League and
              WonderRoot. The initiative will use 9 creative markers designed by
              Lead Artist, William Massey, to illuminate the dynamic history and
              people that have- and continue to- shape the Reynoldstown
              neighborhood. What Are People For will celebrate the evolution of
              the community’s collective identity, examine the implications of
              gentrification, and create solidarity across lines of differences.
            </p>
            <p>
              With the understanding that in order to spotlight Reynoldstown as
              it is today, reflection and homage must be paid to the past, What
              Are People For will trace the journey of the community from its
              founding to current day- identifying key influencers every step of
              the way. Each of the artistic markers is conceptualized through a
              collaborative process between the community advisory committee and
              Lead Artist to capture the vision of the community constituents.
            </p>
          </div>
        )}
      </div>
      <div className="w-3/4 h-full">
        <div ref={containerRef} className="w-full h-full"></div>
      </div>
    </div>
  );
};

export default App;
