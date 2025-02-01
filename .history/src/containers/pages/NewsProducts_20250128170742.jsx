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
              {/* Contenedor del Flip Card */}
              <div className="relative w-full h-72 perspective">
                <div className="absolute w-full h-full transform transition-transform duration-500 preserve-3d group-hover:rotate-y-180">
                  {/* Lado Frontal */}
                  <div className="absolute w-full h-full bg-white backface-hidden flex flex-col items-center justify-between p-4">
                    <h2 className="text-lg font-bold text-gray-800">
                      {product.name}
                    </h2>
                    <img
                      src={product.get_thumbnail}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    {isAuthenticated ? (
                      <p className="text-lg font-bold text-red-600 mt-4">
                        Bs {product.price}
                      </p>
                    ) : (
                      <p className="text-sm text-yellow-600 mt-4">
                        Regístrate para ver el precio
                      </p>
                    )}
                  </div>

                  {/* Lado Posterior */}
                  <div className="absolute w-full h-full bg-gray-100 backface-hidden rotate-y-180 flex flex-col items-center justify-center p-4">
                    <h2 className="text-xl font-semibold text-gray-800">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-600 mt-2 text-center">
                      {product.description.length > 100
                        ? `${product.description.slice(0, 100)}...`
                        : product.description}
                    </p>
                    {isAuthenticated && (
                      <p className="text-lg font-bold text-red-600 mt-4">
                        Bs {product.price}
                      </p>
                    )}
                    <Link
                      to={`product/${product.id}`}
                      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                    >
                      Ver producto
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data?.length > 0 ? (
  data.slice(0, 12).map((product) => (
    <div key={product.id} className="group bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative w-full h-48 bg-gray-700">
        <img src={product.get_thumbnail} alt={product.name} className="w-full h-full object-cover object-center" />
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-white group-hover:text-red-500">
          <Link to={`product/${product.id}`}>{product.name}</Link>
        </h2>
        <p className="text-sm text-gray-400 mt-2">
          {product.description?.length > 60 ? `${product.description.slice(0, 60)}...` : product.description}
        </p>
        <p className="text-lg font-bold text-red-500 mt-4">
          {product.price ? `Bs${product.price}` : "Regístrate para ver el precio"}
        </p>
      </div>
    </div>
  ))
) : (
  <p className="text-white text-center text-lg">No hay productos disponibles.</p>
)}

      </div>
    </div>
  );
};

export default NewsProducts;
