import type { StyleSpecification } from "maplibre-gl";

import { ohmRoadLabelLayers } from "./ohmRoadLabels";
import { ohmRoadLayers } from "./ohmRoads";
import { mapBackground } from "./background";

// Full MapLibre style using OpenHistoricalMap vector tiles with the same visual
// treatment as modern.ts for roads, rails, landcover, landuse, parks, water,
// and cemeteries.
//
// Source-layer / property translation from modern.ts (OMT schema) → OHM schema:
//   transportation      → transport_lines
//   landcover           → landuse_areas  (OHM has no separate landcover layer)
//   landuse             → landuse_areas
//   waterway            → water_lines
//   water               → water_areas
//   class               → type
//   brunnel             → bridge / tunnel (integer 1 = true)
//
// sizerank from modern.ts is not available in OHM; zoom-level step filters
// are used instead for progressive feature reveal.

export const ohmModern: StyleSpecification = {
  version: 8,
  name: "Historic",
  sources: {
    ohm: {
      type: "vector",
      tiles: ["https://vtiles.openhistoricalmap.org/maps/ohm/{z}/{x}/{y}.pbf"],
      attribution:
        '<a href="https://www.openhistoricalmap.org/">OpenHistoricalMap</a>',
    },
    hillshadeSource: {
      type: "raster-dem",
      url: "https://tiles.mapterhorn.com/tilejson.json",
      tileSize: 256,
      maxzoom: 16,
    },
  },
  sprite:
    "https://www.openhistoricalmap.org/map-styles/historical/historical_spritesheet",
  glyphs:
    "https://www.openhistoricalmap.org/map-styles/fonts/{fontstack}/{range}.pbf",
  layers: [
    // ── Background ────────────────────────────────────────────────────────────

    // {
    //   id: "ohm-land",
    //   type: "background",
    //   paint: {
    //     "background-color": [
    //       "interpolate",
    //       ["linear"],
    //       ["zoom"],
    //       11,
    //       "hsl(0, 0%, 91%)",
    //       12,
    //       "hsl(65, 36%, 81%)",
    //     ],
    //   },
    // },

    mapBackground,

    // ── Nature reserves / protected areas ─────────────────────────────────────

    {
      id: "ohm-nature-reserve",
      type: "fill",
      source: "ohm",
      "source-layer": "landuse_areas",
      minzoom: 9,
      filter: [
        "match",
        ["get", "type"],
        ["nature_reserve", "national_park", "protected_area"],
        true,
        false,
      ],
      paint: {
        "fill-antialias": false,
        "fill-color": "hsl(85, 28%, 70%)",
      },
    },

    // ── Landcover (wood, grass, farmland, wetland, sand, rock) ────────────────

    {
      id: "ohm-landcover",
      type: "fill",
      source: "ohm",
      "source-layer": "landuse_areas",
      minzoom: 7,
      filter: [
        "match",
        ["get", "type"],
        [
          "wood",
          "forest",
          "grass",
          "meadow",
          "farmland",
          "farmyard",
          "orchard",
          "vineyard",
          "rock",
          "bare_rock",
          "sand",
          "beach",
          "wetland",
          "marsh",
        ],
        true,
        false,
      ],
      paint: {
        "fill-antialias": false,
        "fill-color": [
          "match",
          ["get", "type"],
          ["wood", "forest"],
          "hsl(93, 24%, 50%)",
          ["grass", "meadow"],
          "hsl(65, 52%, 76%)",
          ["farmland", "farmyard", "orchard", "vineyard"],
          "hsl(62, 56%, 80%)",
          ["rock", "bare_rock", "sand", "beach"],
          "hsl(55, 62%, 88%)",
          ["wetland", "marsh"],
          "hsl(151, 32%, 76%)",
          "hsl(68, 34%, 85%)",
        ],
        "fill-opacity": ["interpolate", ["linear"], ["zoom"], 7, 0.6, 12, 0.8],
      },
    },

    {
      id: "ohm-landcover-glow",
      type: "line",
      source: "ohm",
      "source-layer": "landuse_areas",
      minzoom: 7,
      filter: [
        "match",
        ["get", "type"],
        [
          "wood",
          "forest",
          "grass",
          "meadow",
          "farmland",
          "farmyard",
          "orchard",
          "vineyard",
          "rock",
          "bare_rock",
          "sand",
          "beach",
          "wetland",
          "marsh",
        ],
        true,
        false,
      ],
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-blur": ["interpolate", ["linear"], ["zoom"], 7, 5, 9, 8, 10, 12],
        "line-color": [
          "match",
          ["get", "type"],
          ["wood", "forest"],
          "hsl(93, 24%, 50%)",
          ["grass", "meadow"],
          "hsl(65, 52%, 76%)",
          ["farmland", "farmyard", "orchard", "vineyard"],
          "hsl(62, 56%, 80%)",
          ["rock", "bare_rock", "sand", "beach"],
          "hsl(55, 62%, 88%)",
          ["wetland", "marsh"],
          "hsl(151, 32%, 76%)",
          "hsl(68, 34%, 85%)",
        ],
        "line-opacity": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          12,
          0.8,
          22,
          0,
        ],
        "line-width": ["interpolate", ["linear"], ["zoom"], 7, 5, 9, 8, 10, 12],
      },
    },

    // ── Wetland ───────────────────────────────────────────────────────────────

    {
      id: "ohm-wetland",
      type: "fill",
      source: "ohm",
      "source-layer": "landuse_areas",
      minzoom: 5,
      filter: ["match", ["get", "type"], ["wetland", "marsh"], true, false],
      paint: {
        "fill-color": "hsl(151, 32%, 76%)",
        "fill-opacity": [
          "interpolate",
          ["linear"],
          ["zoom"],
          10,
          0.6,
          10.5,
          0.75,
        ],
      },
    },

    {
      id: "ohm-wetland-glow",
      type: "line",
      source: "ohm",
      "source-layer": "landuse_areas",
      maxzoom: 12,
      filter: ["match", ["get", "type"], ["wetland", "marsh"], true, false],
      layout: { "line-join": "round" },
      paint: {
        "line-blur": ["interpolate", ["linear"], ["zoom"], 2, 7, 22, 6],
        "line-color": "hsl(151, 32%, 76%)",
        "line-opacity": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          8,
          0.8,
          12,
          0,
        ],
        "line-width": 6,
      },
    },

    // ── Urban landuse (residential, commercial, etc.) ─────────────────────────

    {
      id: "ohm-landuse-urban",
      type: "fill",
      source: "ohm",
      "source-layer": "landuse_areas",
      minzoom: 7,
      filter: [
        "match",
        ["get", "type"],
        [
          "residential",
          "commercial",
          "retail",
          "school",
          "university",
          "kindergarten",
          "college",
          "hospital",
          "stadium",
        ],
        true,
        false,
      ],
      paint: {
        "fill-antialias": false,
        "fill-color": "hsl(0, 0%, 91%)",
      },
    },

    {
      id: "ohm-landuse-urban-outline",
      type: "line",
      source: "ohm",
      "source-layer": "landuse_areas",
      minzoom: 7,
      filter: [
        "match",
        ["get", "type"],
        [
          "residential",
          "commercial",
          "retail",
          "school",
          "university",
          "kindergarten",
          "college",
          "hospital",
          "stadium",
        ],
        true,
        false,
      ],
      paint: {
        "line-blur": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          7,
          1,
          12,
          6,
          18,
          10,
        ],
        "line-color": "hsl(0, 0%, 91%)",
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          7,
          1,
          12,
          18,
          18,
          30,
        ],
      },
    },

    // ── General landuse (parks, cemetery, industrial …) ───────────────────────

    {
      id: "ohm-landuse",
      type: "fill",
      source: "ohm",
      "source-layer": "landuse_areas",
      minzoom: 5,
      filter: [
        "match",
        ["get", "type"],
        [
          "wood",
          "forest",
          "grass",
          "meadow",
          "scrub",
          "farmland",
          "orchard",
          "vineyard",
          "park",
          "recreation_ground",
          "cemetery",
          "industrial",
          "commercial",
          "retail",
          "quarry",
          "railway",
          "residential",
          "sand",
          "beach",
          "rock",
          "bare_rock",
        ],
        true,
        false,
      ],
      paint: {
        "fill-antialias": false,
        "fill-color": [
          "match",
          ["get", "type"],
          ["wood", "forest"],
          "hsla(93, 11%, 69%, 0.8)",
          "scrub",
          "hsla(90, 8%, 76%, 0.6)",
          ["farmland", "orchard", "vineyard"],
          "hsla(62, 37%, 82%, 0.6)",
          ["park", "recreation_ground", "cemetery"],
          "hsl(68, 39%, 76%)",
          ["sand", "beach"],
          "hsl(50, 57%, 85%)",
          ["rock", "bare_rock"],
          "hsl(0, 0%, 95%)",
          "commercial",
          "hsl(60, 2%, 82%)",
          "residential",
          "hsl(0, 0%, 93%)",
          "industrial",
          "hsla(311, 13%, 41%, 0.8)",
          ["quarry", "railway"],
          "hsl(0, 0%, 83%)",
          "hsl(60, 2%, 80%)",
        ],
        "fill-opacity": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          8,
          ["match", ["get", "type"], "residential", 0.8, 0.2],
          16,
          ["match", ["get", "type"], "residential", 0, 1],
        ],
      },
    },

    // ── Parks / greenspace ────────────────────────────────────────────────────

    {
      id: "ohm-landuse-greenspace",
      type: "fill",
      source: "ohm",
      "source-layer": "landuse_areas",
      minzoom: 9,
      filter: [
        "match",
        ["get", "type"],
        ["park", "recreation_ground", "garden", "allotments", "golf_course"],
        true,
        false,
      ],
      paint: {
        "fill-antialias": false,
        "fill-color": "hsl(85, 28%, 70%)",
      },
    },

    {
      id: "ohm-landuse-greenspace-outline",
      type: "line",
      source: "ohm",
      "source-layer": "landuse_areas",
      minzoom: 9,
      filter: [
        "match",
        ["get", "type"],
        ["park", "recreation_ground", "garden", "allotments", "golf_course"],
        true,
        false,
      ],
      paint: {
        "line-blur": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          9,
          1,
          18,
          10,
        ],
        "line-color": "hsl(85, 28%, 70%)",
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          9,
          1,
          18,
          30,
        ],
      },
    },

    {
      id: "ohm-landuse-pitch",
      type: "fill",
      source: "ohm",
      "source-layer": "landuse_areas",
      minzoom: 7,
      filter: ["match", ["get", "type"], ["pitch", "playground"], true, false],
      paint: {
        "fill-antialias": false,
        "fill-color": "hsl(89, 21%, 76%)",
      },
    },

    // ── Hillshade ─────────────────────────────────────────────────────────────

    // {
    //   id: "ohm-hillshade",
    //   type: "hillshade",
    //   source: "hillshadeSource",
    //   paint: { "hillshade-shadow-color": "#473B24" },
    // },

    // ── Water ─────────────────────────────────────────────────────────────────

    {
      id: "ohm-waterway-shadow",
      type: "line",
      source: "ohm",
      "source-layer": "water_lines",
      minzoom: 6,
      filter: [
        "match",
        ["get", "type"],
        ["river", "stream", "canal", "drain", "ditch"],
        true,
        false,
      ],
      layout: {
        "line-cap": ["step", ["zoom"], "butt", 11, "round"],
        "line-join": ["step", ["zoom"], "miter", 11, "round"],
      },
      paint: {
        "line-color": "hsl(229, 37%, 69%)",
        "line-opacity": ["interpolate", ["linear"], ["zoom"], 6, 0.6, 9, 1],
        "line-translate": [
          "interpolate",
          ["exponential", 1.2],
          ["zoom"],
          7,
          ["literal", [0, 0]],
          16,
          ["literal", [-1, -1]],
        ],
        "line-translate-anchor": "viewport",
        "line-width": [
          "interpolate",
          ["exponential", 1.3],
          ["zoom"],
          8,
          0.5,
          9,
          1,
          20,
          3,
        ],
      },
    },

    {
      id: "ohm-water-shadow",
      type: "fill",
      source: "ohm",
      "source-layer": "water_areas",
      minzoom: 7,
      paint: {
        "fill-color": "hsl(229, 37%, 69%)",
        "fill-translate": [
          "interpolate",
          ["exponential", 1.2],
          ["zoom"],
          7,
          ["literal", [0, 0]],
          16,
          ["literal", [-1, -1]],
        ],
        "fill-translate-anchor": "viewport",
      },
    },

    {
      id: "ohm-waterway",
      type: "line",
      source: "ohm",
      "source-layer": "water_lines",
      minzoom: 3,
      filter: [
        "match",
        ["get", "type"],
        ["river", "stream", "canal", "drain", "ditch"],
        true,
        false,
      ],
      layout: {
        "line-cap": ["step", ["zoom"], "butt", 11, "round"],
        "line-join": ["step", ["zoom"], "miter", 11, "round"],
      },
      paint: {
        "line-color": "hsl(209, 33%, 70%)",
        "line-width": [
          "interpolate",
          ["exponential", 1.3],
          ["zoom"],
          8,
          0.5,
          9,
          1,
          20,
          3,
        ],
      },
    },

    {
      id: "ohm-waterway-glow",
      type: "line",
      source: "ohm",
      "source-layer": "water_lines",
      minzoom: 4,
      filter: [
        "match",
        ["get", "type"],
        ["river", "stream", "canal", "drain", "ditch"],
        true,
        false,
      ],
      layout: {
        "line-cap": ["step", ["zoom"], "butt", 11, "round"],
        "line-join": ["step", ["zoom"], "miter", 11, "round"],
      },
      paint: {
        "line-blur": ["interpolate", ["linear"], ["zoom"], 6, 5, 12, 10],
        "line-color": "hsl(209, 33%, 70%)",
        "line-opacity": ["interpolate", ["linear"], ["zoom"], 6, 0.2, 7, 0.4],
        "line-width": ["interpolate", ["linear"], ["zoom"], 6, 5, 12, 10],
      },
    },

    {
      id: "ohm-water",
      type: "fill",
      source: "ohm",
      "source-layer": "water_areas",
      paint: { "fill-color": "hsl(209, 33%, 70%)" },
    },

    // ── Roads & labels (generated from shared OHM road layer helpers) ──────────

    ...ohmRoadLayers(),

    // ── Rail ──────────────────────────────────────────────────────────────────

    {
      id: "ohm-rail",
      type: "line",
      source: "ohm",
      "source-layer": "transport_lines",
      minzoom: 13,
      filter: [
        "all",
        [
          "match",
          ["get", "type"],
          [
            "rail",
            // "tram",
            "subway",
            "narrow_gauge",
            "light_rail",
            "monorail",
            "funicular",
          ],
          true,
          false,
        ],
        ["!=", ["get", "usage"], "main"],
        ["!=", ["coalesce", ["get", "bridge"], 0], 1],
        ["!=", ["coalesce", ["get", "tunnel"], 0], 1],
      ],
      paint: {
        "line-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          13,
          "hsl(0, 0%, 60%)",
          16,
          "hsl(0, 0%, 64%)",
        ],
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          10,
          0.15,
          20,
          0.25,
        ],
      },
    },

    {
      id: "ohm-rail-tracks",
      type: "line",
      source: "ohm",
      "source-layer": "transport_lines",
      minzoom: 13,
      filter: [
        "all",
        [
          "match",
          ["get", "type"],
          [
            "rail",
            // "tram",
            "subway",
            "narrow_gauge",
            "light_rail",
            "monorail",
            "funicular",
          ],
          true,
          false,
        ],
        ["!=", ["get", "usage"], "main"],
        ["!=", ["coalesce", ["get", "bridge"], 0], 1],
        ["!=", ["coalesce", ["get", "tunnel"], 0], 1],
      ],
      paint: {
        "line-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          13,
          "hsl(0, 0%, 60%)",
          16,
          "hsl(0, 0%, 64%)",
        ],
        "line-dasharray": [0.2, 1],
        "line-opacity": ["interpolate", ["linear"], ["zoom"], 13.75, 0, 14, 1],
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          9.5,
          3,
          20,
          6,
        ],
      },
    },

    // Wide OHM-style pass — visible at low zoom, fades out as detail takes over
    {
      id: "ohm-rail-main",
      type: "line",
      source: "ohm",
      "source-layer": "transport_lines",
      minzoom: 7,
      filter: [
        "all",
        [
          "match",
          ["get", "type"],
          ["rail", "light_rail", "preserved"],
          true,
          false,
        ],
        ["!", ["in", ["get", "service"], ["literal", ["siding", "yard"]]]],
        ["!", ["in", ["get", "type"], ["literal", ["tram"]]]],
        ["==", ["get", "usage"], "main"],
        ["!=", ["coalesce", ["get", "bridge"], 0], 1],
        ["!=", ["coalesce", ["get", "tunnel"], 0], 1],
      ],
      layout: { "line-cap": "square", "line-join": "round" },
      paint: {
        "line-color": "rgba(148, 159, 168, 1)",
        "line-width": ["interpolate", ["linear"], ["zoom"], 7, 3, 12, 4, 20, 5],
        "line-opacity": ["interpolate", ["linear"], ["zoom"], 14, 1, 15, 0],
      },
    },

    // Thin detail pass — fades in as the wide layer fades out
    {
      id: "ohm-rail-main-detail",
      type: "line",
      source: "ohm",
      "source-layer": "transport_lines",
      minzoom: 7,
      filter: [
        "all",
        [
          "match",
          ["get", "type"],
          ["rail", "light_rail", "preserved"],
          true,
          false,
        ],
        ["!", ["in", ["get", "service"], ["literal", ["siding", "yard"]]]],
        ["!", ["in", ["get", "type"], ["literal", ["tram"]]]],
        ["==", ["get", "usage"], "main"],
        ["!=", ["coalesce", ["get", "bridge"], 0], 1],
        ["!=", ["coalesce", ["get", "tunnel"], 0], 1],
      ],
      layout: { "line-cap": "square", "line-join": "round" },
      paint: {
        "line-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          13,
          "hsl(0, 0%, 60%)",
          16,
          "hsl(0, 0%, 64%)",
        ],
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          10,
          0.5,
          20,
          1,
        ],
        "line-opacity": ["interpolate", ["linear"], ["zoom"], 14, 0, 15, 1],
      },
    },

    // Wide OHM-style dashes — visible at low zoom, fades out as detail takes over
    {
      id: "ohm-rail-main-dash",
      type: "line",
      source: "ohm",
      "source-layer": "transport_lines",
      minzoom: 7,
      filter: [
        "all",
        [
          "match",
          ["get", "type"],
          ["rail", "light_rail", "preserved"],
          true,
          false,
        ],
        ["!", ["in", ["get", "service"], ["literal", ["siding", "yard"]]]],
        ["!", ["in", ["get", "type"], ["literal", ["tram"]]]],
        ["==", ["get", "usage"], "main"],
        ["!=", ["coalesce", ["get", "bridge"], 0], 1],
        ["!=", ["coalesce", ["get", "tunnel"], 0], 1],
      ],
      layout: { "line-cap": "square", "line-join": "round" },
      paint: {
        "line-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          6,
          "rgba(223, 223, 223, 1)",
          15,
          "rgba(255, 255, 255, 1)",
        ],
        "line-width": [
          "interpolate",
          ["linear"],
          ["zoom"],
          7,
          1.5,
          12,
          2,
          20,
          3,
        ],
        "line-dasharray": [
          "step",
          ["zoom"],
          ["literal", [7, 7]],
          12,
          ["literal", [5, 5]],
          15,
          ["literal", [4, 4]],
        ],
        "line-opacity": ["interpolate", ["linear"], ["zoom"], 14, 1, 15, 0],
      },
    },

    // Thin detail dashes — fades in as the wide dashes fade out
    {
      id: "ohm-rail-main-dash-detail",
      type: "line",
      source: "ohm",
      "source-layer": "transport_lines",
      minzoom: 7,
      filter: [
        "all",
        [
          "match",
          ["get", "type"],
          ["rail", "light_rail", "preserved"],
          true,
          false,
        ],
        ["!", ["in", ["get", "service"], ["literal", ["siding", "yard"]]]],
        ["!", ["in", ["get", "type"], ["literal", ["tram"]]]],
        ["==", ["get", "usage"], "main"],
        ["!=", ["coalesce", ["get", "bridge"], 0], 1],
        ["!=", ["coalesce", ["get", "tunnel"], 0], 1],
      ],
      layout: { "line-cap": "square", "line-join": "round" },
      paint: {
        "line-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          13,
          "hsl(0, 0%, 60%)",
          16,
          "hsl(0, 0%, 64%)",
        ],
        "line-dasharray": [0.2, 1],
        "line-opacity": ["interpolate", ["linear"], ["zoom"], 14, 0, 15, 1],
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          10,
          4,
          20,
          8,
        ],
      },
    },

    {
      id: "ohm-bridge-rail",
      type: "line",
      source: "ohm",
      "source-layer": "transport_lines",
      minzoom: 13,
      filter: [
        "all",
        [
          "match",
          ["get", "type"],
          [
            "rail",
            // "tram",
            "subway",
            "narrow_gauge",
            "light_rail",
            "monorail",
            "funicular",
          ],
          true,
          false,
        ],
        ["==", ["coalesce", ["get", "bridge"], 0], 1],
      ],
      paint: {
        "line-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          13,
          "hsl(0, 0%, 60%)",
          16,
          "hsl(0, 0%, 64%)",
        ],
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          14,
          0.5,
          20,
          1,
        ],
      },
    },

    {
      id: "ohm-bridge-rail-tracks",
      type: "line",
      source: "ohm",
      "source-layer": "transport_lines",
      minzoom: 13,
      filter: [
        "all",
        [
          "match",
          ["get", "type"],
          [
            "rail",
            // "tram",
            "subway",
            "narrow_gauge",
            "light_rail",
            "monorail",
            "funicular",
          ],
          true,
          false,
        ],
        ["==", ["coalesce", ["get", "bridge"], 0], 1],
      ],
      paint: {
        "line-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          13,
          "hsl(0, 0%, 60%)",
          16,
          "hsl(0, 0%, 64%)",
        ],
        "line-dasharray": [0.2, 1],
        "line-opacity": ["interpolate", ["linear"], ["zoom"], 13.75, 0, 14, 1],
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          9.5,
          3,
          20,
          6,
        ],
      },
    },

    // ── Streetcars ───────────────────────────────────────────────────────────
    {
      id: "ohm-transit-rail",
      type: "line",
      source: "ohm",
      "source-layer": "transport_lines",
      minzoom: 13,
      filter: [
        "all",
        [
          "match",
          ["get", "type"],
          ["tram", "subway", "light_rail", "monorail", "funicular"],
          true,
          false,
        ],
        ["!=", ["get", "usage"], "main"],
        ["!=", ["coalesce", ["get", "bridge"], 0], 1],
        ["!=", ["coalesce", ["get", "tunnel"], 0], 1],
      ],
      paint: {
        "line-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          13,
          "white",
          16,
          "white",
        ],
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          10,
          0.15,
          20,
          1,
        ],
      },
    },

    {
      id: "ohm-rail-transit-rails",
      type: "line",
      source: "ohm",
      "source-layer": "transport_lines",
      minzoom: 13,
      filter: [
        "all",
        [
          "match",
          ["get", "type"],
          ["tram", "subway", "light_rail", "monorail", "funicular"],
          true,
          false,
        ],
        ["!=", ["get", "usage"], "main"],
        ["!=", ["coalesce", ["get", "bridge"], 0], 1],
        ["!=", ["coalesce", ["get", "tunnel"], 0], 1],
      ],
      paint: {
        "line-color": [
          "interpolate",
          ["linear"],
          ["zoom"],
          13,
          "white",
          16,
          "white",
        ],
        "line-dasharray": [0.2, 1],
        "line-opacity": ["interpolate", ["linear"], ["zoom"], 13.75, 0, 14, 1],
        "line-width": [
          "interpolate",
          ["exponential", 1.5],
          ["zoom"],
          9.5,
          3,
          20,
          8,
        ],
      },
    },

    // ── Buildings ───────────────────────────────────────────────────────────
    {
      id: "building",
      type: "fill",
      source: "ohm",
      "source-layer": "buildings",
      minzoom: 11,
      maxzoom: 16,
      paint: {
        "fill-color": "hsl(35, 8%, 85%)",
        "fill-outline-color": "hsl(35, 6%, 79%)",
      },
    },
    {
      id: "building-3d",
      type: "fill-extrusion",
      source: "ohm",
      "source-layer": "buildings",
      minzoom: 16,
      paint: {
        "fill-extrusion-color": "hsl(35, 8%, 85%)",
        "fill-extrusion-height": {
          property: "render_height",
          type: "identity",
        },
        "fill-extrusion-base": {
          property: "render_min_height",
          type: "identity",
        },
        "fill-extrusion-opacity": 0.8,
      },
    },

    // ── Road labels ───────────────────────────────────────────────────────────

    ...ohmRoadLabelLayers(),
  ],
};
