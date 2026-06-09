import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { filterByDate } from "@openhistoricalmap/maplibre-gl-dates";
import maplibregl, { LngLat, LngLatBounds, Map } from "maplibre-gl";
import { ohm } from "@owa-components/utils";
import { immigrantData } from "./styles/immigrant_data";
import { dataBounds } from "./data";
import Legend from "./Legend";
import Toggle1904 from "./Toggle1904";

const App = () => {
  const mapRef = useRef<maplibregl.Map>(null);
  const [map, setMap] = useState<Map | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const _map = new maplibregl.Map({
      center: new LngLat(-84.38979, 33.75432),
      zoom: 14.0,
      maxBounds: new LngLatBounds(
        [-84.6591251582694, 33.62265121423327],
        [-84.13899086471818, 33.93982091532807],
      ),

      container: containerRef.current,
      style: ohm,
    });

    _map.once("styledata", () => {
      filterByDate(_map, "1895-01-01");

      _map.fitBounds(dataBounds, { padding: 50 });

      for (const source of Object.keys(immigrantData.sources)) {
        _map.addSource(source, immigrantData.sources[source]);
      }

      for (const layer of immigrantData.layers) {
        _map.addLayer(layer);
      }

      mapRef.current = _map;
      setMap(_map);
      setMapLoaded(true);
    });

    return () => {
      _map.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded) return;
    mapRef.current?.on("click", "landcover", ({ features }) => {
      console.log(features);
    });
  }, [mapLoaded]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <div
        style={{
          zIndex: 100,
          backgroundColor: "oklab(1 0 0 / 0.75)",
          position: "absolute",
          left: "2rem",
          top: "2rem",
        }}
      >
        <Legend />
        <Toggle1904 map={map} />
      </div>
    </div>
  );
};

export default App;
