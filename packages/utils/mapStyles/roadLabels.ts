import { LayerSpecification } from "maplibre-gl";

export const roadLabels: LayerSpecification = [
  {
    id: "roadname_sec",
    type: "symbol",
    source: "georgia",
    "source-layer": "transportation_name",
    minzoom: 15,
    filter: ["all", ["in", "class", "secondary", "tertiary"]],
    layout: {
      "symbol-placement": "line",
      "text-font": [
        "Montserrat Regular",
        "Open Sans Regular",
        "Noto Sans Regular",
        "HanWangHeiLight Regular",
        "NanumBarunGothic Regular",
      ],
      "text-size": {
        stops: [
          [15, 9],
          [16, 11],
          [18, 12],
        ],
      },
      "text-field": "{name}",
      "symbol-avoid-edges": false,
      "symbol-spacing": 200,
      "text-pitch-alignment": "auto",
      "text-rotation-alignment": "auto",
      "text-justify": "center",
    },
    paint: {
      "text-color": "#838383",
      "text-halo-color": "#fff",
      "text-halo-width": 1,
    },
  },
  {
    id: "roadname_pri",
    type: "symbol",
    source: "georgia",
    "source-layer": "transportation_name",
    minzoom: 14,
    filter: ["all", ["in", "class", "primary"]],
    layout: {
      "symbol-placement": "line",
      "text-font": [
        "Montserrat Regular",
        "Open Sans Regular",
        "Noto Sans Regular",
        "HanWangHeiLight Regular",
        "NanumBarunGothic Regular",
      ],
      "text-size": {
        stops: [
          [14, 10],
          [15, 10],
          [16, 11],
          [18, 12],
        ],
      },
      "text-field": "{name}",
      "symbol-avoid-edges": false,
      "symbol-spacing": {
        stops: [
          [6, 200],
          [16, 250],
        ],
      },
      "text-pitch-alignment": "auto",
      "text-rotation-alignment": "auto",
      "text-justify": "center",
      "text-letter-spacing": {
        stops: [
          [14, 0],
          [16, 0.2],
        ],
      },
    },
    paint: {
      "text-color": "#838383",
      "text-halo-color": "#fff",
      "text-halo-width": 1,
    },
  },
];
