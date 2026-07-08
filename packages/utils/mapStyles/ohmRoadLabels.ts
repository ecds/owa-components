import type { LayerSpecification } from "maplibre-gl";

// Road label layers for OpenHistoricalMap tiles, translated from modern.ts.
//
// modern.ts reads labels from a separate `transportation_name` source layer.
// OHM has no such layer — `name` and `ref` are properties on `transport_lines`.
//
// Differences from modern.ts:
//   source-layer   transportation_name → transport_lines
//   class          → type
//   minor          → unclassified
//   street_limited → residential
//   brunnel        → bridge / tunnel integer properties
//   ref_length     → computed via ["length", ["coalesce", ["get", "ref"], ""]]
//   icon-image     → omitted (US highway shield sprites are not in the OHM sprite)
export const ohmRoadLabelLayers = (
  sourceName = "ohm",
): LayerSpecification[] => [
  // Translated from road-label-simple
  {
    id: "ohm-road-label",
    type: "symbol",
    source: sourceName,
    "source-layer": "transport_lines",
    minzoom: 10,
    filter: [
      "all",
      ["!=", ["coalesce", ["get", "bridge"], 0], 1],
      ["!=", ["coalesce", ["get", "tunnel"], 0], 1],
      ["has", "name"],
      [
        "match",
        ["get", "type"],
        [
          "motorway",
          "trunk",
          "primary",
          "secondary",
          "tertiary",
          "unclassified",
          "residential",
        ],
        true,
        false,
      ],
    ],
    layout: {
      "symbol-placement": "line",
      "text-field": ["coalesce", ["get", "name:en"], ["get", "name"]],
      "text-font": ["PT Sans Narrow Regular,Inter Regular"],
      "text-letter-spacing": 0.05,
      "text-max-angle": 30,
      "text-padding": 10,
      "text-pitch-alignment": "viewport",
      "text-size": [
        "interpolate",
        ["linear"],
        ["zoom"],
        10,
        [
          "match",
          ["get", "type"],
          ["motorway", "trunk", "primary", "secondary", "tertiary"],
          11,
          9,
        ],
        18,
        [
          "match",
          ["get", "type"],
          ["motorway", "trunk", "primary", "secondary", "tertiary"],
          16,
          12,
        ],
      ],
    },
    paint: {
      "text-color": "hsl(0, 0%, 0%)",
      "text-halo-color": "hsl(0, 0%, 100%)",
      "text-halo-width": 1.5,
    },
  },

  // Translated from road-number-shield.
  // modern.ts uses icon-image to render US highway shield sprites; those sprites
  // are not present in the OHM style, so this layer renders the ref text only.
  {
    id: "ohm-road-ref",
    type: "symbol",
    source: sourceName,
    "source-layer": "transport_lines",
    minzoom: 9.5,
    filter: [
      "all",
      ["has", "ref"],
      // mirror the ref_length <= 6 guard from modern.ts
      [
        "<=",
        ["length", ["coalesce", ["get", "ref"], ""]],
        6,
      ],
      [
        "match",
        ["get", "type"],
        ["pedestrian", "service", "motorway_link"],
        false,
        true,
      ],
    ],
    layout: {
      "symbol-placement": "line",
      "symbol-spacing": [
        "interpolate",
        ["linear"],
        ["zoom"],
        11,
        400,
        14,
        600,
      ],
      "text-field": ["get", "ref"],
      "text-font": ["PT Sans Bold,Inter Bold"],
      "text-letter-spacing": 0.05,
      "text-max-angle": 38,
      "text-rotation-alignment": "viewport",
      "text-pitch-alignment": "viewport",
      "text-size": 9,
    },
    paint: {
      "text-color": "hsl(0, 2%, 16%)",
      "text-halo-color": "hsl(0, 0%, 100%)",
      "text-halo-width": 1.5,
    },
  },
];
