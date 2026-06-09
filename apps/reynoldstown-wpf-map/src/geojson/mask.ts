import { backgroundColor } from "@owa-components/utils/mapStyles/colors";
import type { FeatureCollection } from "geojson";
import {
  AddLayerObject,
  SourceSpecification,
  StyleSpecification,
} from "maplibre-gl";

export const mask: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        coordinates: [
          [
            [-80.96780766143371, 34.992567612756204],
            [-85.57573380769158, 34.992567612756204],
            [-85.57573380769158, 30.265685590191737],
            [-80.96780766143371, 30.265685590191737],
            [-80.96780766143371, 34.992567612756204],
          ],
          [
            [-84.34921896, 33.74550174],
            [-84.34972825, 33.74545386],
            [-84.35196511, 33.7450395],
            [-84.35278727, 33.74484535],
            [-84.35406722, 33.74450243],
            [-84.35547274, 33.74412764],
            [-84.35674716, 33.74384188],
            [-84.35820166, 33.74362722],
            [-84.35885697, 33.74347873],
            [-84.36233369, 33.74337162],
            [-84.36228833, 33.74666],
            [-84.36215422, 33.75248584],
            [-84.36263742, 33.75362119],
            [-84.36002712, 33.75407094],
            [-84.35895259, 33.75437587],
            [-84.35758226, 33.75474945],
            [-84.35699003, 33.75496747],
            [-84.3560641, 33.75530898],
            [-84.35510179, 33.75586764],
            [-84.35450986, 33.75633286],
            [-84.3538808, 33.75676719],
            [-84.35303031, 33.75763521],
            [-84.35195698, 33.75828688],
            [-84.35021774, 33.75949671],
            [-84.34916316, 33.75994237],
            [-84.34917695, 33.75542259],
            [-84.34922374, 33.752416],
            [-84.3492025, 33.74807407],
            [-84.34921896, 33.74550174],
          ],
        ],
        type: "Polygon",
      },
    },
  ],
};

export const wpfGeoJson = async () => {
  const response = await fetch("https://api.atlmaps.org/vector-layers/464", {
    method: "GET",
  });
  const { data } = await response.json();
  const geojson: FeatureCollection = data.attributes.geojson;
  return geojson;
};

export const maskSource: SourceSpecification = {
  type: "geojson",
  data: mask,
};

export const maskLayer: AddLayerObject = {
  id: "mask",
  source: "mask",
  type: "fill",
  paint: {
    "fill-color": backgroundColor,
    "fill-opacity": 0.75,
  },
};

export const wpfStyle = (geojson: FeatureCollection) => {
  const style: StyleSpecification = {
    version: 8,
    sources: {
      wpf: {
        type: "geojson",
        data: geojson,
      },
    },
    layers: [],
  };

  return style;
};
