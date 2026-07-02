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
          5,
          // At zoom level 16, the circle is 50 pixels
          20,
          2,
        ],
        "circle-stroke-color": "darkgray",
        "circle-stroke-width": 1,
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
