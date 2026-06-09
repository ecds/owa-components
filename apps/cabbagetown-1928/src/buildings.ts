import type { GeoJSON as TGeoJSON } from "geojson";
import type { StyleSpecification } from "maplibre-gl";
import osmtogeojson from "osmtogeojson";

const cabbagetown =
  "poly:'33.75362119 -84.36263742 33.75248584 -84.36215422 33.74666 -84.36228833 33.74670354 -84.36811826 33.74798471 -84.36809964 33.74835352 -84.36862545 33.74914031 -84.36950037 33.749839 -84.37016165 33.75080436 -84.37070254 33.75132119 -84.37098538 33.75210517 -84.3684052 33.7526312 -84.3670904 33.75273756 -84.36693629 33.75261757 -84.36688898 33.75320765 -84.36457389 33.75362119 -84.36263742'";

const query = (nwr: string) => {
  return encodeURIComponent(`
    [out:json]
    [timeout:90]
    ;
    (
      nwr${nwr}(
        ${cabbagetown}
      );
    );
    out geom;
  `);
};

const getGeoJSON = async (result: Response) => {
  const data = await result.json();
  const geojsonResponse: TGeoJSON = osmtogeojson(data);
  return geojsonResponse;
};

export const buildings = async () => {
  const result = await fetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    body: `data=${query('["building"]')}`,
  });
  return await getGeoJSON(result);
};

export const buildingStyle: StyleSpecification = {
  version: 8,
  sources: {
    buildings28: {
      type: "vector",
      url: "https://d3j4mgzjrheeg2.cloudfront.net/buildings28.json",
      attribution: "Emory University",
    },
  },
  layers: [
    {
      id: "buildings28",
      source: "buildings28",
      type: "fill-extrusion",
      "source-layer": "buildings28",
      filter: ["==", ["get", "neighborhood"], "Cabbagetown"],
      paint: {
        "fill-extrusion-opacity": 0,
        "fill-extrusion-color": [
          "case",
          ["boolean", ["feature-state", "clicked"], false],
          "deeppink",
          // ["==", ["get", "Identifier"], "BD36344"],
          // "#4f452e",
          // ["==", ["get", "Identifier"], "BD26475"],
          // "#4f452e",
          ["==", ["get", "Land_Use"], "M"],
          "#AB59C9",
          ["==", ["get", "Land_Use"], "C"],
          "#E83333",
          ["==", ["get", "Land_Use"], "P"],
          "#2E6DFF",
          ["==", ["get", "Land_Use"], "R"],
          "#FFFF00",
          ["==", ["get", "Land_Use"], "TU"],
          "#FFCCFF",
          ["==", ["get", "Land_Use"], "TR"],
          "#FF6F00",
          ["==", ["get", "Land_Use"], "W"],
          "#5D4037",
          "#EBEBEB",
        ],
        "fill-extrusion-height": [
          "case",
          ["==", ["get", "Identifier"], "BD36344"],
          10,
          ["==", ["get", "Identifier"], "BD26475"],
          10,
          ["*", ["get", "calc_ht"], 0.3048],
        ],
      },
    },
  ],
};
