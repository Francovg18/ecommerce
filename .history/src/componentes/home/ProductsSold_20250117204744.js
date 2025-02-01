import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
  
  function ProductsSold({
    data,
    isAuthenticated
  }) {
    const [progressWidth, setProgressWidth] = useState(0);
      const [maxLength, setMaxLength] = useState(35); 
      const headingRef = useRef(null);
    
      useEffect(() => {
        const updateMaxLength = () => {
          setMaxLength(window.innerWidth >= 1024 ? 90 : 35);
        };
    
        updateMaxLength();
        window.addEventListener('resize', updateMaxLength);
        return () => window.removeEventListener('resize', updateMaxLength);
      }, []);
    
      useEffect(() => {
        if (headingRef.current) {
          const textLength = headingRef.current.textContent.length;
          setProgressWidth(Math.min((textLength / maxLength) * 100, 100));
        }
      }, [maxLength]);
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 -mt-28">
        <div className="py-8">
            <h2
              ref={headingRef}
              className="text-2xl font-extrabold tracking-tight text-gray-900 relative inline-block"
            >
              Productos más vendidos
            </h2>
            <div className="w-full bg-gray-200 h-1 mt-1">
              <div
                className="bg-red-500 h-1"
                style={{ width: `${progressWidth}%` }}
              ></div>
            </div>
          </div>
  
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-12 sm:gap-x-6 lg:gap-x-8">
            {data && 
            data !== null &&
            data !== undefined &&
            data.map((product) => (
              <div key={product.id} className="group relative">
                <div className="w-full h-96 rounded-lg overflow-hidden group-hover:opacity-75 sm:h-auto sm:aspect-w-2 sm:aspect-h-3">
                  <img
                    src={product.photo}
                    alt=""
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">
                  <Link to={`/product/${product.id}`}>
                    <span className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
                {isAuthenticated ? (
                    <p className="text-sm font-medium text-gray-900">
                      Bs{product.price}
                    </p>
                  ) : (
                    <p className="text-sm text-red-500">
                      .
                    </p>
                  )}
              </div>
            ))}
          </div>
  
          <div className="mt-6 sm:hidden">
            <Link to="#" className="block text-sm font-semibold text-midnight-blue hover:text-purple-night">
              Ver mas productos<span aria-hidden="true"> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.Auth.isAuthenticated, 
  });
  
  export default connect(mapStateToProps)(ProductsSold);