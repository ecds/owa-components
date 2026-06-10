import { bbox, featureCollection } from "@turf/turf";
import { afr } from "./afr";
import { car_lat_am } from "./car_lat_am";
import { ce } from "./ce";
import { cn } from "./cn";
import { gbe } from "./gbe";
import { irl } from "./irl";
import { med_meast } from "./med_meast";
import { ne_we } from "./ne_we";
import { cee } from "./cee";
import { LngLatBounds } from "maplibre-gl";

const combinedFeatures = [
  ...afr.features,
  ...car_lat_am.features,
  ...ce.features,
  ...cn.features,
  ...gbe.features,
  ...irl.features,
  ...med_meast.features,
  ...ne_we.features,
  ...cee.features,
];

const mergedCollection = featureCollection(combinedFeatures);
// [-84.4200547, 33.7223628, -84.3332088, 33.7832202]
const mergedBounds = bbox(mergedCollection);
export const dataBounds = new LngLatBounds(
  [mergedBounds[0], mergedBounds[1]],
  [mergedBounds[2], mergedBounds[3]],
);
