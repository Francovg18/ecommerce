import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Banner = ({ data = [] }) => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const productsToShow = 5;
  const transitionTime = 8000;

  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) return;

    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setVisibleIndex((prevIndex) =>
          prevIndex + productsToShow >= data.length ? 0 : prevIndex + 1
        );
        setFade(false);
      }, 1200);
    }, transitionTime);

    return () => clearInterval(interval);
  }, [data]);

  if (!Array.isArray(data) || data.length === 0) {
    return <div>No hay productos disponibles para mostrar.</div>;
  }

  const visibleProducts = [
    ...data.slice(visibleIndex, visibleIndex + productsToShow),
    ...data.slice(0, Math.max(0, visibleIndex + productsToShow - data.length)),
  ];

  return (
    <div className="grid gap-4 p-8">
      {/* Vista para pantallas grandes */}
      <div className="hidden lg:block">
        {visibleProducts.length > 0 && (
          <>
            {/* Primera fila */}
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

            {/* Segunda fila */}
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

      {/* Carrusel para pantallas medianas y pequeñas */}
      <div className="block lg:hidden">
        <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
          <img
            src={data[visibleIndex]?.get_thumbnail || ""}
            alt={data[visibleIndex]?.name || "Producto"}
            className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-500"></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
