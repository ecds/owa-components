import { useEffect, useState } from "react";

import { immigrantGroups } from "../data/groups";

import type { ImmigrantGroupKey } from "../data/groups";

interface Props {
  group: ImmigrantGroupKey;
  selectedGroup: ImmigrantGroupKey | undefined;
  setSelectedGroup: (selectedGroup: ImmigrantGroupKey | undefined) => void;
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
      className={`flex items-center gap-2 px-2 py-1 text-left text-sm font-medium text-black whitespace-nowrap ${selectedGroup && !isSelected ? "opacity-60" : "opacity-80"} ${isSelected ? "opacity-100" : ""} hover:opacity-100 disabled:font-bold disabled:text-black`}
      disabled={isSelected}
      onClick={() => handleClick(group)}
    >
      <span
        className="inline-block w-3 h-3 shrink-0 rounded-sm"
        style={{ backgroundColor: immigrantGroups[group].color }}
      />
      {immigrantGroups[group].label}
    </button>
  );
};

export default LegendButton;
