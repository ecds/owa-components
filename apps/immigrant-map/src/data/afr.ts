import type { GeoJSON } from "geojson";

export const afr = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-84.413865, 33.745955],
      },
      properties: {
        "first name": "S[amuel]",
        "last name": "Mpemba",
        "street #": "",
        "street name": "ATL Baptist Seminary",
        age: "13",
        sex: "male",
        "birth country": '"Africa"',
        race: "C",
        notes: "from Congo Free State (AtlBapColl 1898)",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-84.412293, 33.74636],
      },
      properties: {
        "first name": "Emma",
        "last name": "Youngblood",
        "street #": "",
        "street name": "Spelman Seminary",
        age: "15",
        sex: "female",
        "birth country": '"Africa"',
        race: "C",
        notes: "1900cen: in dorm at Spelman",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-84.412293, 33.74636],
      },
      properties: {
        "first name": "M[argaret] G",
        "last name": "Rothay [Rattray]",
        "street #": "",
        "street name": "Spelman Seminary",
        age: "18",
        sex: "female",
        "birth country": '"Africa"',
        race: "C",
        notes: "Margaret Rattray",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-84.3750967, 33.7515595],
      },
      properties: {
        "first name": "Jas M",
        "last name": "Droane",
        "street #": "30",
        "street name": "Yonge Street",
        age: "50",
        sex: "male",
        "birth country": '"Africa"',
        race: "C",
        notes: "not in census/cds",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-84.3842708, 33.7609362],
      },
      properties: {
        "first name": "E",
        "last name": "Dadwell",
        "street #": "81",
        "street name": "E Harris Street",
        age: "39",
        sex: "male",
        "birth country": '"Africa"',
        race: "W",
        notes: "Cyrus Dadswell, organist?",
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-84.3913903, 33.7407429],
      },
      properties: {
        "first name": "Mary",
        "last name": "Mitchell",
        "street #": "242",
        "street name": "Richardson Street",
        age: "22",
        sex: "female",
        "birth country": '"Africa"',
        race: "W",
        notes: "not in census/cds",
      },
    },
  ],
} satisfies GeoJSON;
