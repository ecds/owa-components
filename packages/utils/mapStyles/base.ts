import type { StyleSpecification } from "maplibre-gl";
import { water } from "./water";
import { neighborhoods } from "./neighborhoodFills";
import { transportation } from "./transportation";
import { neighborhoodLabels } from "./neighborhoodLabels";
import { neighborhoodOutlines } from "./neighborhoodOutlines";
import { land } from "./land";
import { buildings } from "./buildings";
import { roadLabels } from "./roadLabels";

export const landColor = "#C3D0CE";

export const base: StyleSpecification = {
  version: 8,
  name: "Default",
  sources: {
    georgia: {
      type: "vector",
      url: "https://d3j4mgzjrheeg2.cloudfront.net/georgia.json",
      attribution:
        '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    },
    terrain: {
      type: "raster-dem",
      url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=uXfXuebPlkoPXiY3TPcv`,
    },
    ...neighborhoods.sources,
    ...neighborhoodLabels.sources,
  },
  glyphs:
    "https://api.maptiler.com/fonts/{fontstack}/{range}.pbf?key=uXfXuebPlkoPXiY3TPcv",
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": landColor },
    },
    ...land,
    ...water,
    ...transportation,
    ...neighborhoods.layers,
    ...neighborhoodOutlines.layers,
    ...roadLabels,
    ...buildings,
    {
      id: "hillshading",
      source: "terrain",
      type: "hillshade",
    },
    ...neighborhoodLabels.layers,
  ],
};
