import { Layers } from "lucide-react";

import type { Dispatch, ReactNode, SetStateAction } from "react";

type Props = {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const BaseMapControl = ({ children, open, setOpen }: Props) => {
  return (
    <div className="md:hidden absolute top-20 left-2 z-5 flex flex-col items-start gap-1">
      {/* button first in DOM = anchored at bottom in flex-col-reverse */}
      <button
        className="maplibregl-ctrl maplibregl-ctrl-group text-black/80 w-8 h-8 flex items-center justify-center text-lg font-bold"
        onClick={() => setOpen((o) => !o)}
        title="Legend"
        aria-expanded={open}
      >
        <Layers />
      </button>

      {open && (
        <div className="flex flex-col max-h-[60vh] overflow-y-auto bg-white rounded shadow-md">
          {children}
        </div>
      )}
    </div>
  );
};

export default BaseMapControl;
