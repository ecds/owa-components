import { mapBackground } from "./background";
import type { StyleSpecification } from "maplibre-gl";

export const atl1895: StyleSpecification = {
  version: 8,
  name: "1891 Atlas",
  sources: {
    atl1895: {
      type: "raster",
      tileSize: 256,
      attribution: "Emory University",
      maxzoom: 20,
      tiles: [
        "https://geoserver.ecds.emory.edu/gwc/service/wms?layers=ATLMaps:2s4d022m&service=WMS&request=GetMap&format=image/png&transparent=true?version=1.1.1&width=256&height=256&srs=EPSG:3857&bbox={bbox-epsg-3857}",
      ],
    },
  },
  layers: [
    mapBackground,
    {
      id: "atl1895",
      type: "raster",
      source: "atl1895",
      maxzoom: 20,
      paint: {
        "raster-opacity": 0.8,
      },
      layout: { visibility: "visible" },
    },
  ],
};
