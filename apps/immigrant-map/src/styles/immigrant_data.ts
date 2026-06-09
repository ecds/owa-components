import type { StyleSpecification } from "maplibre-gl";
import {
  africa,
  caribbeanLatinAm,
  centralEurope,
  china,
  greatBritainColonies,
  ireland,
  mediterranean,
  northwesternEurope,
  russiaPoland,
} from "../data";

export const immigrantData: StyleSpecification = {
  version: 8,
  sources: {
    africa: {
      type: "geojson",
      data: africa,
    },
    caribbean_latin_am: {
      type: "geojson",
      data: caribbeanLatinAm,
    },
    central_europe: {
      type: "geojson",
      data: centralEurope,
    },
    china: {
      type: "geojson",
      data: china,
    },
    great_britain_and_colonies: {
      type: "geojson",
      data: greatBritainColonies,
    },
    ireland: {
      type: "geojson",
      data: ireland,
    },
    mediterranean_me: {
      type: "geojson",
      data: mediterranean,
    },
    northwestern_europe: {
      type: "geojson",
      data: northwesternEurope,
    },
    russia_poland: {
      type: "geojson",
      data: russiaPoland,
    },
  },
  layers: [
    {
      id: "africa",
      source: "africa",
      type: "circle",
      paint: {
        "circle-radius": 6,
        "circle-color": "rgb(247, 129, 191)",
        "circle-stroke-color": "lightgray",
        "circle-stroke-width": 1,
      },
    },
    {
      id: "caribbean_latin_am",
      source: "caribbean_latin_am",
      type: "circle",
      paint: {
        "circle-radius": 6,
        "circle-color": "rgb(255, 255, 51)",
        "circle-stroke-color": "lightgray",
        "circle-stroke-width": 1,
      },
    },
    {
      id: "central_europe",
      source: "central_europe",
      type: "circle",
      paint: {
        "circle-radius": 6,
        "circle-color": "rgb(255, 127, 0)",
        "circle-stroke-color": "lightgray",
        "circle-stroke-width": 1,
      },
    },
    {
      id: "china",
      source: "china",
      type: "circle",
      paint: {
        "circle-radius": 6,
        "circle-color": "rgb(228, 26, 28)",
        "circle-stroke-color": "lightgray",
        "circle-stroke-width": 1,
      },
    },
    {
      id: "great_britain_and_colonies",
      source: "great_britain_and_colonies",
      type: "circle",
      paint: {
        "circle-radius": 6,
        "circle-color": "rgb(55, 126, 184)",
        "circle-stroke-color": "lightgray",
        "circle-stroke-width": 1,
      },
    },
    {
      id: "ireland",
      source: "ireland",
      type: "circle",
      paint: {
        "circle-radius": 6,
        "circle-color": "rgb(59, 237, 119)",
        "circle-stroke-color": "lightgray",
        "circle-stroke-width": 1,
      },
    },
    {
      id: "mediterranean_me",
      source: "mediterranean_me",
      type: "circle",
      paint: {
        "circle-radius": 6,
        "circle-color": "rgb(77, 175, 74)",
        "circle-stroke-color": "lightgray",
        "circle-stroke-width": 1,
      },
    },
    {
      id: "northwestern_europe",
      source: "northwestern_europe",
      type: "circle",
      paint: {
        "circle-radius": 6,
        "circle-color": "rgb(148, 79, 38)",
        "circle-stroke-color": "lightgray",
        "circle-stroke-width": 1,
      },
    },
    {
      id: "russia_poland",
      source: "russia_poland",
      type: "circle",
      paint: {
        "circle-radius": 6,
        "circle-color": "rgb(152, 78, 163)",
        "circle-stroke-color": "lightgray",
        "circle-stroke-width": 1,
      },
    },
  ],
};
