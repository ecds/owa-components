import { useEffect, useRef, useState } from "react";
import { WarpedMapLayer } from "@allmaps/maplibre";
import { filterByDate } from "@openhistoricalmap/maplibre-gl-dates";
import "maplibre-gl/dist/maplibre-gl.css";
import maplibregl, { LngLatBounds, Map } from "maplibre-gl";
import { ohm } from "@owa-components/utils";

const SHEETS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 63, 64, 65, 66, 69, 70, 71, 72, 73, 74, 76, 77, 78, 79, 80, 81, 84, 85,
  86, 87, 88,
];

const App = () => {
  const mapRef = useRef<maplibregl.Map>(null);
  const [map, setMap] = useState<Map | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const _map = new maplibregl.Map({
      bounds: new LngLatBounds(
        [-84.65912515826957, 33.64553108350293],
        [-84.1389908647183, 33.92589381814089],
      ),

      container: containerRef.current,
      style: ohm,
    });

    _map.once("styledata", () => {
      mapRef.current = _map;
      filterByDate(_map, "1928-01-01");
      setMap(_map);

      setMapLoaded(true);
    });

    return () => {
      _map.remove();
    };
  }, []);

  useEffect(() => {
    if (!map || !mapLoaded) return;

    const warpedMapLayer = new WarpedMapLayer();
    for (const sheet of SHEETS) {
      map.addLayer(warpedMapLayer);
      warpedMapLayer.addGeoreferenceAnnotationByUrl(
        `${import.meta.env.BASE_URL}Atlanta_1928_Sheet${sheet}.json`,
      );
    }
  }, [map, mapLoaded]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}></div>
  );
};

export default App;
