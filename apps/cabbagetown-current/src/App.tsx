import { useEffect, useRef, useState } from "react";
import { baseMap } from "@owa-components/utils";
import { LngLat } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { buildingStyle } from "./buildings";
import type { Map } from "maplibre-gl";

// import type {
//   FilterSpecification,
//   MapGeoJSONFeature,
//   MapLayerMouseEvent,
// } from "maplibre-gl";

const App = () => {
  const mapRef = useRef<Map>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = baseMap({
      container: containerRef.current,
      center: new LngLat(-84.36571048, 33.74994521),
      zoom: 17,
      pitch: 60,
      maxZoom: 19.9,
      // bearing: -49.861382826498186,
      canvasContextAttributes: { antialias: true },
    });
    map.once("styledata", () => {
      mapRef.current = map;
      setMapLoaded(true);
    });

    return () => {};
  }, []);

  useEffect(() => {
    if (!mapLoaded) return;
    mapRef.current?.setLayoutProperty("building-3d", "visibility", "none");
    mapRef.current?.addSource(
      "modernCabbagetown",
      buildingStyle.sources.modernCabbagetown
    );
    for (const layer of buildingStyle.layers) {
      mapRef.current?.addLayer(layer, "boundary_state");
    }
  }, [mapLoaded]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}></div>
  );
};

export default App;
