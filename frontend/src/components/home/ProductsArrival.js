import React from 'react';

import { Link } from "react-router-dom";
import { useEffect, useState, useRef, useMemo } from "react";
import { connect, useDispatch, useSelector } from 'react-redux';
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllStockTotals } from '../../redux/actions/branches';

function ProductsArrival({ data, isAuthenticated, user }) {
  const dispatch = useDispatch();
  const stockTotalsArray = useSelector(state => state.branches?.total_stock_by_product || []);

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
      <button className="w-6 h-2 mx-1 bg-gray-300 rounded-full focus:outline-none transition-all duration-300 hover:bg-gray-400"></button>
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

  useEffect(() => {
    dispatch(getAllStockTotals());
  }, [dispatch]);

  const stockTotalsMap = useMemo(() => {
    if (!Array.isArray(stockTotalsArray)) return {};
    return stockTotalsArray.reduce((acc, item) => {
      acc[item.producto_id] = item.total_stock;
      return acc;
    }, {});
  }, [stockTotalsArray]);

  const truncateText = (text, maxLength = 120) => {
    if (!text || text.length <= maxLength) return text;
    const truncated = text.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 0 ? truncated.slice(0, lastSpace) + '...' : truncated + '...';
  };

  const renderProduct = (product) => {
    const totalStock = stockTotalsMap[product.id] ?? 0;
    const isHovered = hoveredProduct === product.id;

    return (
      <div className="p-3" key={product.id}>
        <motion.div initial={{ opacity: 0.8, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
          whileHover={{ 
            scale: 1.02,
            y: -4,
            boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 10px 20px -5px rgba(0, 0, 0, 0.1)"
          }}
          className="relative border border-gray-200 rounded-xl overflow-hidden bg-white h-full flex flex-col shadow-sm hover:shadow-xl transition-all duration-500"
          onMouseEnter={() => setHoveredProduct(product.id)}
          onMouseLeave={() => setHoveredProduct(null)}
        >
          {/* tarjetero */}
          <div className="absolute top-3 right-3 z-20">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-r from-midnight-blue to-purple-night text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
            >
              <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
              NUEVO
            </motion.div>
          </div>

          {/* imagen */}
          <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 aspect-w-1 aspect-h-1 rounded-t-lg overflow-hidden lg:h-48 relative group">
            <img
              src={product.get_thumbnail}
              alt={product.name}
              className="p-4 w-full h-full object-center object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent 
                         flex items-end justify-center p-4 z-10 ${isHovered ? "visible" : "invisible"}`}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ 
                  scale: isHovered ? 1 : 0.9,
                  opacity: isHovered ? 1 : 0
                }}
                transition={{ duration: 0.25, delay: 0.1 }}
                className="bg-white/95 backdrop-blur-sm text-gray-800 rounded-lg shadow-2xl p-6 max-w-full border border-white/20"
              >
                <div className="flex items-start gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-relaxed text-gray-700 break-words">
                      {truncateText(product.description || "Producto de alta calidad para satisfacer tus necesidades.", 100)}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* información del producto*/}
          <div className="p-4 flex-grow flex flex-col justify-between">
            <div className="flex-grow">
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 transition-colors duration-300 leading-tight">
                <Link to={`product/${product.id}`} className="block">
                  <span aria-hidden="true" className="absolute inset-0 z-10"></span>
                  <span className="hover:text-red-500 transition-colors duration-300">
                    {product.name}
                  </span>
                </Link>
              </h3>
              
              {/* descripcion */}
              <p className="text-xs text-gray-500 line-clamp-2 mb-3 min-h-[2rem] leading-relaxed">
                {truncateText(product.description, 80)}
              </p>
            </div>

            <div className="mt-auto flex items-center justify-between">
              <div className="flex-grow">
                <p
                  className={`text-sm font-bold ${
                    isAuthenticated ? "text-gray-900" : "text-red-500"
                  }`}
                >
                  {isAuthenticated ? (
                    <span className="flex items-center">
                      <span className="text-xs text-gray-500 mr-1">Bs</span>
                      <span className="text-lg font-extrabold">
                        <span>{product?.user_price ?? "No disponible"}</span>
                      </span>
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600">
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
                      <span className="text-sm">No permitido</span>
                    </span>
                  )}
                </p>
              </div>

              {/* indicador de stock */}
              {isAuthenticated && (
                <div className="ml-3">
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: [0, -1, 1, 0] }}
                    transition={{ duration: 0.3 }}
                    className={`relative inline-flex items-center px-3 py-1.5 rounded-2xl text-xs font-bold overflow-hidden ${
                      product.quantity > 0
                        ? "bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 text-white"
                        : "bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white"
                    }`}
                  >
                    <motion.div
                      animate={{ 
                        x: product.quantity > 0 ? [-100, 100] : 0,
                        opacity: product.quantity > 0 ? [0, 1, 0] : 0
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: product.quantity > 0 ? Infinity : 0,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                    
                    <motion.div
                      animate={{ 
                        scale: product.quantity > 0 ? [1, 1.2, 1] : [1, 0.8, 1],
                        rotate: product.quantity > 0 ? [0, 360] : 0
                      }}
                      transition={{ 
                        duration: product.quantity > 0 ? 3 : 2, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className={`relative z-10 w-2.5 h-2.5 rounded-full mr-2 flex items-center justify-center ${
                        product.quantity > 0 ? 'bg-white' : 'bg-white/80'
                      }`}
                    >
                      {product.quantity > 0 && (
                        <motion.div
                          animate={{ scale: [0.5, 1, 0.5] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                          className="w-1 h-1 bg-emerald-500 rounded-full"
                        />
                      )}
                    </motion.div>
                    
                    <span className="relative z-10 font-bold tracking-wide">
                      {product.quantity > 0
                        ? `Stock ${product.quantity > 50 ? '+50': product.quantity}`
                        : "Agotado"}
                    </span>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

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
            <div className="w-full bg-gray-200 h-1 mt-3 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressWidth}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-gradient-to-r from-red-500 to-pink-500 h-1 rounded-full shadow-sm"
              ></motion.div>
            </div>
          </div>
        
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevSlide}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-crimson-red hover:text-white hover:border-crimson-red transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-crimson-red focus:ring-offset-2 shadow-sm hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextSlide}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 hover:bg-crimson-red hover:text-white hover:border-crimson-red transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-crimson-red focus:ring-offset-2 shadow-sm hover:shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>

        {/* carrusel */}
        <div className="mt-8 -mx-4">
          {data && data.length > 0 ? (
            <Slider ref={sliderRef} {...settings}>
              {data.map(renderProduct)}
            </Slider>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No hay productos nuevos disponibles actualmente.</p>
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
