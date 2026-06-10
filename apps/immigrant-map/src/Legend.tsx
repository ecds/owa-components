import { useEffect, useState } from "react";
import { immigrantGroups } from "./data/groups";
import type { Map } from "maplibre-gl";
import type { ImmigrantGroupKey } from "./data/groups";
import { immigrantData } from "./styles/immigrant_data";

const Legend = ({ map }: { map: Map | undefined }) => {
  const [selectedGroup, setSelectedGroup] = useState<
    ImmigrantGroupKey | undefined
  >(undefined);

  useEffect(() => {
    if (!map) return;

    console.log("🚀 ~ Legend ~ selectedGroup:", selectedGroup);
    // if (selectedGroup) {
    for (const groupLayer of immigrantData.layers) {
      const mapLayer = map.getLayer(groupLayer.id);

      if (!mapLayer) continue;

      if (!selectedGroup || selectedGroup == groupLayer.id) {
        map.setLayoutProperty(groupLayer.id, "visibility", "visible");
      } else if (groupLayer.id !== selectedGroup) {
        map.setLayoutProperty(groupLayer.id, "visibility", "none");
      }
    }
    // } else {}
  }, [map, selectedGroup]);

  const handleClick = (group: ImmigrantGroupKey) => {
    console.log("🚀 ~ handleClick ~ group:", group);
    if (group === selectedGroup) {
      setSelectedGroup(undefined);
    } else {
      setSelectedGroup(group);
    }
  };

  return (
    <>
      <button
        style={{
          gap: "1rem",
          marginBottom: "1rem",
          backgroundColor: "inherit",
          border: "none",
          cursor: selectedGroup ? "pointer" : "default",
          fontSize: "1.1rem",
          color: "oklab(0 0 0 / 0.8)",
        }}
        onClick={() => setSelectedGroup(undefined)}
        disabled={selectedGroup ? false : true}
      >
        {selectedGroup ? "Click for All Groups" : "Click Group to Filter"}
      </button>
      {(Object.keys(immigrantGroups) as ImmigrantGroupKey[]).map((group) => {
        return (
          <button
            key={group}
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "1rem",
              backgroundColor:
                selectedGroup === group ? "lightgray" : "inherit",
              border: "none",
              cursor: "pointer",
              padding: "0.25rem",
            }}
            onClick={() => handleClick(group)}
          >
            <div
              style={{
                backgroundColor: immigrantGroups[group].color,
                height: "1.5rem",
                width: "2em",
                borderRadius: "100%",
              }}
            ></div>
            <div style={{ fontSize: "1.1rem", color: "oklab(0 0 0 / 0.8)" }}>
              {immigrantGroups[group].label}
            </div>
          </button>
        );
      })}
    </>
  );
};

export default Legend;
