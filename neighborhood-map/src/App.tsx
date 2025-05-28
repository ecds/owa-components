import { useEffect, useRef, useState } from "react";
import { baseMap, query } from "@owa-components/utils";
import { MapTooltip } from "@owa-components/ui";
import {
  FilterSpecification,
  LngLat,
  Map,
  MapGeoJSONFeature,
  type MapLayerMouseEvent,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
const source = "atl-neighborhoods";
const sourceLayer = "atl_neighborhoods";
const linkedLayer = `linked-${source}-fill`;
const neighborhoodLayer = `${source}-fill`;
const outlineLayer = `${source}-outline`;
// const labelLayer = `${source}-labels`;

function App() {
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const [hoveredNeighborhood, setHoveredNeighborhood] = useState<
    string | undefined
  >();
  const [linkedNeighborhoodUUIDs, setLinkedNeighborhoodUUIDs] =
    useState<string[]>();
  const [linkedNeighborhoods, setLinkedNeighborhoods] = useState();
  const mapRef = useRef<Map>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeNeighborhoodRef = useRef<MapGeoJSONFeature | undefined>(
    undefined
  );
  const hoveredNeighborhoodRef = useRef<string>("none");

  useEffect(() => {
    const records = async () => {
      const body = {
        query: {
          term: {
            has_wp: true,
          },
        },
        size: 250,
        from: 0,
      };
      const neighborhoods = await query({ index: "owa_places", body });
      setLinkedNeighborhoods(neighborhoods);
      setLinkedNeighborhoodUUIDs(
        neighborhoods.map((neighborhood) => neighborhood.uuid.toUpperCase())
      );
    };
    records();
  }, []);

  useEffect(() => {
    if (!containerRef.current || !linkedNeighborhoodUUIDs) return;

    const unHighlight = () => {
      if (!activeNeighborhoodRef.current || !mapRef.current) return;
      mapRef.current.setFeatureState(
        {
          source,
          sourceLayer,
          id: activeNeighborhoodRef.current.id,
        },
        { highlight: false }
      );
    };

    const mousemoveNeighborhood = ({ features }: MapLayerMouseEvent) => {
      if (!features || !mapRef.current) return;
      mapRef.current.getCanvas().style.cursor = "pointer";
      const neighborhood = features[0]?.properties.name;
      if (neighborhood === hoveredNeighborhoodRef.current) return;
      unHighlight();
      const feature = features[0];
      mapRef.current.setFeatureState(
        {
          source,
          sourceLayer,
          id: feature.id,
        },
        { highlight: true }
      );
      activeNeighborhoodRef.current = feature;

      setHoveredNeighborhood(neighborhood);
      hoveredNeighborhoodRef.current = neighborhood;
    };

    const mousemoveLink = ({ features }: MapLayerMouseEvent) => {
      unHighlight();
      if (!mapRef.current) return;
      mapRef.current.getCanvas().style.cursor = "pointer";
      if (features) {
        const feature = features[0];
        mapRef.current.setFeatureState(
          {
            source,
            sourceLayer,
            id: feature.id,
          },
          { highlight: true }
        );
        activeNeighborhoodRef.current = feature;
      }
    };

    const mouseleave = () => {
      if (!mapRef.current) return;
      mapRef.current.getCanvas().style.cursor = "";
      unHighlight();
      activeNeighborhoodRef.current = undefined;
      setHoveredNeighborhood(undefined);
      hoveredNeighborhoodRef.current = "none";
    };

    const onClick = ({ features }: MapLayerMouseEvent) => {
      console.log("🚀 ~ onClick ~ features:", features);
      if (!features) return;
      const clickedNeighborhood = linkedNeighborhoods.find(
        (neighborhood) =>
          neighborhood.uuid.toUpperCase() === features[0].properties.uuid
      );
      window.location.href = clickedNeighborhood.link;
    };

    const map = baseMap({ container: containerRef.current });
    map.once("styledata", () => {
      mapRef.current = map;
      setMapLoaded(true);

      map.on("mousemove", linkedLayer, mousemoveLink);
      map.on("mousemove", neighborhoodLayer, mousemoveNeighborhood);
      map.on("mouseleave", linkedLayer, mouseleave);
      map.on("mouseleave", neighborhoodLayer, mouseleave);
      map.on("click", linkedLayer, onClick);
    });

    return () => {
      map.off(linkedLayer, mousemoveLink);
      map.off("mousemove", neighborhoodLayer, mousemoveNeighborhood);
      map.off("mouseleave", linkedLayer, mouseleave);
      map.off("mouseleave", neighborhoodLayer, mouseleave);
      map.off("click", linkedLayer, onClick);
    };
  }, [linkedNeighborhoodUUIDs, linkedNeighborhoods]);

  useEffect(() => {
    if (!linkedNeighborhoodUUIDs || !mapRef.current || !mapLoaded) return;
    const filter: FilterSpecification = [
      "in",
      ["get", "uuid"],
      `${linkedNeighborhoodUUIDs}`,
    ];
    mapRef.current.setFilter(linkedLayer, filter);
    // mapRef.current.setFilter(outlineLayer, filter);
    // mapRef.current.setFilter(labelLayer, filter);
    mapRef.current.setLayoutProperty(linkedLayer, "visibility", "visible");
    mapRef.current.setLayoutProperty(outlineLayer, "visibility", "visible");
    // mapRef.current.setLayoutProperty(labelLayer, "visibility", "visible");

    return () => {
      setMapLoaded(false);
      if (mapRef.current) mapRef.current.remove();
    };
  }, [linkedNeighborhoodUUIDs, mapLoaded]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      {mapRef.current && mapLoaded && (
        <MapTooltip show={Boolean(hoveredNeighborhood)} map={mapRef.current}>
          <span style={{ color: "black" }}>{hoveredNeighborhood}</span>
        </MapTooltip>
      )}
    </div>
  );
}

export default App;
