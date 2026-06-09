import type { FeatureCollection } from "geojson";
import { AddLayerObject, SourceSpecification, StyleSpecification } from "maplibre-gl";
export declare const mask: FeatureCollection;
export declare const wpfGeoJson: () => Promise<FeatureCollection<import("geojson").Geometry, import("geojson").GeoJsonProperties>>;
export declare const maskSource: SourceSpecification;
export declare const maskLayer: AddLayerObject;
export declare const wpfStyle: (geojson: FeatureCollection) => StyleSpecification;
