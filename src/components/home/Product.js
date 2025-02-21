import { useState } from "react";
import { HandIcon, CloudUploadIcon, CogIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

function Product() {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleCogClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 2000);
  };

  return (
    <div className="bg-white pb-24 pt-4 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        {/* 🔹 Opción 1: Compra desde tu hogar */}
        <div className="flex flex-col items-center text-center space-y-4 p-6 shadow-lg rounded-xl bg-gray-50">
          <HandIcon className="h-14 w-14 text-gray-700 transition-transform duration-300 hover:scale-110 hover:rotate-180" />
          <h3 className="text-xl font-semibold text-gray-900">Compra desde tu hogar</h3>
          <p className="text-gray-600">Gracias a Silicom puedes comprar productos de calidad desde la comodidad de tu casa.</p>
          <Link
            to="/products"
            className="mt-4 px-6 py-2 border border-transparent bg-gradient-to-r from-midnight-blue via-royal-purple to-purple-night text-white font-semibold rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl hover:border-crimson-red transition-all duration-300 ease-in-out transform hover:bg-gradient-to-r hover:from-crimson-red hover:to-deep-rose focus:outline-none focus:ring-4 focus:ring-crimson-red focus:ring-opacity-50"
          >
            VER PRODUCTOS
          </Link>
        </div>

        {/* 🔹 Opción 2: Registrarse para comprar */}
        <div className="flex flex-col items-center text-center space-y-4 p-6 shadow-lg rounded-xl bg-gray-50">
          <CloudUploadIcon className="h-14 w-14 text-gray-700 transition-transform duration-300 hover:scale-110 hover:rotate-180" />
          <h3 className="text-xl font-semibold text-gray-900">Registrarme para comprar</h3>
          <p className="text-gray-600">Para comprar online, necesitas iniciar sesión con tu cuenta.</p>
          <Link
            to="/login"
            className="mt-4 px-6 py-2 border border-transparent bg-gradient-to-r from-midnight-blue via-royal-purple to-purple-night text-white font-semibold rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl hover:border-crimson-red transition-all duration-300 ease-in-out transform hover:bg-gradient-to-r hover:from-crimson-red hover:to-deep-rose focus:outline-none focus:ring-4 focus:ring-crimson-red focus:ring-opacity-50"
          >
            INICIA SESIÓN
          </Link>
        </div>

        {/* 🔹 Opción 3: Cómo comprar online */}
        <div className="flex flex-col items-center text-center space-y-4 p-6 shadow-lg rounded-xl bg-gray-50">
          <div
            className={`relative cursor-pointer ${isSpinning ? "animate-spin" : ""}`}
            onClick={handleCogClick}
          >
            <CogIcon className="h-14 w-14 text-gray-700 transition-transform duration-300 hover:scale-110" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Cómo comprar online</h3>
          <p className="text-gray-600">Para saber más acerca de cómo comprar, visita nuestra sección de ayuda.</p>
          <Link
            to="/help"
            className="mt-4 px-6 py-2 border border-transparent bg-gradient-to-r from-midnight-blue via-royal-purple to-purple-night text-white font-semibold rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl hover:border-crimson-red transition-all duration-300 ease-in-out transform hover:bg-gradient-to-r hover:from-crimson-red hover:to-deep-rose focus:outline-none focus:ring-4 focus:ring-crimson-red focus:ring-opacity-50"
          >
            AYUDA
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Product;
