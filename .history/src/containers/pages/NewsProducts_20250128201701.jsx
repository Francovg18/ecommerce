import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const NewsProducts = ({ data, isAuthenticated }) => {
  const products = Array.isArray(data) ? data : [];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-12">
          Novedades
        </h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
                <div
                key={product.id}
                className="relative group bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                <div className="px-4 py-2 mt-2">
                  <h2 className="text-lg font-bold text-gray-800 text-center">
                    {product.name}
                  </h2>
                </div>
                <div className="relative w-full h-52 p-4 flex items-center justify-center">
                  <img
                    src={product.get_thumbnail}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-100 p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    {product.description?.length > 100
                      ? `${product.description.slice(0, 100)}...`
                      : product.description}
                  </p>
                  <p
                    className={`text-sm ${
                      isAuthenticated
                        ? "font-medium text-gray-900"
                        : "text-red-500 font-semibold"
                    }`}
                  >
                    {isAuthenticated ? `Bs${product.price}` : "No permitido"}
                  </p>
                  <Link
                    to={`/product/${product.id}`}
                    className="mt-4 px-4 py-2 bg-midnight-blue text-white rounded-md shadow-md hover:bg-purple-night transition"
                  >
                    Ver
                  </Link>
                </div>
              </div>
              
            ))
          ) : (
            <p className="text-gray-600 text-center text-lg">
              No hay productos disponibles.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps)(NewsProducts);
