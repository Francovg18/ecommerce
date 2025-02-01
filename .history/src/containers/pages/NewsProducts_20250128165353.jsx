import React from "react";
import { Link } from "react-router-dom";

const NewsProducts = ({ data }) => {
  return (
    <div className="bg-midnight-blue min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-crimson-red text-center mb-8">
          Novedades
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.slice(0, 12).map((product) => (
            <div
              key={product.id}
              className="group bg-purple-night rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="relative w-full h-48 bg-dark-burgundy">
                <img
                  src={product.get_thumbnail}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-deep-rose group-hover:text-crimson-red">
                  <Link to={`product/${product.id}`}>{product.name}</Link>
                </h2>
                <p className="text-sm text-royal-purple mt-2">
                  {product.description.length > 60
                    ? `${product.description.slice(0, 60)}...`
                    : product.description}
                </p>
                <p className="text-lg font-bold text-crimson-red mt-4">
                  Bs{product.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {data.length > 12 && (
          <div className="mt-8 flex justify-center">
            <button className="px-6 py-2 bg-crimson-red text-white font-semibold rounded-lg shadow-md hover:bg-deep-rose transition">
              Ver más productos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsProducts;
