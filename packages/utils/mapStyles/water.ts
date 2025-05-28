import { waterColor } from "./colors";
import type { LayerSpecification } from "maplibre-gl";

export const water: LayerSpecification[] = [
  {
    id: "water",
    type: "fill",
    source: "georgia",
    "source-layer": "water",
    filter: [
      "all",
      ["==", ["geometry-type"], "Polygon"],
      ["!=", ["get", "brunnel"], "tunnel"],
      ["!=", ["get", "class"], "swimming_pool"],
    ],
    paint: { "fill-color": waterColor, "fill-opacity": 1 },
  },
  {
    id: "waterway-tunnel",
    type: "line",
    source: "georgia",
    "source-layer": "waterway",
    filter: [
      "all",
      ["==", ["geometry-type"], "LineString"],
      ["==", ["get", "brunnel"], "tunnel"],
    ],
    paint: {
      "line-color": waterColor,
      "line-dasharray": [3, 3],
      "line-gap-width": ["interpolate", ["linear"], ["zoom"], 12, 0, 20, 6],
      "line-opacity": 1,
      "line-width": [
        "interpolate",
        ["exponential", 1.4],
        ["zoom"],
        8,
        1,
        20,
        2,
      ],
    },
  },
  {
    id: "creeks",
    type: "line",
    source: "georgia",
    "source-layer": "waterway",
    filter: [
      "all",
      ["==", ["geometry-type"], "LineString"],
      ["match", ["get", "brunnel"], ["bridge", "tunnel"], false, true],
    ],
    paint: {
      "line-color": waterColor,
      "line-opacity": 1,
      "line-width": ["interpolate", ["exponential", 1], ["zoom"], 8, 1, 20, 8],
    },
  },
  {
    id: "intermittent",
    type: "line",
    source: "georgia",
    "source-layer": "waterway",
    filter: ["all", ["==", ["get", "intermittent"], 1]],
    paint: {
      "line-color": waterColor,
      "line-opacity": 1,
      "line-width": ["interpolate", ["exponential", 1], ["zoom"], 8, 1, 20, 8],
    },
  },
];
