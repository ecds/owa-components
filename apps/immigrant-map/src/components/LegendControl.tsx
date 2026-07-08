import { Menu } from "lucide-react";
import { useState } from "react";

import { immigrantGroups } from "../data/groups";

import type { ImmigrantGroupKey } from "../data/groups";

type Props = {
  selectedGroup: ImmigrantGroupKey | undefined;
  setSelectedGroup: (group: ImmigrantGroupKey | undefined) => void;
};

const LegendControl = ({ selectedGroup, setSelectedGroup }: Props) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (group: ImmigrantGroupKey | undefined) => {
    setSelectedGroup(group);
    setOpen(false);
    if (group) {
      document
        .querySelectorAll(".maplibregl-popup")
        .forEach((el) => el.remove());
    }
  };

  return (
    <div className="md:hidden absolute top-8 left-2 z-10 flex flex-col items-start gap-1">
      {/* button first in DOM = anchored at bottom in flex-col-reverse */}
      <button
        className="maplibregl-ctrl maplibregl-ctrl-group text-black/80 w-8 h-8 flex items-center justify-center text-lg font-bold"
        onClick={() => setOpen((o) => !o)}
        title="Legend"
        aria-expanded={open}
      >
        {selectedGroup ? (
          <span
            className="w-4 h-4 rounded-sm border border-black/20"
            style={{ backgroundColor: immigrantGroups[selectedGroup].color }}
          />
        ) : (
          <Menu />
        )}
      </button>

      {open && (
        <div className="flex flex-col max-h-[60vh] overflow-y-auto bg-white rounded shadow-md">
          <button
            className="px-2 py-1 text-left text-xs font-medium text-black/80 whitespace-nowrap disabled:opacity-40"
            onClick={() => handleSelect(undefined)}
            disabled={!selectedGroup}
          >
            {selectedGroup ? "Show All" : "All Groups"}
          </button>
          {(Object.keys(immigrantGroups) as ImmigrantGroupKey[]).map(
            (group) => {
              const isSelected = selectedGroup === group;
              const isOther = selectedGroup && !isSelected;
              return (
                <button
                  key={group}
                  className={`flex items-center gap-2 px-2 py-1 text-left text-xs whitespace-nowrap transition-opacity ${isOther ? "opacity-50" : "opacity-90"} hover:opacity-100`}
                  onClick={() => handleSelect(isSelected ? undefined : group)}
                >
                  <span
                    className="inline-block w-3 h-3 shrink-0 rounded-sm"
                    style={{ backgroundColor: immigrantGroups[group].color }}
                  />
                  {immigrantGroups[group].label}
                </button>
              );
            },
          )}
        </div>
      )}
    </div>
  );
};

export default LegendControl;
