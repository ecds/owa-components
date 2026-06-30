import type { Map } from "maplibre-gl";
import { useEffect, useState } from "react";

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
      style={{
        display: "flex",
        gap: "1rem",
        marginBottom: "1rem",
        border: "none",
        cursor: "pointer",
        fontSize: "1.1rem",
        color: "oklab(1 0 0 / 0.8)",
      }}
      onClick={() => setVisible(!visible)}
    >
      {visible ? "Hide" : "Show"} {label}
    </button>
  );
};

export default ToggleVisibility;
