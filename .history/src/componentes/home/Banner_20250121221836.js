import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const Banner = ({ data = [] }) => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const transitionTime = 8000;
  const itemsPerView = window.innerWidth > 768 ? 2 : 1;

  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) return;

    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setVisibleIndex((prevIndex) =>
          prevIndex + itemsPerView >= data.length ? 0 : prevIndex + itemsPerView
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
    ...data.slice(visibleIndex, visibleIndex + itemsPerView),
    ...data.slice(0, Math.max(0, visibleIndex + itemsPerView - data.length)),
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${visibleIndex * (100 / itemsPerView)}%)` }}>
        {visibleProducts.map((product, index) => (
          <div key={index} className={`w-1/${itemsPerView} flex-shrink-0 p-2`}>
            <Link to={`product/${product.id || "#"}`}>
              <div className="relative w-full h-64 overflow-hidden rounded-lg m-2 group">
                <img
                  src={product.get_thumbnail || ""}
                  alt={product.name || "Producto"}
                  className="absolute inset-0 w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-105 group-hover:shadow-lg"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-500 rounded-lg"></div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={() => setVisibleIndex((prevIndex) => (prevIndex - itemsPerView < 0 ? data.length - itemsPerView : prevIndex - itemsPerView))}
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
        onClick={() => setVisibleIndex((prevIndex) => (prevIndex + itemsPerView) % data.length)}
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Banner;
