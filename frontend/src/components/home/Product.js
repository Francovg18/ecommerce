import { useState } from "react";
import { HandIcon, CloudUploadIcon, CogIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

function Product() {
  const [isSpinning, setIsSpinning] = useState(false);

  const handleCogClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 2000);
  };

  const CardSection = ({ icon: Icon, title, description, linkTo, linkText }) => (
    <div className="mx-10 my-8 group relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-midnight-blue to-purple-night rounded-xl opacity-75 group-hover:opacity-100 transition duration-300 blur-sm group-hover:blur-lg"></div>
      <div className="relative bg-white p-6 rounded-xl shadow-lg space-y-4 text-center overflow-hidden">
        <div className="relative z-10">
          <div className="flex justify-center mb-4">
            <Icon className="h-16 w-16 text-midnight-blue transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3 transition-colors group-hover:text-midnight-blue">{title}</h3>
          <p className="text-gray-600 mb-4 h-20">{description}</p>
          <Link
            to={linkTo}
            className="inline-block px-8 py-3 bg-gradient-to-r from-midnight-blue to-purple-night text-white font-semibold rounded-full 
            transition-all duration-300 transform hover:scale-105 hover:shadow-xl 
            focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50"
          >
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="-mt-20 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-12 animate-fade-in">
          Bienvenido a <span className="text-transparent bg-clip-text bg-gradient-to-r from-midnight-blue to-purple-night">Silicom</span>
        </h1>
        <div className="text-sm grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <CardSection 
            icon={HandIcon}
            title="Variedad"
            description="Gracias a Silicom puedes comprar productos de calidad desde la comodidad de tu casa."
            linkTo="/products"
            linkText="VER PRODUCTOS"
          />
          
          <CardSection 
            icon={CloudUploadIcon}
            title="Registrarme"
            description="Para comprar online, necesitas iniciar sesión con tu cuenta."
            linkTo="/login"
            linkText="INICIA SESIÓN"
          />
          
          <div className="mx-10 my-8 group relative transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-midnight-blue to-purple-night rounded-xl opacity-75 group-hover:opacity-100 transition duration-300 blur-sm group-hover:blur-lg"></div>
            <div className="relative bg-white p-6 rounded-xl shadow-lg space-y-4 text-center overflow-hidden">
              <div className="relative z-10 ">
                <div className="flex justify-center mb-4">
                  <div 
                    className={`cursor-pointer ${isSpinning ? "animate-spin" : ""}`}
                    onClick={handleCogClick}
                  >
                    <CogIcon className="h-16 w-16 text-midnight-blue transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3 transition-colors group-hover:text-midnight-blue">Compras online</h3>
                <p className="text-gray-600 mb-4 h-20">Para saber más acerca de cómo comprar, visita nuestra sección de ayuda.</p>
                <Link
                  to="/help"
                  className="inline-block px-8 py-3 bg-gradient-to-r from-midnight-blue to-purple-night text-white font-semibold rounded-full 
                  transition-all duration-300 transform hover:scale-105 hover:shadow-xl 
                  focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-50"
                >
                  AYUDA
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;