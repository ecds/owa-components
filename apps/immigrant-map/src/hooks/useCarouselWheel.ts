import { useEffect, useRef } from "react";

import type { SlideHandle } from "nuka-carousel";

export const useCarouselWheel = (deps: unknown[]) => {
  const carouselRef = useRef<SlideHandle>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const currentPageRef = useRef(0);
  const cooldown = useRef(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      if (cooldown.current) return;
      carouselRef.current?.goToPage(currentPageRef.current + (e.deltaX > 0 ? 1 : -1));
      cooldown.current = true;
      setTimeout(() => { cooldown.current = false; }, 400);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  const afterSlide = (idx: number) => { currentPageRef.current = idx; };

  return { carouselRef, wrapperRef, afterSlide };
};
