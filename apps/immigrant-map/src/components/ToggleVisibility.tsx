import { MapMinus, MapPlus } from "lucide-react";
import { useEffect, useState } from "react";

import type { Map } from "maplibre-gl";

interface Props {
  map: Map | undefined;
  layerId: string;
  label: string;
}

const ToggleVisibility = ({ map, layerId, label }: Props) => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!map) return;
    map.setLayoutProperty(layerId, "visibility", visible ? "visible" : "none");
  }, [map, visible, layerId]);
  return (
    <button
      className={`w-[calc(100%-2rem)] text-left flex gap-2 ms-4 border border-black/60 cursor-pointer p-1 hover:opacity-100`}
      onClick={() => setVisible(!visible)}
    >
      {visible ? (
        <>
          <MapMinus size={16} /> Hide
        </>
      ) : (
        <>
          <MapPlus size={16} /> Show
        </>
      )}{" "}
      {label}
    </button>
  );
};

export default ToggleVisibility;
