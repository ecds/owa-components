import { immigrants } from "../data";
import { immigrantGroups } from "../data/groups";

import type { StyleSpecification } from "maplibre-gl";

export const immigrantData = {
  version: 8,
  sources: {
    immigrants: {
      type: "geojson",
      data: immigrants,
    },
  },
  layers: [
    // Shadow layer gives circles a sense of depth
    {
      id: "immigrants-shadow",
      source: "immigrants",
      type: "circle",
      layout: { visibility: "visible" },
      paint: {
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          10,
          9,
          20,
          6,
        ],
        "circle-blur": 0.6,
        "circle-color": "rgba(0,0,0,0.35)",
        "circle-translate": [1, 2],
      },
    },
    {
      id: "immigrants",
      source: "immigrants",
      type: "circle",
      layout: { visibility: "visible" },
      paint: {
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          // At zoom level 10, the circle is 5 pixels
          10,
          7,
          // At zoom level 16, the circle is 50 pixels
          20,
          4,
        ],
        "circle-stroke-color": "rgba(255,255,255,0.85)",
        "circle-stroke-width": 1.5,
        "circle-color": [
          "match",
          ["get", "group"],
          "afr",
          immigrantGroups.afr.color,
          "car_lat_am",
          immigrantGroups.car_lat_am.color,
          "ce",
          immigrantGroups.ce.color,
          "cn",
          immigrantGroups.cn.color,
          "gbe",
          immigrantGroups.gbe.color,
          "irl",
          immigrantGroups.irl.color,
          "med_meast",
          immigrantGroups.med_meast.color,
          "ne_we",
          immigrantGroups.ne_we.color,
          "cee",
          immigrantGroups.cee.color,
          "#000",
        ],
      },
    },
  ],
} satisfies StyleSpecification;
