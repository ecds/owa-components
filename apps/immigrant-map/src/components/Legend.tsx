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
    <div className="flex flex-col">
      <button
        className="px-2 py-1 text-left text-xs font-medium text-black/80 whitespace-nowrap disabled:opacity-40"
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
    </div>
  );
};

export default Legend;
