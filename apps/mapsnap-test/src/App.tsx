import "maplibre-gl/dist/maplibre-gl.css";

import { WarpedMapLayer } from "@allmaps/maplibre";
import maplibregl, { LngLat } from "maplibre-gl";
import { useEffect, useRef, useState } from "react";

import { OpacitySlider } from "@owa-components/ui";
import { modern } from "@owa-components/utils";

import type { Map, StyleLayer } from "maplibre-gl";

const App = () => {
  const mapRef = useRef<maplibregl.Map>(null);
  const [map, setMap] = useState<Map | undefined>(undefined);
  const [layer, setLayer] = useState<StyleLayer>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const _map = new maplibregl.Map({
      center: new LngLat(-84.415, 33.74),
      zoom: 14,

      container: containerRef.current,
      style: modern,
    });

    _map.once("styledata", () => {
      mapRef.current = _map;
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
    map.addLayer(warpedMapLayer);
    warpedMapLayer.addGeoreferenceAnnotationByUrl(
      `${import.meta.env.BASE_URL}sanborn.json`,
    );
    setLayer(warpedMapLayer);
  }, [map, mapLoaded]);

  return (
    <div ref={containerRef} className="h-full w-full">
      <OpacitySlider map={map} layer={layer} />
    </div>
  );
};

export default App;
