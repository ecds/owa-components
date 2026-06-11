declare module "@openhistoricalmap/maplibre-gl-dates" {
  export function filterByDate(map: import("maplibre-gl").Map, date: Date | string): void;
  export function dateRangeFromDate(date: Date | string): object;
  export function decimalYearFromDate(date: Date): number;
}
