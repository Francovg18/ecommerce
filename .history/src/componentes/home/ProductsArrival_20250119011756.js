import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Slider from "react-slick"; 

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function ProductsArrival({ data, isAuthenticated }) {
  const [progressWidth, setProgressWidth] = useState(0);
  const [maxLength, setMaxLength] = useState(35);
  const headingRef = useRef(null);

  const settings = {
    infinite: true, // Ciclo infinito
    speed: 500, // Velocidad de deslizamiento
    slidesToShow: 4, // Mostrar 4 imágenes por vez
    slidesToScroll: 1, // Deslizar 1 imagen a la vez
    autoplay: true, // Activar desplazamiento automático
    autoplaySpeed: 3000, // Velocidad del desplazamiento automático
    responsive: [
      {
        breakpoint: 1024, // Menor a 1024px
        settings: {
          slidesToShow: 2, // Mostrar 2 productos en pantallas más pequeñas
        },
      },
      {
        breakpoint: 768, // Menor a 768px
        settings: {
          slidesToShow: 1, // Mostrar 1 producto en pantallas aún más pequeñas
        },
      },
    ],
  };

  useEffect(() => {
    const updateMaxLength = () => {
      setMaxLength(window.innerWidth >= 1024 ? 90 : 35);
    };

    updateMaxLength();
    window.addEventListener("resize", updateMaxLength);
    return () => window.removeEventListener("resize", updateMaxLength);
  }, []);

  useEffect(() => {
    if (headingRef.current) {
      const textLength = headingRef.current.textContent.length;
      setProgressWidth(Math.min((textLength / maxLength) * 100, 100));
    }
  }, [maxLength]);

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 -mt-28">
        <div className="py-8">
          <div className="py-8">
            <h2
              ref={headingRef}
              className="text-2xl font-extrabold tracking-tight text-gray-900 relative inline-block"
            >
              Productos nuevos
            </h2>
            <div className="w-full bg-gray-200 h-1 mt-1">
              <div
                className="bg-red-500 h-1"
                style={{ width: `${progressWidth}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Carrusel con productos */}
        <Slider {...settings}>
          {data &&
            data.map((product) => (
              <div key={product.id} className="group relative">
                <div className="w-full h-60 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
                  <img
                    src={product.get_thumbnail}
                    alt=""
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="mt-5 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link to={`product/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                  </div>
                  {isAuthenticated ? (
                    <p className="text-sm font-medium text-gray-900">
                      Bs{product.price}
                    </p>
                  ) : (
                    <p className="text-sm text-red-500">.</p>
                  )}
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(ProductsArrival);
