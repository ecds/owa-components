import chroma from "chroma-js";
import { backgroundColor } from "./colors";
import { neighborhoods } from "./neighborhoodFills";
import type {
  DataDrivenPropertyValueSpecification,
  FilterSpecification,
  StyleSpecification,
} from "maplibre-gl";

export const neighborhoodColor = "#A35FDD";
export const borderColor = "#273435";
export const neighborhoodHighlight = "#DB504A";

// const filter: FilterSpecification = [
//   "in",
//   ["get", "uuid"],
//   `${linkedNeighborhoods}`,
// ];

const lineOpacity = 0.8;

const lineWidth: DataDrivenPropertyValueSpecification<number> = [
  "interpolate",
  ["exponential", 1.2],
  ["zoom"],
  6,
  0.5,
  7,
  0.8,
  8,
  1,
  11,
  3,
  13,
  4,
  14,
  6,
  15,
  8,
  16,
  10,
  17,
  14,
  18,
  18,
];

export const neighborhoodOutlines: StyleSpecification = {
  version: 8,
  sources: {
    ...neighborhoods.sources,
  },
  layers: [
    {
      id: "atl-neighborhoods-outline",
      type: "line",
      source: "atl-neighborhoods",
      "source-layer": "atl_neighborhoods",
      layout: {
        visibility: "none",
      },
      paint: {
        "line-color": chroma(backgroundColor).darken(2).hex(),
        "line-width": lineWidth,
        "line-opacity": lineOpacity,
      },
    },
  ],
};
