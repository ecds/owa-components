import { MapMinus, MapPlus } from "lucide-react";

import type { StyleSpecification } from "maplibre-gl";

interface Props {
  currentStyle: StyleSpecification;
  style: StyleSpecification;
  onClick: () => void;
}

const ToggleVisibility = ({ currentStyle, style, onClick }: Props) => {
  return (
    <button
      className={`w-[calc(100%-2rem)] text-left flex gap-2 ms-4 border border-black/60 cursor-pointer p-1 hover:opacity-100`}
      onClick={onClick}
    >
      {currentStyle === style ? (
        <>
          <MapMinus size={16} /> Hide
        </>
      ) : (
        <>
          <MapPlus size={16} /> Show
        </>
      )}{" "}
      {style.name}
    </button>
  );
};

export default ToggleVisibility;
