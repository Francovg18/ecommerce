import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";

const Banner = ({ data = [] }) => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const productsToShow = 5;
  const transitionTime = 8000;
  const isDataAvailable = Array.isArray(data) && data.length > 0;

  useEffect(() => {
    if (!isDataAvailable) return;

    const handleInterval = () => {
      setFade(true);
      setTimeout(() => {
        setVisibleIndex((prevIndex) =>
          (prevIndex + productsToShow) >= data.length ? 0 : prevIndex + 1
        );
        setFade(false);
      }, 1200);
    };

    const interval = setInterval(handleInterval, transitionTime);
    return () => clearInterval(interval);
  }, [data, isDataAvailable]);

  const visibleProducts = useMemo(() => {
    return [
      ...data.slice(visibleIndex, visibleIndex + productsToShow),
      ...data.slice(0, Math.max(0, visibleIndex + productsToShow - data.length)),
    ];
  }, [data, visibleIndex, productsToShow]);

  const handleNext = () => {
    setVisibleIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const handlePrev = () => {
    setVisibleIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  if (!isDataAvailable) {
    return <div>No hay productos disponibles para mostrar.</div>;
  }

  return (
    <div className="grid gap-4 p-8">
      <div className="hidden lg:block">
        {visibleProducts.length > 0 && (
          <>
            <div
              className={`flex transition-opacity duration-[1500ms] ${
                fade ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="w-1/2 p-2">
                <Link to={`product/${visibleProducts[0]?.id || "#"}`}>
                  <div className="relative w-full h-[180px] overflow-hidden rounded-lg m-2 group">
                    <img
                      src={visibleProducts[0]?.get_thumbnail || ""}
                      alt={visibleProducts[0]?.name || "Producto"}
                      className="absolute inset-0 w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105 group-hover:shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 rounded-lg"></div>
                  </div>
                </Link>
              </div>
              <div className="w-1/2 p-2">
                <Link to={`product/${visibleProducts[1]?.id || "#"}`}>
                  <div className="relative w-full h-[260px] overflow-hidden rounded-lg m-2 group">
                    <img
                      src={visibleProducts[1]?.get_thumbnail || ""}
                      alt={visibleProducts[1]?.name || "Producto"}
                      className="absolute inset-0 w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105 group-hover:shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 rounded-lg"></div>
                  </div>
                </Link>
              </div>
            </div>

            <div
              className={`flex items-start transition-opacity duration-[1500ms] ${
                fade ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="w-1/4 p-2">
                <Link to={`product/${visibleProducts[2]?.id || "#"}`}>
                  <div className="relative w-full h-[280px] overflow-hidden rounded-lg m-2 group -mt-20">
                    <img
                      src={visibleProducts[2]?.get_thumbnail || ""}
                      alt={visibleProducts[2]?.name || "Producto"}
                      className="absolute inset-0 w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105 group-hover:shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 rounded-lg"></div>
                  </div>
                </Link>
              </div>
              <div className="w-1/4 p-2">
                <Link to={`product/${visibleProducts[3]?.id || "#"}`}>
                  <div className="relative w-full h-[280px] overflow-hidden rounded-lg m-2 group -mt-20">
                    <img
                      src={visibleProducts[3]?.get_thumbnail || ""}
                      alt={visibleProducts[3]?.name || "Producto"}
                      className="absolute inset-0 w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105 group-hover:shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 rounded-lg"></div>
                  </div>
                </Link>
              </div>
              <div className="w-1/2 p-2">
                <Link to={`product/${visibleProducts[4]?.id || "#"}`}>
                  <div className="relative w-full h-[200px] overflow-hidden rounded-lg m-2 group">
                    <img
                      src={visibleProducts[4]?.get_thumbnail || ""}
                      alt={visibleProducts[4]?.name || "Producto"}
                      className="absolute inset-0 w-full h-full object-contain rounded-lg transition-transform duration-500 group-hover:scale-105 group-hover:shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 rounded-lg"></div>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="block lg:hidden">
        <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
          <img
            src={data[visibleIndex]?.get_thumbnail || ""}
            alt={data[visibleIndex]?.name || "Producto"}
            className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform duration-500"
          />
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2"
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-gray-700 bg-opacity-50 hover:bg-opacity-75 text-white rounded-full p-2"
          >
            <ChevronRightIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
