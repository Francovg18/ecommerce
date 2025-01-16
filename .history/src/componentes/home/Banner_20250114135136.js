import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Banner = ({ data }) => {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const productsToShow = 5; // Cantidad de productos que se mostrarán a la vez
  const transitionTime = 3000; // Tiempo en milisegundos (3 segundos)

  // Efecto para cambiar automáticamente el índice visible
  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleIndex((prevIndex) =>
        prevIndex + productsToShow >= data.length ? 0 : prevIndex + productsToShow
      );
    }, transitionTime);
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, [data]);

  // Obtener los productos visibles
  const visibleProducts = data.slice(
    visibleIndex,
    visibleIndex + productsToShow
  );

  return (
    <div className="grid gap-4 p-8">
      {visibleProducts.length > 0 && (
        <>
          <div className="flex">
            {visibleProducts.map((product, index) => (
              <div
                key={product?.id || index}
                className="w-1/5 p-2 transition-opacity duration-500"
              >
                <Link to={`product/${product?.id}`}>
                  <div className="relative w-full h-[200px] overflow-hidden rounded-lg m-2 group">
                    <img
                      src={product?.get_thumbnail}
                      alt={product?.name}
                      className="absolute inset-0 w-full h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 rounded-lg"></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Banner;
