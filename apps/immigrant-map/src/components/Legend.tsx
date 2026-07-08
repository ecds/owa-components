import { immigrantGroups } from "../data/groups";
import LegendButton from "./LegendButton";

import type { ImmigrantGroupKey } from "../data/groups";

type Props = {
  selectedGroup: ImmigrantGroupKey | undefined;
  setSelectedGroup: (group: ImmigrantGroupKey | undefined) => void;
};

const Legend = ({ selectedGroup, setSelectedGroup }: Props) => {
  const handleSelect = (group: ImmigrantGroupKey | undefined) => {
    setSelectedGroup(group);
    if (group) {
      document
        .querySelectorAll(".maplibregl-popup")
        .forEach((el) => el.remove());
    }
  };

  return (
    <>
      <button
        className={`hidden md:flex w-[calc(100%-2rem)] text-left gap-2 ms-4 border border-black/60 text-black p-1 ${selectedGroup ? "cursor-pointer" : "cursor-default"}`}
        onClick={() => handleSelect(undefined)}
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
            setSelectedGroup={handleSelect}
          />
        );
      })}
    </>
  );
};

export default Legend;
