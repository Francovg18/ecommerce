import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

function ProductsSold({ data, isAuthenticated }) {
  const [progressWidth, setProgressWidth] = useState(0);
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

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 -mt-28">
        <div className="py-8">
          <h2 ref={headingRef} className="text-2xl font-extrabold tracking-tight text-gray-900">
            Productos más vendidos
          </h2>
          <div className="w-full bg-gray-200 h-1 mt-1">
            <div className="bg-red-500 h-1" style={{ width: `${progressWidth}%` }}></div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-6 lg:gap-8">
          {data?.map((product) => (
            <div key={product.id} className="group relative border border-gray-300 p-3 rounded-lg overflow-hidden">
              <div className="relative w-full h-72 sm:h-auto sm:aspect-w-2 sm:aspect-h-3">
                <img
                  src={product.photo}
                  alt={product.name}
                  className="w-full h-full object-center object-cover transition-opacity duration-300 group-hover:opacity-50"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white px-4 py-2 rounded-lg text-sm font-semibold bg-gray-800 bg-opacity-75">
                    Más info
                  </span>
                </div>
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-red-500 transition-colors duration-300">
                <Link to={`/product/${product.id}`}>
                  <span className="absolute inset-0" />
                  {product.name}
                </Link>
              </h3>
              <p className={`text-sm ${isAuthenticated ? "font-medium text-gray-900" : "text-red-500"}`}>
                {isAuthenticated ? `Bs${product.price}` : "."}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(ProductsSold);
