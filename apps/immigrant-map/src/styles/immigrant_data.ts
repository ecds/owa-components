import type { StyleSpecification } from "maplibre-gl";
import {
  afr,
  car_lat_am,
  ce,
  cn,
  gbe,
  irl,
  med_meast,
  ne_we,
  cee,
} from "../data";

export const immigrantData = {
  version: 8,
  sources: {
    afr: {
      type: "geojson",
      data: afr,
    },
    car_lat_am: {
      type: "geojson",
      data: car_lat_am,
    },
    ce: {
      type: "geojson",
      data: ce,
    },
    cn: {
      type: "geojson",
      data: cn,
    },
    gbe: {
      type: "geojson",
      data: gbe,
    },
    irl: {
      type: "geojson",
      data: irl,
    },
    med_meast: {
      type: "geojson",
      data: med_meast,
    },
    ne_we: {
      type: "geojson",
      data: ne_we,
    },
    cee: {
      type: "geojson",
      data: cee,
    },
  },
  layers: [
    {
      id: "afr",
      source: "afr",
      type: "circle",
      layout: { visibility: "visible" },
      paint: {
        "circle-radius": 6,
        "circle-color": "rgb(247, 129, 191)",
        "circle-stroke-color": "lightgray",
        "circle-stroke-width": 1,
      },
    },
    {
      id: "car_lat_am",
      source: "car_lat_am",
      type: "circle",
      layout: { visibility: "visible" },
      paint: {
        "circle-radius": 6,
        "circle-color": "rgb(255, 255, 51)",
        "circle-stroke-color": "lightgray",
        "circle-stroke-width": 1,
      },
    },
    {
      id: "ce",
      source: "ce",
      type: "circle",
      layout: { visibility: "visible" },
      paint: {
        "circle-radius": 6,
        "circle-color": "rgb(255, 127, 0)",
        "circle-stroke-color": "lightgray",
        "circle-stroke-width": 1,
      },
    },
    {
      id: "cn",
      source: "cn",
      type: "circle",
      layout: { visibility: "visible" },
      paint: {
        "circle-radius": 6,
        "circle-color": "rgb(228, 26, 28)",
        "circle-stroke-color": "lightgray",
        "circle-stroke-width": 1,
      },
    },
    {
      id: "gbe",
      source: "gbe",
      type: "circle",
      layout: { visibility: "visible" },
      paint: {
        "circle-radius": 6,
        "circle-color": "rgb(55, 126, 184)",
        "circle-stroke-color": "lightgray",
        "circle-stroke-width": 1,
      },
    },
    {
      id: "irl",
      source: "irl",
      type: "circle",
      layout: { visibility: "visible" },
      paint: {
        "circle-radius": 6,
        "circle-color": "rgb(59, 237, 119)",
        "circle-stroke-color": "lightgray",
        "circle-stroke-width": 1,
      },
    },
    {
      id: "med_meast",
      source: "med_meast",
      type: "circle",
      layout: { visibility: "visible" },
      paint: {
        "circle-radius": 6,
        "circle-color": "rgb(77, 175, 74)",
        "circle-stroke-color": "lightgray",
        "circle-stroke-width": 1,
      },
    },
    {
      id: "ne_we",
      source: "ne_we",
      type: "circle",
      layout: { visibility: "visible" },
      paint: {
        "circle-radius": 6,
        "circle-color": "rgb(148, 79, 38)",
        "circle-stroke-color": "lightgray",
        "circle-stroke-width": 1,
      },
    },
    {
      id: "cee",
      source: "cee",
      type: "circle",
      layout: { visibility: "visible" },
      paint: {
        "circle-radius": 6,
        "circle-color": "rgb(152, 78, 163)",
        "circle-stroke-color": "lightgray",
        "circle-stroke-width": 1,
      },
    },
  ],
} satisfies StyleSpecification;
