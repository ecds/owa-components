import { filterByDate } from "@openhistoricalmap/maplibre-gl-dates";
import maplibregl, { LngLat, LngLatBounds } from "maplibre-gl";
import { useEffect, useRef, useState } from "react";

import { ohm } from "@owa-components/utils";

import { dataBounds } from "../data";
import { immigrantData } from "../styles/immigrant_data";

import type { Map, MapLayerMouseEvent } from "maplibre-gl";

export const useImmigrantMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map>(null);
  const [map, setMap] = useState<Map | undefined>(undefined);
  const [selectedProperties, setSelectedProperties] = useState<
    Record<string, unknown>[] | null
  >(null);
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
    });

    return () => {
      _map.remove();
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    const handleClick = ({ features }: MapLayerMouseEvent) => {
      if (!features) return;
      const props = features.map((f) => f.properties);
      props.sort((a, b) => {
        const an = parseInt(a["street #"]);
        const bn = parseInt(b["street #"]);
        if (isNaN(an)) return 1;
        if (isNaN(bn)) return -1;
        return an - bn;
      });
      const geom = features[0]?.geometry;
      const coordinates =
        geom?.type === "Point"
          ? (geom.coordinates as [number, number])
          : undefined;
      setSelectedProperties(props as Record<string, unknown>[]);
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

  return { containerRef, map, selectedProperties, selectedCoordinates };
};
