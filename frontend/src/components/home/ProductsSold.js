import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { motion } from "framer-motion";

function ProductsSold({ data, isAuthenticated, user }) {
  const [progressWidth, setProgressWidth] = useState(0);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const headingRef = useRef(null);
  useEffect(() => {
    const updateProgressWidth = () => {
      if (headingRef.current) {
        const textLength = headingRef.current.textContent.length;
        const maxLength = window.innerWidth >= 1024 ? 90 : 35;
        setProgressWidth(Math.min((textLength / maxLength) * 100, 100));
      }
    };

    updateProgressWidth();
    window.addEventListener("resize", updateProgressWidth);
    return () => window.removeEventListener("resize", updateProgressWidth);
  }, []);



  const renderPopularityBadge = (index) => {
    const popularity = 100 - (index * 10);
    let bgColor = "bg-green-500";
    
    if (popularity < 80) bgColor = "bg-yellow-500";
    if (popularity < 50) bgColor = "bg-orange-500";
    
    return (
      <div className="absolute bottom-2 right-2 z-10">
        <div className={`${bgColor} text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          {popularity}% popular
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 -mt-28">
        <div className="py-8 flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 
                ref={headingRef} 
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900"
              >
                Productos más vendidos
              </h2>
            </div>
            
            <div className="w-full bg-gray-200 h-1 mt-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressWidth}%` }}
                transition={{ duration: 1 }}
                className="bg-gradient-to-r from-red-500 to-pink-500 h-1"
              ></motion.div>
            </div>
          </div>
          
          <Link 
            to="/products" 
            className="mt-4 sm:mt-0 inline-flex items-center text-sm font-medium text-midnight-blue hover:text-purple-night transition-colors duration-300"
          >
            Ver catálogo completo
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* productos */}
        <div className="mt-8 grid grid-cols-2 gap-y-8 gap-x-4 sm:grid-cols-3 lg:grid-cols-5 sm:gap-6 lg:gap-8">
          {data?.map((product, index) => (
            <motion.div 
              key={product.id} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className="group relative border border-gray-200 rounded-xl overflow-hidden bg-white h-full flex flex-col"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              
              <div className="p-2 relative w-full h-48 sm:h-auto sm:aspect-w-2 sm:aspect-h-3 bg-gray-100">
                <img
                  src={product.photo}
                  alt={product.name}
                  className="w-full h-full object-center object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-300">
                  <Link 
                    to={`/product/${product.id}`}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="text-white px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-midnight-blue to-purple-night transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      Ver detalles
                    </span>
                  </Link>
                </div>
                
                {renderPopularityBadge(index)}
              </div>
              
              {/* Información del producto */}
              <div className="p-4 flex-grow flex flex-col justify-between">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2">
                  <Link to={`/product/${product.id}`}>
                    <span className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
                
                <div className="mt-3 flex items-center justify-between">
                <p
                  className={`text-sm sm:text-base font-bold ${
                    isAuthenticated ? "text-gray-900" : "text-red-500 flex items-center"
                  }`}
                >
                  {isAuthenticated ? (
                    <span className="flex items-center">
                      <span className="text-xs text-gray-500 mr-1">Bs</span>
                      <span>
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
                      No permitido
                    </span>
                  )}
                </p>

                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user
});

export default connect(mapStateToProps)(ProductsSold);