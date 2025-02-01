import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const NewsProducts = ({ data, isAuthenticated }) => {
  const products = Array.isArray(data) ? data : [];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-12">
          Novedades
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="relative group bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
              >
                <div className="relative w-full h-72">
                  <div className="absolute w-full h-full flex flex-col items-center justify-between p-4 transition-all duration-500 ease-in-out">
                    <div className="absolute inset-0 flex flex-col items-center justify-between group-hover:opacity-0 transition-opacity duration-300">
                      <h2 className="text-lg font-bold text-gray-800 mt-2">
                        {product.name}
                      </h2>
                      <img
                        src={product.get_thumbnail}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-md"
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
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                      >
                        Ver producto
                      </Link>

                      
                    </div>
                  </div>
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
