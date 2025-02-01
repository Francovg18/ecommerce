import React from "react";
import { Link } from "react-router-dom";

const NewsProducts = ({ data, isAuthenticated }) => {
  return (
    <div className="bg-gray-900 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-white text-center mb-8">
          Novedades
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.slice(0, 12).map((product) => (
            <div
              key={product.id}
              className="group bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <div className="relative w-full h-48 bg-gray-700">
                <img
                  src={product.get_thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-white group-hover:text-red-500">
                  <Link to={`product/${product.id}`}>{product.name}</Link>
                </h2>
                <p className="text-sm text-gray-400 mt-2">
                  {product.description.length > 60
                    ? `${product.description.slice(0, 60)}...`
                    : product.description}
                </p>
                {isAuthenticated ? (
                  <p className="text-lg font-bold text-red-500 mt-4">Bs {product.price}</p>
                ) : (
                  <p className="text-sm text-yellow-400 mt-4">Regístrate para ver el precio</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {data.length > 12 && (
          <div className="mt-8 flex justify-center">
            <button className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition">
              Ver más productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsProducts;