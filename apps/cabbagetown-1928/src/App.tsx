import { useEffect, useRef, useState } from "react";
import { baseMap } from "@owa-components/utils";
import { LngLat } from "maplibre-gl";
import { atl1928 } from "@owa-components/utils";
import { buildingStyle } from "./buildings";
import { model } from "./model";
import "maplibre-gl/dist/maplibre-gl.css";
import type { Map } from "maplibre-gl";

const App = () => {
  const mapRef = useRef<Map>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = baseMap({
      container: containerRef.current,
      style: atl1928,
      center: new LngLat(-84.36571048, 33.74994521),
      bounds: [
        new LngLat(-84.3709853787871822, 33.746659999494625),
        new LngLat(-84.3621542217352243, 33.7536211912213062),
      ],
      zoom: 17,
      pitch: 60,
      maxZoom: 19.9,
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
    mapRef.current?.addSource("buildings28", buildingStyle.sources.buildings28);
    for (const layer of buildingStyle.layers) {
      mapRef.current?.addLayer(layer);
    }
    mapRef.current?.setPaintProperty("atl1928", "raster-opacity", 0.8);
    if (!mapRef.current?.getLayer(model.id)) mapRef.current?.addLayer(model);
  }, [mapLoaded]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}></div>
  );
};

export default App;
