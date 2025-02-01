import React from "react";
import { Link } from "react-router-dom";

const NewsProducts = ({ data, isAuthenticated }) => {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-800 text-center mb-12">
          Novedades
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.slice(0, 12).map((product) => (
            <div
              key={product.id}
              className="relative group bg-white rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              {/* Efecto Flip Card */}
              <div className="relative w-full h-60 perspective">
                <div className="absolute w-full h-full backface-hidden">
                  {/* Lado Frontal */}
                  <div className="relative w-full h-full bg-gray-100">
                    <img
                      src={product.get_thumbnail}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute w-full h-full bg-red-100 backface-hidden rotate-y-180 transform transition-all duration-500 ease-in-out">
                  {/* Lado Posterior */}
                  <div className="flex flex-col items-center justify-center p-4 h-full text-gray-700">
                    <h2 className="text-xl font-semibold">{product.name}</h2>
                    <p className="text-sm text-gray-600 mt-2">
                      {product.description.length > 100
                        ? `${product.description.slice(0, 100)}...`
                        : product.description}
                    </p>
                    {isAuthenticated ? (
                      <p className="text-lg font-bold text-red-600 mt-4">
                        Bs {product.price}
                      </p>
                    ) : (
                      <p className="text-sm text-yellow-600 mt-4">
                        Regístrate para ver el precio
                      </p>
                    )}
                    <Link
                      to={`product/${product.id}`}
                      className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600 transition"
                    >
                      Ver producto
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data.length > 12 && (
          <div className="mt-12 flex justify-center">
            <button className="px-8 py-3 bg-blue-500 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-blue-600 transition transform hover:scale-110">
              Ver más productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsProducts;
