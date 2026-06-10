export type ImmigrantGroupKey =
  | "afr"
  | "car_lat_am"
  | "ce"
  | "cn"
  | "gbe"
  | "irl"
  | "med_meast"
  | "ne_we"
  | "cee";

type ImmigrantGroup = {
  label: string;
  color: string;
};

export type ImmigrantData = {
  "first name": string;
  "last name": string;
  "street #": string;
  "street name": string;
  age: string;
  sex: string;
  "birth country": string;
  race: string;
};

export const immigrantGroups = {
  afr: {
    label: "Africa",
    color: "rgb(247, 129, 191)",
  },
  car_lat_am: {
    label: "Caribbean and Latin American",
    color: "rgb(255, 255, 51)",
  },
  ce: {
    label: "Central Europe",
    color: "rgb(255, 127, 0)",
  },
  cn: {
    label: "China",
    color: "rgb(228, 26, 28)",
  },
  gbe: {
    label: "United Kingdom and British Empire",
    color: "rgb(55, 126, 184)",
  },
  irl: {
    label: "Ireland",
    color: "rgb(59, 237, 119)",
  },
  med_meast: {
    label: "Mediterranean and Middle East",
    color: "rgb(77, 175, 74)",
  },
  ne_we: {
    label: "Northern and Western Europe",
    color: "rgb(148, 79, 38)",
  },
  cee: {
    label: "Eastern Europe",
    color: "rgb(152, 78, 163)",
  },
} satisfies Record<ImmigrantGroupKey, ImmigrantGroup>;
