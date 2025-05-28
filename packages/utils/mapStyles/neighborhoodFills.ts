import chroma from "chroma-js";
import { backgroundColor } from "./colors";
import type {
  DataDrivenPropertyValueSpecification,
  StyleSpecification,
} from "maplibre-gl";

export const neighborhoodColor = chroma(backgroundColor).darken(0.5).hex();
export const borderColor = "#273435";
export const neighborhoodLinkColor = "#DB504A";
export const neighborhoodHighlight = "#0B6383";

const fillOpacity: DataDrivenPropertyValueSpecification<number> = [
  "interpolate",
  ["exponential", 1.2],
  ["zoom"],
  14,
  0.8,
  24,
  0.1,
];

export const neighborhoods: StyleSpecification = {
  version: 8,
  sources: {
    "atl-neighborhoods": {
      type: "vector",
      url: "https://d3j4mgzjrheeg2.cloudfront.net/atl_neighborhoods52325.json",
      promoteId: "uuid",
    },
  },
  layers: [
    {
      id: "atl-neighborhoods-fill",
      type: "fill",
      source: "atl-neighborhoods",
      "source-layer": "atl_neighborhoods",
      layout: {
        visibility: "visible",
      },
      paint: {
        "fill-opacity": fillOpacity,
        "fill-color": [
          "case",
          ["boolean", ["feature-state", "highlight"], false],
          neighborhoodHighlight,
          neighborhoodColor,
        ],
      },
    },
    {
      id: "linked-atl-neighborhoods-fill",
      type: "fill",
      source: "atl-neighborhoods",
      "source-layer": "atl_neighborhoods",
      layout: {
        visibility: "none",
      },
      paint: {
        "fill-opacity": fillOpacity,
        "fill-color": [
          "case",
          ["boolean", ["feature-state", "highlight"], false],
          chroma(neighborhoodLinkColor).brighten(2).hex(),
          neighborhoodLinkColor,
        ],
      },
    },
  ],
};
