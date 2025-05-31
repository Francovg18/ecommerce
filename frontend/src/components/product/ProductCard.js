import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";

const ProductCard = ({ product, isAuthenticated, user }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={product.id}
      className="group relative w-full mx-auto my-6 p-3 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
   
      <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-200 rounded-lg overflow-hidden shadow-inner mb-4">
        <div className="absolute inset-0 bg-gray-900 opacity-0 group-hover:opacity-10 transition-opacity duration-300 z-0"></div>

        <Link to={`/product/${product.id}`} className="relative z-10">
          <img
            src={product.photo}
            alt={product.name}
            className="w-full h-full object-center object-contain transition-all duration-500 transform group-hover:scale-110"
          />
        </Link>
      </div>

 
      <div className="flex flex-wrap gap-1 mb-3">
        {product.tags &&
          product.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-blue-50 text-blue-600 font-medium"
            >
              {tag}
            </span>
          ))}
      </div>

      {/* Nombre y descripción  */}
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 truncate">
          <Link to={`/product/${product.id}`} className="relative z-10">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>

        {isAuthenticated ? (
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
              product.quantity > 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.quantity > 0
              ? `En stock (${product.quantity})`
              : "Agotado"}
          </span>
        ) : (
          <p className="text-sm text-gray-500 line-clamp-2 sm:line-clamp-3">
            {product.description ||
              "Producto de alta calidad para satisfacer tus necesidades."}
          </p>
        )}
      </div>

      <div className="my-3 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent transform transition-all duration-500 group-hover:scale-x-110 group-hover:via-blue-200"></div>

      <div
        className={`absolute inset-x-0 bottom-0 px-5 pb-4 pt-2 bg-white transform transition-all duration-500 ${
          isHovered ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        }`}
      >
        <button
          className={`w-full py-2 rounded-lg font-medium transition-all duration-300 ${
            isAuthenticated
              ? "bg-midnight-blue hover:bg-purple-night text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          disabled={!isAuthenticated}
        >
          {isAuthenticated ? (
            <span className="text-sm font-semibold">
              {user && user.mayorista_tipo !== undefined ? (
                user.mayorista_tipo === 0
                  ? `${product?.price} Bs`
                  : user.mayorista_tipo === 1
                  ? `${product?.price_mayorista_1} Bs`
                  : user.mayorista_tipo === 2
                  ? `${product?.price_mayorista_2} Bs`
                  : user.mayorista_tipo === 3
                  ? `${product?.price_mayorista_3} Bs`
                  : "N/A"
              ) : (
                "Inicia sesión para ver precios"
              )}
            </span>
          ) : (
            <span className="text-sm font-semibold flex items-center justify-center gap-2">
              Inicia sesión para ver precios
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps)(ProductCard);
