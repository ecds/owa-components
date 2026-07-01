import { useCarousel } from "nuka-carousel";

const CarouselButtons = () => {
  const { currentPage, totalPages, goBack, goForward } = useCarousel();
  return (
    <div className="flex justify-between mt-4">
      <button className="" onClick={goBack}>
        PREV
      </button>
      <div>
        {currentPage + 1} of {totalPages}
      </div>
      <button className="" onClick={goForward}>
        NEXT
      </button>
    </div>
  );
};

export default CarouselButtons;
