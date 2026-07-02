import { afr } from "./afr";
import { car_lat_am } from "./car_lat_am";
import { ce } from "./ce";
import { cee } from "./cee";
import { cn } from "./cn";
import { gbe } from "./gbe";
import { irl } from "./irl";
import { med_meast } from "./med_meast";
import { ne_we } from "./ne_we";

import type { FeatureCollection } from "geojson";

const sources = [
  { group: "afr", data: afr },
  { group: "car_lat_am", data: car_lat_am },
  { group: "ce", data: ce },
  { group: "cee", data: cee },
  { group: "cn", data: cn },
  { group: "gbe", data: gbe },
  { group: "irl", data: irl },
  { group: "med_meast", data: med_meast },
  { group: "ne_we", data: ne_we },
];

export const immigrants: FeatureCollection = {
  type: "FeatureCollection",
  features: sources.flatMap(({ group, data }) =>
    data.features.map((feature) => ({
      ...feature,
      properties: { ...feature.properties, group },
    }))
  ),
};
