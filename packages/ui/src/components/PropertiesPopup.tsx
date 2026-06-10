import { Popup, type Map } from "maplibre-gl";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./PropertiesPopup.css";
import type { ReactNode } from "react";

interface Props {
  map: Map | undefined;
  children: ReactNode;
  coordinates: [number, number] | undefined;
}

export const PropertiesTable = ({
  properties,
}: {
  properties: Record<string, unknown>;
}) => {
  const entries = Object.entries(properties).filter(
    ([k, v]) => k !== "" && v !== "",
  );

  return (
    <table
      style={{
        borderCollapse: "collapse",
        fontSize: "0.75rem",
        width: "100%",
      }}
    >
      <tbody>
        {entries.map(([key, value]) => (
          <tr key={key}>
            <td
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
        ))}
      </tbody>
    </table>
  );
};

export const OWAPopup = ({ map, coordinates, children }: Props) => {
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

    return () => {
      popupRef.current?.remove();
      popupRef.current = null;
    };
  }, [map, coordinates]);

  if (map && coordinates) {
    return <>{createPortal(children, popupContainerRef.current)}</>;
  }
  return <></>;
};
