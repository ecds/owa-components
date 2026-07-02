import { useEffect, useState } from "react";

import { immigrantGroups } from "../data/groups";

import type { ImmigrantGroupKey } from "../data/groups";
import type { Dispatch, SetStateAction } from "react";

interface Props {
  group: ImmigrantGroupKey;
  selectedGroup: ImmigrantGroupKey | undefined;
  setSelectedGroup: Dispatch<SetStateAction<ImmigrantGroupKey | undefined>>;
}

const LegendButton = ({ group, selectedGroup, setSelectedGroup }: Props) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  useEffect(() => {
    setIsSelected(selectedGroup === group);
  }, [selectedGroup, group]);

  const handleClick = (group: ImmigrantGroupKey) => {
    if (group === selectedGroup) {
      setSelectedGroup(undefined);
    } else {
      setSelectedGroup(group);
    }
  };

  return (
    <button
      key={group}
      className={`w-[calc(100%-2rem)] text-left flex gap-2 ms-4 border border-black/60 cursor-pointer p-1 ${group === "car_lat_am" || group === "irl" || group === "afr" ? "text-black" : "text-white"} ${selectedGroup && !isSelected ? "opacity-60" : "opacity-80"} ${isSelected ? "opacity-100" : ""} hover:opacity-100`}
      style={{
        backgroundColor: immigrantGroups[group].color,
      }}
      onClick={() => handleClick(group)}
    >
      {immigrantGroups[group].label}
    </button>
  );
};

export default LegendButton;
