import { bbox, featureCollection } from "@turf/turf";
import { africa } from "./africa";
import { caribbeanLatinAm } from "./caribbean_latin_am";
import { centralEurope } from "./central_europe";
import { china } from "./china";
import { greatBritainColonies } from "./great_britain_and_colonies";
import { ireland } from "./ireland";
import { mediterranean } from "./mediterranean_me";
import { northwesternEurope } from "./northwestern_europe";
import { russiaPoland } from "./russia_poland";
import { LngLatBounds } from "maplibre-gl";

const combinedFeatures = [
  ...africa.features,
  ...caribbeanLatinAm.features,
  ...centralEurope.features,
  ...china.features,
  ...greatBritainColonies.features,
  ...ireland.features,
  ...mediterranean.features,
  ...northwesternEurope.features,
  ...russiaPoland.features,
];

const mergedCollection = featureCollection(combinedFeatures);
// [-84.4200547, 33.7223628, -84.3332088, 33.7832202]
const mergedBounds = bbox(mergedCollection);
export const dataBounds = new LngLatBounds(
  [mergedBounds[0], mergedBounds[1]],
  [mergedBounds[2], mergedBounds[3]],
);
