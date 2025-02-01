import React from "react";
import { HandIcon, CloudUploadIcon, CogIcon } from "@heroicons/react/outline";

function Product() {
  return (
    <div className="flex flex-wrap justify-center bg-white pb-28 pt-4">
      <div className="flex flex-col items-center text-center w-full sm:w-1/2 lg:w-1/3 p-4">
        <HandIcon className="h-12 w-12 text-green-600" />
        <h3 className="text-xl font-semibold text-gray-900 mt-4">Compra desde tu hogar</h3>
        <p className="text-gray-700 mt-2">
          Gracias a Silicom puedes comprar productos de calidad desde la comodidad de tu casa.
        </p>
        <button className="mt-4 px-6 py-2 border bg-gradient-to-r from-green-500 to-green-700 text-white font-cursive rounded-lg shadow hover:scale-105 hover:shadow-xl transform transition-all duration-300 ease-in-out">
          VER PRODUCTOS
        </button>
      </div>

      <div className="flex flex-col items-center text-center w-full sm:w-1/2 lg:w-1/3 p-4">
        <CloudUploadIcon className="h-12 w-12 text-green-600" />
        <h3 className="text-xl font-semibold text-gray-900 mt-4">Registrarme para comprar</h3>
        <p className="text-gray-700 mt-2">
          Para comprar online, necesitas crearte una cuenta o puedes iniciar sesión desde el menú principal.
        </p>
        <button className="mt-4 px-6 py-2 border bg-gradient-to-r from-green-500 to-green-700 text-white font-cursive rounded-lg shadow hover:scale-105 hover:shadow-xl transform transition-all duration-300 ease-in-out">
          CREAR CUENTA
        </button>
      </div>

      <div className="flex flex-col items-center text-center w-full sm:w-1/2 lg:w-1/3 p-4">
        <CogIcon className="h-12 w-12 text-green-600" />
        <h3 className="text-xl font-semibold text-gray-900 mt-4">Cómo comprar online</h3>
        <p className="text-gray-700 mt-2">
          Para saber más acerca de cómo comprar, visita nuestra sección de ayuda.
        </p>
        <button className="mt-4 px-6 py-2 border bg-gradient-to-r from-green-500 to-green-700 text-white font-cursive rounded-lg shadow hover:scale-105 hover:shadow-xl transform transition-all duration-300 ease-in-out">
          AYUDA
        </button>
      </div>
    </div>
  );
}

export default Product;
