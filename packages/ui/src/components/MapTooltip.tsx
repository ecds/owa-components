import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Popup } from "maplibre-gl";
import type { LngLatLike, Map } from "maplibre-gl";

interface Props {
  children: ReactNode;
  show: boolean;
  map: Map;
}

const MapTooltip = ({ children, show, map }: Props) => {
  const popupContainerRef = useRef<HTMLDivElement>(
    document.createElement("div")
  );
  const popupRef = useRef<Popup | null>(null);

  useEffect(() => {
    popupRef.current = new Popup({
      closeButton: false,
    })
      .setDOMContent(popupContainerRef.current)
      .trackPointer();
  }, []);

  useEffect(() => {
    if (show && popupRef.current) {
      popupRef.current.addTo(map);
    } else {
      popupRef.current?.remove();
    }
    console.log("🚀 ~ MapTooltip ~ show:", show, children);
  }, [show, map]);

  return <>{createPortal(<div>{children}</div>, popupContainerRef.current)}</>;
};

export default MapTooltip;
