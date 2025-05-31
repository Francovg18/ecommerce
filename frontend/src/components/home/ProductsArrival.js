import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { motion } from "framer-motion";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ProductsArrival({ data, isAuthenticated, user }) {
  const [progressWidth, setProgressWidth] = useState(0);
  const [maxLength, setMaxLength] = useState(35);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const headingRef = useRef(null);
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    arrows: false,
    pauseOnHover: true,
    customPaging: () => (
      <button className="w-6 h-2 mx-1 bg-gray-300 rounded-full focus:outline-none transition-all duration-300"></button>
    ),
    responsive: [
      { breakpoint: 1240, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const updateMaxLength = () => {
    setMaxLength(window.innerWidth >= 1024 ? 90 : 35);
  };

  const calculateProgressWidth = () => {
    if (headingRef.current) {
      const textLength = headingRef.current.textContent.length;
      setProgressWidth(Math.min((textLength / maxLength) * 100, 100));
    }
  };

  useEffect(() => {
    updateMaxLength();
    window.addEventListener("resize", updateMaxLength);
    return () => window.removeEventListener("resize", updateMaxLength);
  }, []);

  useEffect(() => {
    calculateProgressWidth();
  }, [maxLength]);

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const renderProduct = (product) => (
    <div className="p-3" key={product.id}>
      <motion.div
        initial={{ opacity: 0.8, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        className="relative border border-gray-200 rounded-xl overflow-hidden bg-white h-full flex flex-col"
        onMouseEnter={() => setHoveredProduct(product.id)}
        onMouseLeave={() => setHoveredProduct(null)}
      >
        {/* Tag de nuevo producto */}
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-gradient-to-r from-midnight-blue to-purple-night text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
            NUEVO
          </div>
        </div>

        {/* Contenedor de imagen */}
        <div className="w-full bg-gray-100 aspect-w-1 aspect-h-1 rounded-t-lg overflow-hidden lg:h-48 relative group">
          <img
            src={product.get_thumbnail}
            alt={product.name}
            className="p-4 w-full h-full object-center object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Información del producto */}
        <div className="p-4 flex-grow flex flex-col justify-between">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-red-500 transition-colors duration-300">
            <Link to={`product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0"></span>
              {product.name}
            </Link>
          </h3>

          <div className="mt-2 flex items-center justify-between">
          <p
            className={`text-sm font-bold ${
              isAuthenticated ? "text-gray-900" : "text-red-500"
            }`}
          >
            {isAuthenticated ? (
              <span className="flex items-center">
                <span className="text-xs text-gray-500 mr-1">Bs</span>
                <span className="text-lg">
                  {user && user.mayorista_tipo !== undefined ? (
                    user.mayorista_tipo === 0 ? product?.price :
                    user.mayorista_tipo === 1 ? product?.price_mayorista_1 :
                    user.mayorista_tipo === 2 ? product?.price_mayorista_2 :
                    user.mayorista_tipo === 3 ? product?.price_mayorista_3 :
                    "N/A"
                  ) : "Inicia sesión"}
                </span>
              </span>
            ) : (
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>No permitido</span>
              </span>
            )}
          </p>


            {/* Indicador de stock */}
            {isAuthenticated ? (
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    product.quantity > 0
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.quantity > 0 ? `En stock (${product.quantity})` : "Agotado"}
                </span>
              ) : (
                <p></p>
              )}
            

          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 -mt-28">
        <div className="py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1">
            <h2
              ref={headingRef}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 flex items-center"
            >
              Productos nuevos
            </h2>
            <div className="w-full bg-gray-200 h-1 mt-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressWidth}%` }}
                transition={{ duration: 1 }}
                className="bg-gradient-to-r from-red-500 to-pink-500 h-1"
              ></motion.div>
            </div>
          </div>
        
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <button
              onClick={prevSlide}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-crimson-red hover:text-white transition-colors duration-300 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-crimson-red hover:text-white transition-colors duration-300 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carrusel de productos */}
        <div className="mt-8 -mx-4">
          {data && data.length > 0 ? (
            <Slider ref={sliderRef} {...settings}>
              {data.map(renderProduct)}
            </Slider>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay productos nuevos disponibles actualmente.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user
});

export default connect(mapStateToProps)(ProductsArrival);