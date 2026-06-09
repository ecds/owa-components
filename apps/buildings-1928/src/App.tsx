import { useEffect, useRef, useState } from "react";
import { atlas, baseMap } from "@owa-components/utils";
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
      style: atlas,
    });
    map.once("styledata", () => {
      mapRef.current = map;
      setMapLoaded(true);
    });

    return () => {};
  }, []);

  useEffect(() => {
    if (!mapLoaded) return;
    mapRef.current?.on("click", "landcover", ({ features }) => {
      console.log(features);
    });
  }, [mapLoaded]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}></div>
  );
};

export default App;
