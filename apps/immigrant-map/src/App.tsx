import { useEffect, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { filterByDate } from "@openhistoricalmap/maplibre-gl-dates";
import maplibregl, {
  LngLat,
  LngLatBounds,
  Map,
  type MapLayerMouseEvent,
} from "maplibre-gl";
import { ohm } from "@owa-components/utils";
import { immigrantData } from "./styles/immigrant_data";
import { dataBounds } from "./data";
import Legend from "./Legend";
import ToggleVisibility from "./Toggle1904";
import { OWAPopup, PropertiesTable } from "@owa-components/ui";

const App = () => {
  const mapRef = useRef<maplibregl.Map>(null);
  const [map, setMap] = useState<Map | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [selectedProperties, setSelectedProperties] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState<
    [number, number] | undefined
  >(undefined);

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

      mapRef.current = _map;
      setMap(_map);
      setMapLoaded(true);
    });

    return () => {
      _map.remove();
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    const handleClick = ({ features }: MapLayerMouseEvent) => {
      const props = features?.[0]?.properties;
      const geom = features?.[0]?.geometry;
      const coordinates = geom?.type === "Point"
        ? (geom.coordinates as [number, number])
        : undefined;
      setSelectedProperties(props ? (props as Record<string, unknown>) : null);
      setSelectedCoordinates(coordinates);
    };

    const handleMouseEnter = () => {
      map.getCanvas().style.cursor = "pointer";
    };

    const handleMouseLeave = () => {
      map.getCanvas().style.cursor = "";
    };

    for (const [source, spec] of Object.entries(immigrantData.sources)) {
      map.addSource(source, spec);
    }

    for (const layer of immigrantData.layers) {
      map.addLayer(layer);
      map.on("click", layer.id, handleClick);
      map.on("mouseenter", layer.id, handleMouseEnter);
      map.on("mouseleave", layer.id, handleMouseLeave);
    }

    return () => {
      for (const layer of immigrantData.layers) {
        if (map.getLayer(layer.id)) {
          map.off("click", layer.id, handleClick);
          map.off("mouseenter", layer.id, handleMouseEnter);
          map.off("mouseleave", layer.id, handleMouseLeave);
        }
      }
    };
  }, [map]);

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
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Legend map={map} />
        <ToggleVisibility map={map} layerId="atl1895" label="1895 Map" />
        <ToggleVisibility map={map} layerId="atl1904" label="1904 Map" />
        {selectedProperties && (
          <OWAPopup map={map} coordinates={selectedCoordinates}>
            {" "}
            <PropertiesTable properties={selectedProperties} />{" "}
          </OWAPopup>
        )}
      </div>
    </div>
  );
};

export default App;
