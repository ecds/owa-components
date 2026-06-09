import { LngLat, LngLatBounds, Map } from "maplibre-gl";
import { positron } from "../mapStyles/positron";
import type { MapOptions, StyleSpecification } from "maplibre-gl";

export const baseMap = (mapOptions: MapOptions) => {
  const options = {
    style: positron,
    center: new LngLat(-84.38979, 33.75432),
    zoom: 9.0,
    maxBounds: new LngLatBounds(
      [-84.6591251582694, 33.62265121423327],
      [-84.13899086471818, 33.93982091532807]
    ),
    ...mapOptions,
  };
  return new Map(options);
};
