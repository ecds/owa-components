import { mapBackground } from "./background";
import type { StyleSpecification } from "maplibre-gl";

export const atl1904: StyleSpecification = {
  version: 8,
  name: "1904 Map",
  sources: {
    atl1904: {
      type: "raster",
      tileSize: 256,
      attribution:
        "<a href='https://www.atlantahistorycenter.com/buildings-and-grounds/kenan-research-center/'>Kenan Research Center</a> at the Atlanta History Center",
      maxzoom: 20,
      tiles: [
        "https://geoserver.ecds.emory.edu/gwc/service/wms?layers=ATLMaps:1904&service=WMS&request=GetMap&format=image/png&transparent=true?version=1.1.1&width=256&height=256&srs=EPSG:3857&bbox={bbox-epsg-3857}",
      ],
    },
  },
  layers: [
    mapBackground,
    {
      id: "atl1904",
      type: "raster",
      source: "atl1904",
      maxzoom: 20,
      paint: {
        "raster-opacity": 0.6,
      },
      layout: { visibility: "visible" },
    },
  ],
};
