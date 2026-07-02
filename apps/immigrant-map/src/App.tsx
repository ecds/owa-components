import "maplibre-gl/dist/maplibre-gl.css";

import chroma from "chroma-js";
import { Carousel } from "nuka-carousel";
import { useRef } from "react";

import { OWAPopup, PropertiesTable } from "@owa-components/ui";

import CarouselButtons from "./components/CarouselButtons";
import Legend from "./components/Legend";
import ToggleVisibility from "./components/ToggleVisibility";
import { immigrantGroups } from "./data/groups";
import { useImmigrantMap } from "./hooks/useImmigrantMap";

import type { ImmigrantGroupKey } from "./data/groups";
import type { SlideHandle } from "nuka-carousel";

const App = () => {
  const carouselRef = useRef<SlideHandle>(null);
  const { containerRef, map, selectedProperties, selectedCoordinates } =
    useImmigrantMap();

  const handlePopupClose = () => {
    carouselRef.current?.goToPage(0);
  };

  return (
    <div className="flex flex-row h-full bg-white">
      <div>
        <Legend map={map} />
        <div role="spacer" className="h-4"></div>
        <ToggleVisibility map={map} layerId="atl1895" label="1895 Map" />
        <ToggleVisibility map={map} layerId="atl1904" label="1904 Map" />
      </div>
      <div className="grow">
        <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
          {selectedProperties && (
            <OWAPopup
              map={map}
              coordinates={selectedCoordinates}
              onClose={handlePopupClose}
            >
              <Carousel
                ref={carouselRef}
                scrollDistance="screen"
                wrapMode="wrap"
                showArrows
                arrows={<CarouselButtons />}
                initialPage={0}
              >
                {selectedProperties.map((personProps) => {
                  const group = personProps.group as ImmigrantGroupKey;
                  const color = immigrantGroups[group].color;
                  return (
                    <div key={personProps.id as string} style={{ width: "280px" }}>
                      <PropertiesTable
                        properties={personProps}
                        style={{
                          backgroundColor: chroma(color).alpha(0.15).css(),
                          borderColor: color,
                          borderWidth: "2px",
                          borderCollapse: undefined,
                          borderStyle: "solid",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      />
                    </div>
                  );
                })}
              </Carousel>
            </OWAPopup>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
