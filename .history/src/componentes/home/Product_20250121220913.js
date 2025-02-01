import React from "react";
import { HandIcon, CloudUploadIcon, CogIcon } from "@heroicons/react/outline";

function Product() {
  return (
    <div className="flex flex-wrap justify-center md:px-20 bg-white py-10">
      {/* Primera tarjeta */}
      <div className="flex flex-col items-center text-center w-full sm:w-1/2 lg:w-1/3">
        <HandIcon className="h-12 w-12 text-gray-700" />
        <h3 className="text-xl font-semibold text-gray-900 mt-4">Compra desde tu hogar</h3>
        <p className="text-gray-600 mt-2">
          Gracias a Technology Store puedes comprar productos de calidad desde la comodidad de tu casa
        </p>
        <button className="mt-4 px-6 py-2 border-2 border-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-green-500 text-white font-semibold rounded-md shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200">
          VER PRODUCTOS
        </button>
      </div>

      {/* Segunda tarjeta */}
      <div className="flex flex-col items-center text-center w-full sm:w-1/2 lg:w-1/3">
        <CloudUploadIcon className="h-12 w-12 text-gray-700" />
        <h3 className="text-xl font-semibold text-gray-900 mt-4">Registrarme para comprar</h3>
        <p className="text-gray-600 mt-2">
          Para comprar online, necesitas crearte una cuenta o puedes iniciar sesión desde el menú principal
        </p>
        <button className="mt-4 px-6 py-2 border-2 border-transparent bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-white font-semibold rounded-md shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200">
          CREAR CUENTA
        </button>
      </div>

      {/* Tercera tarjeta */}
      <div className="flex flex-col items-center text-center w-full sm:w-1/2 lg:w-1/3">
        <CogIcon className="h-12 w-12 text-gray-700" />
        <h3 className="text-xl font-semibold text-gray-900 mt-4">Cómo comprar online</h3>
        <p className="text-gray-600 mt-2">
          Para saber más acerca de cómo comprar, visita nuestra sección de ayuda
        </p>
        <button className="mt-4 px-6 py-2 border-2 border-transparent bg-gradient-to-r from-green-500 via-pink-500 to-purple-500 text-white font-semibold rounded-md shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-200">
          AYUDA
        </button>
      </div>
    </div>
  );
}

export default Product;
