import { filterByDate } from "@openhistoricalmap/maplibre-gl-dates";
import maplibregl, { LngLat, LngLatBounds } from "maplibre-gl";
import { useCallback, useEffect, useRef, useState } from "react";

import { ohmModern } from "@owa-components/utils";

import { dataBounds } from "../data";
import { immigrantGroups } from "../data/groups";
import { immigrantData } from "../styles/immigrant_data";

import type { ImmigrantGroupKey } from "../data/groups";
import type {
  FilterSpecification,
  Map,
  MapLayerMouseEvent,
  StyleSpecification,
} from "maplibre-gl";

export const useImmigrantMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map>(null);
  const [map, setMap] = useState<Map | undefined>(undefined);
  const [currentStyle, setCurrentStyle] =
    useState<StyleSpecification>(ohmModern);
  const [selectedGroup, setSelectedGroupState] = useState<
    ImmigrantGroupKey | undefined
  >(undefined);
  const selectedGroupRef = useRef<ImmigrantGroupKey | undefined>(undefined);
  const [selectedProperties, setSelectedProperties] = useState<
    Record<string, unknown>[] | null
  >(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState<
    [number, number] | undefined
  >(undefined);

  const sizeCircles = useCallback(() => {
    if (!map) return;
    if (currentStyle.layers[1].type === "raster") {
      for (const layer of immigrantData.layers) {
        map.once("styledata", () => {
          console.log("make bigger");
          if (!map.getLayer(layer.id)) return;
          map.setPaintProperty(layer.id, "circle-radius", 7);
        });
      }
    }
  }, [map, currentStyle]);

  useEffect(() => {
    if (!containerRef.current) return;

    const _map = new maplibregl.Map({
      center: new LngLat(-84.38979, 33.75432),
      zoom: 14.0,
      dragRotate: false,
      maxPitch: 0,
      maxBounds: new LngLatBounds(
        [-84.6591251582694, 33.62265121423327],
        [-84.13899086471818, 33.93982091532807],
      ),
      container: containerRef.current,
      style: ohmModern,
      cooperativeGestures: true,
    });

    _map.on("error", ({ error }) => {
      if (error?.message?.includes("could not be decoded")) return;
      console.error(error);
    });

    _map.on("zoomend", () => console.log(_map.getZoom()));

    _map.once("styledata", () => {
      filterByDate(_map, "1896-01-01");
      _map.fitBounds(dataBounds, { padding: 50 });
      mapRef.current = _map;
      setMap(_map);
    });

    const ro = new ResizeObserver(() => _map.resize());
    ro.observe(containerRef.current);

    return () => {
      ro.disconnect();
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

    const addDataLayers = () => {
      for (const [source, spec] of Object.entries(immigrantData.sources)) {
        if (!map.getSource(source)) map.addSource(source, spec);
      }
      for (const layer of immigrantData.layers) {
        if (!map.getLayer(layer.id)) map.addLayer(layer);
        // off before on so re-runs from style.load never double-bind
        map.off("click", layer.id, handleClick);
        map.off("mouseenter", layer.id, handleMouseEnter);
        map.off("mouseleave", layer.id, handleMouseLeave);
        map.on("click", layer.id, handleClick);
        map.on("mouseenter", layer.id, handleMouseEnter);
        map.on("mouseleave", layer.id, handleMouseLeave);
      }
      // re-apply any active group filter after the layer is (re-)added
      const group = selectedGroupRef.current;
      const groupFilter = group ? ["==", ["get", "group"], group] : null;
      map.setFilter("immigrants", groupFilter as FilterSpecification);
      if (map.getLayer("immigrants-shadow")) {
        map.setFilter("immigrants-shadow", groupFilter as FilterSpecification);
      }
    };

    addDataLayers();
    map.on("style.load", addDataLayers);

    return () => {
      map.off("style.load", addDataLayers);
      for (const layer of immigrantData.layers) {
        map.off("click", layer.id, handleClick);
        map.off("mouseenter", layer.id, handleMouseEnter);
        map.off("mouseleave", layer.id, handleMouseLeave);
      }
    };
  }, [map]);

  useEffect(() => {
    if (!map) return;

    if (currentStyle === ohmModern) {
      map.once("styledata", () => filterByDate(map, "1896-01-01"));
    }

    if (map.getStyle().name === currentStyle.name) return;

    map.setStyle(currentStyle, { diff: false });
    map.on("styledata", sizeCircles);

    return () => {
      map?.off("styledata", sizeCircles);
    };
  }, [map, currentStyle, sizeCircles]);

  const setSelectedGroup = useCallback(
    (group: ImmigrantGroupKey | undefined) => {
      selectedGroupRef.current = group;
      setSelectedGroupState(group);
      if (map?.getLayer("immigrants")) {
        const groupFilter = group ? ["==", ["get", "group"], group] : null;
        map.setFilter("immigrants", groupFilter as FilterSpecification);
        if (map.getLayer("immigrants-shadow")) {
          map.setFilter(
            "immigrants-shadow",
            groupFilter as FilterSpecification,
          );
        }
      }
    },
    [map],
  );

  // kept for consumers that need the full groups list alongside selection state
  const groups = immigrantGroups;

  return {
    containerRef,
    map,
    selectedProperties,
    selectedCoordinates,
    currentStyle,
    setCurrentStyle,
    selectedGroup,
    setSelectedGroup,
    groups,
    setSelectedProperties,
  };
};
