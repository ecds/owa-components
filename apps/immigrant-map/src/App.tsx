import "maplibre-gl/dist/maplibre-gl.css";

import chroma from "chroma-js";
import { Carousel } from "nuka-carousel";
import { useRef, useState } from "react";

import { OWAPopup, PropertiesTable } from "@owa-components/ui";
import { atl1895, atl1904, modern, ohmModern } from "@owa-components/utils";

import BaseMapControl from "./components/BaseMapControl";
import CarouselButtons from "./components/CarouselButtons";
import Legend from "./components/Legend";
import LegendControl from "./components/LegendControl";
import { immigrantGroups } from "./data/groups";
import { useImmigrantMap } from "./hooks/useImmigrantMap";

import type { ImmigrantGroupKey } from "./data/groups";
import type { SlideHandle } from "nuka-carousel";

const App = () => {
  const [baseControlOpen, setBaseControlOpen] = useState<boolean>(false);
  const carouselRef = useRef<SlideHandle>(null);
  const {
    containerRef,
    currentStyle,
    map,
    selectedProperties,
    selectedCoordinates,
    setCurrentStyle,
    selectedGroup,
    setSelectedGroup,
  } = useImmigrantMap();

  const handlePopupClose = () => {
    carouselRef.current?.goToPage(0);
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-white">
      <div className="hidden md:block md:h-full">
        <Legend
          selectedGroup={selectedGroup}
          setSelectedGroup={setSelectedGroup}
        />
        <div className="flex flex-col ms-4">
          <p className="m-0 mt-4 text-black">Select Base Map</p>
          {[atl1895, atl1904, ohmModern, modern].map((style) => {
            return (
              <label
                key={style.name}
                htmlFor={style.name}
                className="cursor-pointer text-black/80 text-sm"
                onClick={() => setCurrentStyle(style)}
              >
                <input
                  id={style.name}
                  type="radio"
                  name="base-map"
                  checked={currentStyle.name === style.name}
                />
                {style.name}
              </label>
            );
          })}
        </div>
      </div>
      <div className="grow">
        <div ref={containerRef} className="relative w-full h-full">
          <LegendControl
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
          />
          <BaseMapControl open={baseControlOpen} setOpen={setBaseControlOpen}>
            <>
              {[atl1895, atl1904, ohmModern, modern].map((style) => {
                return (
                  <label
                    key={style.name}
                    htmlFor={style.name}
                    className="cursor-pointer text-black/80 text-sm px-2 py-1"
                    onClick={() => {
                      setCurrentStyle(style);
                      setBaseControlOpen(false);
                    }}
                  >
                    <input
                      id={style.name}
                      type="radio"
                      name="base-map"
                      checked={currentStyle.name === style.name}
                    />
                    {style.name}
                  </label>
                );
              })}
            </>
          </BaseMapControl>
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
                    <div
                      key={personProps.id as string}
                      style={{ width: "280px" }}
                    >
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
