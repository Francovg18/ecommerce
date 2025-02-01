import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

const Banner = ({ data = [] }) => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const productsToShow = 5;

  const handleNext = () => {
    setVisibleIndex((prevIndex) =>
      prevIndex + 1 >= data.length ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setVisibleIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const autoSlide = setInterval(handleNext, 8000);
    return () => clearInterval(autoSlide);
  }, [data]);

  if (!Array.isArray(data) || data.length === 0) {
    return <div>No hay productos disponibles para mostrar.</div>;
  }

  const visibleProducts = [
    ...data.slice(visibleIndex, visibleIndex + productsToShow),
    ...data.slice(0, Math.max(0, visibleIndex + productsToShow - data.length)),
  ];

  return (
    <div className="relative p-8">
      <div className="hidden lg:block">
        {visibleProducts.length > 0 && (
          <>
            {/* Botones de navegación */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>

            {/* Contenido del carrusel */}
            <div className="flex gap-4 items-start">
              <div className="w-1/2 p-2">
                <Link to={`product/${visibleProducts[0]?.id || "#"}`}>
                  <div className="relative w-full h-[180px] overflow-hidden rounded-lg group">
                    <img
                      src={visibleProducts[0]?.get_thumbnail || ""}
                      alt={visibleProducts[0]?.name || "Producto"}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105 group-hover:shadow-lg"
                    />
                  </div>
                </Link>
              </div>
              <div className="w-1/2 p-2">
                <Link to={`product/${visibleProducts[1]?.id || "#"}`}>
                  <div className="relative w-full h-[260px] overflow-hidden rounded-lg group">
                    <img
                      src={visibleProducts[1]?.get_thumbnail || ""}
                      alt={visibleProducts[1]?.name || "Producto"}
                      className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105 group-hover:shadow-lg"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Carrusel para pantallas pequeñas */}
      <div className="block lg:hidden">
        <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
          <img
            src={data[visibleIndex]?.get_thumbnail || ""}
            alt={data[visibleIndex]?.name || "Producto"}
            className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-500"></div>
        </div>

        {/* Botones de navegación móviles */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrev}
            className="bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
