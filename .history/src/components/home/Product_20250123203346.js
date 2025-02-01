import { useState } from "react";
import { HandIcon, CloudUploadIcon, CogIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

function Product() {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleCogClick = () => {
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, 2000);
  };
  return (
    <div className="flex flex-wrap justify-center md:px-20 bg-white pb-24 pt-4">

      <div className="flex flex-col items-center text-center w-full sm:w-1/2 lg:w-1/3 mb-5">
        <div className="relative group">
          <HandIcon className="h-12 w-12 text-gray-700 transition-all duration-300 group-hover:stroke-crimson-red group-hover:scale-110 group-hover:rotate-180" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mt-4">
          Compra desde tu hogar
        </h3>
        <p className="text-gray-600 mt-2">
          Gracias a Silicom puedes comprar productos de calidad desde la comodidad de tu casa
        </p>
        <button className="mt-4 px-6 py-2 border-1 border-transparent bg-gradient-to-r from-midnight-blue via-royal-purple to-purple-night text-white font-semibold rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl hover:border-crimson-red transition-all duration-300 ease-in-out transform hover:bg-gradient-to-r hover:from-crimson-red hover:to-deep-rose focus:outline-none focus:ring-4 focus:ring-crimson-red focus:ring-opacity-50">
          <Link to="/products">VER PRODUCTOS</Link>
        </button>
      </div>

      <div className="flex flex-col items-center text-center w-full sm:w-1/2 lg:w-1/3 mb-5">
        <div className="relative group">
          <CloudUploadIcon className="h-12 w-12 text-gray-700 transition-transform duration-500 group-hover:stroke-crimson-red group-hover:rotate-180" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mt-4">
          Registrarme para comprar
        </h3>
        <p className="text-gray-600 mt-2">
          Para comprar online, necesitas crearte una cuenta o puedes iniciar sesión
        </p>
        <button className="mt-4 px-6 py-2 border-1 border-transparent bg-gradient-to-r from-midnight-blue via-royal-purple to-purple-night text-white font-semibold rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl hover:border-crimson-red transition-all duration-300 ease-in-out transform hover:bg-gradient-to-r hover:from-crimson-red hover:to-deep-rose focus:outline-none focus:ring-4 focus:ring-crimson-red focus:ring-opacity-50">
          <Link to="/signup">CREAR CUENTA</Link>
        </button>
      </div>

      <div className="flex flex-col items-center text-center w-full sm:w-1/2 lg:w-1/3 mb-5">
        <div
          className={`relative ${
            isSpinning ? "animate-spin" : "group-hover:stroke-crimson-red group-hover:rotate-360"
          }`} 
          onClick={handleCogClick}
        >
          <CogIcon className="h-12 w-12 text-gray-700 transition-transform duration-500 " />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mt-4">
          Cómo comprar online
        </h3>
        <p className="text-gray-600 mt-2">
          Para saber más acerca de cómo comprar, visita nuestra sección de ayuda
        </p>
        <button className="mt-4 px-6 py-2 border-1 border-transparent bg-gradient-to-r from-midnight-blue via-royal-purple to-purple-night text-white font-semibold rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl hover:border-crimson-red transition-all duration-300 ease-in-out transform hover:bg-gradient-to-r hover:from-crimson-red hover:to-deep-rose focus:outline-none focus:ring-4 focus:ring-crimson-red focus:ring-opacity-50">
          <Link to="/help">AYUDA</Link>
        </button>
      </div>
    </div>
  );
}

export default Product;
