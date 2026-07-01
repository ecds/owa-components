import { Popup, type Map } from "maplibre-gl";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./PropertiesPopup.css";
import type { CSSProperties, ReactNode } from "react";

interface Props {
  map: Map | undefined;
  children: ReactNode;
  coordinates: [number, number] | undefined;
  onClose?: () => void;
}

export const PropertiesTable = ({
  properties,
  style,
}: {
  properties: Record<string, unknown>;
  style?: CSSProperties;
}) => {
  const entries = Object.entries(properties).filter(
    ([k, v]) => k !== "" && v !== "",
  );

  return (
    <table
      style={{
        borderCollapse: "collapse",
        fontSize: "0.75rem",
        width: "280px",
        marginLeft: "1rem",
        marginRight: "1rem",
        ...style,
      }}
    >
      <tbody>
        {entries.map(([key, value]) => {
          if (key !== "id" && key !== "group") {
            return (
              <tr key={key}>
                <td
                  className=""
                  style={{
                    padding: "2px 8px 2px 4px",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    color: "#777",
                    textTransform: "capitalize",
                  }}
                >
                  {key}
                </td>
                <td style={{ padding: "2px 4px", color: "#333" }}>
                  {String(value)}
                </td>
              </tr>
            );
          }
          return <></>;
        })}
      </tbody>
    </table>
  );
};

export const OWAPopup = ({ map, coordinates, children, onClose }: Props) => {
  const popupContainerRef = useRef<HTMLDivElement>(
    document.createElement("div"),
  );
  const popupRef = useRef<Popup | null>(null);
  useEffect(() => {
    if (!map || !coordinates) return;
    popupRef.current = new Popup({ className: "owa-popup" })
      .setLngLat(coordinates)
      .setDOMContent(popupContainerRef.current);

    popupRef.current.addTo(map);

    if (onClose) popupRef.current.on("close", onClose);

    return () => {
      if (onClose) popupRef.current?.off("close", onClose);
      popupRef.current?.remove();
      popupRef.current = null;
    };
  }, [map, coordinates, onClose]);

  if (map && coordinates) {
    return <>{createPortal(children, popupContainerRef.current)}</>;
  }
  return <></>;
};
