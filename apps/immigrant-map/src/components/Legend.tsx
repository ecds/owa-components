import { useEffect, useState } from "react";
import { immigrantGroups } from "../data/groups";
import type { Map } from "maplibre-gl";
import type { ImmigrantGroupKey } from "../data/groups";
import LegendButton from "./LegendButton";

const Legend = ({ map }: { map: Map | undefined }) => {
  const [selectedGroup, setSelectedGroup] = useState<
    ImmigrantGroupKey | undefined
  >(undefined);

  useEffect(() => {
    if (!map || !map.getLayer("immigrants")) return;

    if (selectedGroup) {
      map.setFilter("immigrants", ["==", ["get", "group"], selectedGroup]);
      // Remove all popup DOM elements
      document
        .querySelectorAll(".maplibregl-popup")
        .forEach((el) => el.remove());
    } else {
      map.setFilter("immigrants", undefined);
    }
  }, [map, selectedGroup]);

  return (
    <>
      <button
        className={`w-[calc(100%-2rem)] text-left flex gap-2 ms-4 border border-black/60 text-black p-1 ${selectedGroup ? "cursor-pointer" : "cursor-default"}`}
        onClick={() => setSelectedGroup(undefined)}
        disabled={selectedGroup ? false : true}
      >
        {selectedGroup ? "Show All Groups" : "Click Group to Filter"}
      </button>
      {(Object.keys(immigrantGroups) as ImmigrantGroupKey[]).map((group) => {
        return (
          <LegendButton
            key={group}
            group={group}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />
        );
      })}
    </>
  );
};

export default Legend;
