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
    modernCabbagetown: {
      type: "vector",
      url: "https://d3j4mgzjrheeg2.cloudfront.net/cabbagetown_buildings.json",
      attribution: "OpenStreetMap Contributors",
    },
  },
  layers: [
    {
      id: "modernCabbagetown",
      type: "fill-extrusion",
      source: "modernCabbagetown",
      "source-layer": "cabbagetown_buildings",
      paint: {
        "fill-extrusion-opacity": 1,
        "fill-extrusion-height": ["get", "height"],
        "fill-extrusion-color": [
          "case",
          ["boolean", ["feature-state", "clicked"], false],
          "deeppink",
          // ["==", ["get", "Identifier"], "BD36344"],
          // "#4f452e",
          // ["==", ["get", "Identifier"], "BD26475"],
          // "#4f452e",
          ["==", ["get", "landUse"], "M"],
          "#AB59C9",
          ["==", ["get", "landUse"], "C"],
          "#E83333",
          ["==", ["get", "landUse"], "P"],
          "#2E6DFF",
          ["==", ["get", "landUse"], "R"],
          "#FFFF00",
          ["==", ["get", "landUse"], "TU"],
          "#FFCCFF",
          ["==", ["get", "landUse"], "TR"],
          "#FF6F00",
          ["==", ["get", "landUse"], "W"],
          "#5D4037",
          "#EBEBEB",
        ],
      },
    },
  ],
};
