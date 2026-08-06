import { useEffect, useRef, useState } from "react";
import type { Map, StyleLayer } from "maplibre-gl";
// import { WarpedMapLayer } from "@allmaps/maplibre";

interface Props {
  map: Map | undefined;
  layer: StyleLayer | undefined;
  className?: string;
}

const OpacitySlider = ({ map, layer, className }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentOpacity, setCurrentOpacity] = useState<number>(1);

  useEffect(() => {
    if (!map || !layer) return;
    if (map.getLayer(layer.id)) {
      // layer.setPaintProperty("opacity", currentOpacity);
      if (layer.renderer) layer.setOpacity(currentOpacity);
    }
  }, [map, layer, currentOpacity]);

  const handleChange = () => {
    if (!inputRef.current || !map || !layer) return;
    setCurrentOpacity(parseFloat(inputRef.current.value));
  };

  if (!layer) return <></>;

  return (
    <div
      className={
        className ??
        "absolute z-100 top-10 left-10 bg-gray-700 p-2 rounded-md text-white flex flex-col text-lg"
      }
    >
      <label htmlFor={`${layer.id}-opacity`}>
        Opacity {currentOpacity * 100}%
      </label>
      <input
        ref={inputRef}
        type="range"
        id={`${layer.id}-opacity`}
        onChange={handleChange}
        value={currentOpacity}
        min={0}
        max={1}
        step={0.1}
      ></input>
    </div>
  );
};

export default OpacitySlider;
