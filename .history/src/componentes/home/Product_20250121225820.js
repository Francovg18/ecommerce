import React from "react";
import { HandIcon, CloudUploadIcon, CogIcon } from "@heroicons/react/outline";

function Product() {
  return (
    <div className="flex flex-wrap justify-center md:px-20 bg-white ">
      <div className="flex flex-col items-center text-center w-full sm:w-1/2 lg:w-1/3">
        <HandIcon className="h-12 w-12 text-gray-700" />
        <h3 className="text-xl font-semibold text-gray-900 mt-4">Compra desde tu hogar</h3>
        <p className="text-gray-600 mt-2">
          Gracias a Silicom puedes comprar productos de calidad desde la comodidad de tu casa
        </p>
        <button className="mt-4 px-6 py-2 border-1 border-transparent bg-gradient-to-r from-midnight-blue via-royal-purple to-purple-night text-white font-semibold rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl hover:border-crimson-red transition-all duration-300 ease-in-out transform hover:bg-gradient-to-r hover:from-crimson-red hover:to-deep-rose focus:outline-none focus:ring-4 focus:ring-crimson-red focus:ring-opacity-50">
          VER PRODUCTOS
        </button>
      </div>

      <div className="flex flex-col items-center text-center w-full sm:w-1/2 lg:w-1/3">
        <CloudUploadIcon className="h-12 w-12 text-gray-700" />
        <h3 className="text-xl font-semibold text-gray-900 mt-4">Registrarme para comprar</h3>
        <p className="text-gray-600 mt-2">
          Para comprar online, necesitas crearte una cuenta o puedes iniciar sesión desde el menú principal
        </p>
        <button className="mt-4 px-6 py-2 border-1 border-transparent bg-gradient-to-r from-midnight-blue via-royal-purple to-purple-night text-white font-semibold rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl hover:border-crimson-red transition-all duration-300 ease-in-out transform hover:bg-gradient-to-r hover:from-crimson-red hover:to-deep-rose focus:outline-none focus:ring-4 focus:ring-crimson-red focus:ring-opacity-50">
          CREAR CUENTA
        </button>
      </div>

      <div className="flex flex-col items-center text-center w-full sm:w-1/2 lg:w-1/3">
        <CogIcon className="h-12 w-12 text-gray-700" />
        <h3 className="text-xl font-semibold text-gray-900 mt-4">Cómo comprar online</h3>
        <p className="text-gray-600 mt-2">
          Para saber más acerca de cómo comprar, visita nuestra sección de ayuda
        </p>
        <button className="mt-4 px-6 py-2 border-1 border-transparent bg-gradient-to-r from-midnight-blue via-royal-purple to-purple-night text-white font-semibold rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl hover:border-crimson-red transition-all duration-300 ease-in-out transform hover:bg-gradient-to-r hover:from-crimson-red hover:to-deep-rose focus:outline-none focus:ring-4 focus:ring-crimson-red focus:ring-opacity-50">
          AYUDA
        </button>

      </div>
    </div>
  );
}

export default Product;
