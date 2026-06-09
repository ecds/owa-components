import type { Map } from "maplibre-gl";
import { useEffect, useState } from "react";

interface Props {
  map: Map | undefined;
}

const Toggle1904 = ({ map }: Props) => {
  const [showing1904, setShowing1904] = useState<boolean>(false);

  useEffect(() => {
    if (!map) return;
    map.setLayoutProperty(
      "atl1904",
      "visibility",
      showing1904 ? "visible" : "none",
    );
  }, [map, showing1904]);
  return (
    <button onClick={() => setShowing1904(!showing1904)}>
      {showing1904 ? "Hide" : "Show"} 1904 Map
    </button>
  );
};

export default Toggle1904;
