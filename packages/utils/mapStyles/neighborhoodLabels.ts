import chroma from "chroma-js";
import type {
  DataDrivenPropertyValueSpecification,
  StyleSpecification,
} from "maplibre-gl";
import { neighborhoodColor, neighborhoodHighlight } from "./neighborhoodFills";

const textSize: DataDrivenPropertyValueSpecification<number> = [
  "interpolate",
  ["linear"],
  ["zoom"],
  8,
  6,
  9,
  8,
  10,
  12,
  13,
  14,
  14,
  24,
];

const textHaloColor: DataDrivenPropertyValueSpecification<string> = [
  "case",
  ["boolean", ["feature-state", "highlight"], false],
  "#fff",
  "#fff",
];

export const neighborhoodLabels: StyleSpecification = {
  version: 8,
  sources: {
    // neighborhoods: {
    //   type: "geojson",
    //   data: "https://geoserver.ecds.emory.edu/ATLMaps/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ATLMaps:Atlanta%20Neighborhoods&maxFeatures=500&outputFormat=application%2Fjson",
    //   promoteId: "uuid",
    // },
    "atl-neighborhood-labels": {
      type: "vector",
      scheme: "tms",
      tiles: [
        "https://geoserver.ecds.emory.edu/gwc/service/tms/1.0.0/ATLMaps:neighborhood_centers@EPSG:900913@pbf/{z}/{x}/{y}.pbf",
      ],
      promoteId: "uuid",
    },
  },
  layers: [
    {
      id: "atl-neighborhoods-labels",
      source: "atl-neighborhood-labels",
      "source-layer": "neighborhood_centers",
      minzoom: 12,
      type: "symbol",
      layout: {
        visibility: "none",
        "symbol-avoid-edges": true,
        "symbol-placement": "point",
        "text-variable-anchor-offset": [
          "top",
          [0.5, 0.5],
          "bottom",
          [0.5, 0.5],
        ],
        "text-field": ["get", "name"],
        "text-font": ["Roboto Regular", "Noto Sans Regular"],
        "text-size": textSize,
        "text-anchor": "center",
        "text-transform": "uppercase",
        "text-max-width": 5,
      },
      paint: {
        "text-color": "#000",
        "text-halo-blur": 0.5,
        "text-halo-width": 1,
        "text-halo-color": textHaloColor,
      },
    },
  ],
};
