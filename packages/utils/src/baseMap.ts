import maplibregl from "maplibre-gl";
import { positron } from "../mapStyles/positron";

export const defaultBounds = () => {
  try {
    return new maplibregl.LngLatBounds(
      [-84.6591251582694, 33.62265121423327],
      [-84.13899086471818, 33.93982091532807]
    );
  } catch {}
};

export const baseMap = ({ container }: { container: HTMLDivElement }) => {
  return new maplibregl.Map({
    container: container,
    style: positron,
    bounds: defaultBounds(),
    zoom: 9.0,
  });
};
