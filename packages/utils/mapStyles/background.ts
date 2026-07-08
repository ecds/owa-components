import type { LayerSpecification } from "maplibre-gl";

export const mapBackground: LayerSpecification = {
  id: "background",
  type: "background",
  minzoom: 0,
  maxzoom: 20,
  // filter: ["all"],
  layout: {
    visibility: "visible",
  },
  paint: {
    "background-color": [
      "interpolate",
      ["linear"],
      ["zoom"],
      11,
      "hsl(0, 0%, 53%)",
      12,
      "hsl(0, 0%, 93%)",
    ],
  },
};
