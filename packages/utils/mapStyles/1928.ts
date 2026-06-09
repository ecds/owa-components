import type { StyleSpecification } from "maplibre-gl";

export const atl1928: StyleSpecification = {
  version: 8,
  sources: {
    atl1928: {
      type: "raster",
      tileSize: 256,
      attribution: "Emory University",
      maxzoom: 20,
      tiles: [
        "https://geoserver.ecds.emory.edu/gwc/service/wms?layers=ATLMaps:ATL28&service=WMS&request=GetMap&format=image/png&transparent=true?version=1.1.1&width=256&height=256&srs=EPSG:3857&bbox={bbox-epsg-3857}",
      ],
    },
    terrain: {
      type: "raster-dem",
      url: `https://api.maptiler.com/tiles/terrain-rgb-v2/tiles.json?key=uXfXuebPlkoPXiY3TPcv`,
    },
  },
  layers: [
    {
      id: "background",
      type: "background",
      paint: { "background-color": "lightgreen" },
    },

    {
      id: "atl1928",
      type: "raster",
      source: "atl1928",
      maxzoom: 20,
      paint: {
        "raster-opacity": 1,
      },
      layout: { visibility: "visible" },
    },
    {
      id: "hillshading",
      source: "terrain",
      type: "hillshade",
      layout: { visibility: "visible" },
      paint: {
        "hillshade-shadow-color": "#473B24",
        // "hillshade-exaggeration": 1,
      },
    },
  ],
};
