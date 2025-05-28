import chroma from "chroma-js";
import type { LayerSpecification } from "maplibre-gl";
import { roadColor } from "./colors";

export const labelColor = "#2F323A";
export const buildingColor = "#dfdfdf";
const minZoom = 16;

export const buildings: LayerSpecification[] = [
  {
    id: "building",
    type: "fill",
    source: "georgia",
    "source-layer": "building",
    minzoom: minZoom - 2,
    paint: {
      "fill-color": chroma(buildingColor).brighten(1).hex(),
      "fill-opacity": [
        "interpolate",
        ["exponential", 1.2],
        ["zoom"],
        minZoom - 2,
        0,
        minZoom + 2,
        1,
      ],
      "fill-outline-color": chroma(buildingColor).darken(1).hex(),
    },
    layout: {
      visibility: "visible",
    },
  },
  {
    id: "building-3d",
    type: "fill-extrusion",
    source: "georgia",
    "source-layer": "building",
    minzoom: minZoom,
    paint: {
      "fill-extrusion-base": ["get", "render_min_height"],
      "fill-extrusion-color": chroma(buildingColor).brighten(1).hex(),
      "fill-extrusion-height": [
        "interpolate",
        ["exponential", 1.2],
        ["zoom"],
        minZoom + 2,
        0,
        minZoom + 3,
        ["get", "render_height"],
      ],
      "fill-extrusion-opacity": [
        "interpolate",
        ["exponential", 1.2],
        ["zoom"],
        minZoom + 2,
        0,
        minZoom + 3,
        1,
      ],
    },
    layout: {
      visibility: "visible",
    },
  },
];
