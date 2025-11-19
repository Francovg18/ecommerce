import React from "react";
import { MapIcon, PhoneIcon, MailIcon, ChatAltIcon, GlobeAltIcon, ShoppingBagIcon, UserGroupIcon, QuestionMarkCircleIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import logoPng from '../../assets/img/logoPng.png';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0">
            <img className="h-auto w-52 sm:w-52 md:w-48 lg:w-52 -ml-2" src={logoPng} alt="LogoPng" />
            <p className="text-sm text-indigo-300 mt-1">Sin Límite en comunicación y comercialización</p>
          </div>
          
          <div className="flex space-x-6">

        </div>
      </div>
        
        <div className="relative h-0.5 w-full bg-gray-800 mb-12 overflow-hidden">
          <div className="absolute w-1/3 h-full bg-gradient-to-r from-crimson-red to-red-500 animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-10">
          {/* Información silicom */}
          <div>
            <h3 className="text-l font-bold text-white mb-6 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-12 after:bg-red-500 after:rounded-full">Nosotros</h3>
            <p className="text-gray-400 leading-relaxed">
              Ofrecemos la mejor calidad en productos y servicios de comunicación y tecnología, con soluciones innovadoras diseñadas para el mundo de hoy.
            </p>
            <div className="mt-6 flex items-center space-x-4">
              <div className="p-2 rounded-full bg-gray-800">
                <ShoppingBagIcon className="w-5 h-5 text-red-400" />
              </div>
              <div className="p-2 rounded-full bg-gray-800">
                <UserGroupIcon className="w-5 h-5 text-red-400" />
              </div>
              <div className="p-2 rounded-full bg-gray-800">
                <GlobeAltIcon className="w-5 h-5 text-red-400" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-l font-bold text-white mb-6 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-12 after:bg-red-500 after:rounded-full">Enlaces</h3>
            <ul className="space-y-4">
              {[
                {text: "Iniciar Sesion", link: "/login"},
                {text: "Catalogo", link: "/products"},
                {text: "Sobre Nosotros", link: "/about"},
                {text: "Únete a nosotros", link: "/user_register"},
                {text: "Ayuda & Soporte", link: "/help"},
              ].map((item, index) => (
                <li key={index}>
                  <a href={item.link} className="group flex items-center">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 mr-3 transition-all duration-300 group-hover:w-3"></span>
                    <span className="hover:text-indigo-400 transition">{item.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-l font-bold text-white mb-6 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-12 after:bg-red-500 after:rounded-full">
              Contacto y Soporte
            </h3>
            <ul className="space-y-4">

              <li className="flex items-start">
                <a
                  href="/contacto"
                  className="p-2 rounded-full bg-blue-500 text-white mr-3 mt-1 hover:bg-blue-600 transition"
                >
                  <MailIcon className="w-5 h-5" />
                </a>
                <div>
                  <p className="text-sm text-gray-400">Formulario en línea</p>
                  <p>Envíanos tus consultas de manera rápida.</p>
                </div>
              </li>

              <li className="flex items-start">
                <a
                  href="/contactus"
                  className="p-2 rounded-full bg-red-600 text-white mr-3 mt-1 hover:bg-red-700 transition"
                >
                  <MapIcon className="w-5 h-5" />
                </a>
                <div>
                  <p className="text-sm text-gray-400">Nuestras Sucursales</p>
                  <p>Consulta todas nuestras ubicaciones en Bolivia.</p>
                </div>
              </li>

              <li className="flex items-start">
                <a
                  href="/help"
                  className="p-2 rounded-full bg-green-600 text-white mr-3 mt-1 hover:bg-green-700 transition"
                >
                  <QuestionMarkCircleIcon className="w-5 h-5" />
                </a>
                <div>
                  <p className="text-sm text-gray-400">Centro de Ayuda</p>
                  <p>Respuestas sobre el uso de la página.</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
          <h3 className="text-l font-bold text-white mb-6 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-12 after:bg-red-500 after:rounded-full">
            Redes
          </h3>

          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center space-x-3 hover:text-white transition-all duration-300">
              <a
                href="https://www.facebook.com/commaxbolivia?rdid=4CZRhmQCOTlbNnOT"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook SILICOM Santa Cruz"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <span>Silicom Santa Cruz</span>
            </li>

            <li className="flex items-center space-x-3 hover:text-white transition-all duration-300">
              <a
                href="https://www.facebook.com/silicombol?rdid=CsHTVd6UNSfiHI5g"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook SILICOM Bolivia"
                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <span>Silicom La Paz</span>
            </li>
          </ul>

          <hr className="my-6 border-gray-600" />

          <h3 className="text-l font-bold text-white mb-6 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-12 after:bg-red-500 after:rounded-full">
            Pagos
          </h3>

          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center space-x-3">
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800">
                <i className="fas fa-qrcode text-xl text-green-400"></i>
              </span>
              <span>Vía QR</span>
            </li>
          </ul>
        </div>

        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">Copyright &copy; {new Date().getFullYear()} <span className="red-400">Silicom</span> - Sin límite en comunicación y comercialización. All Rights Reserved.</p> 
        </div>
      </div>
    </footer>
  );
}

export default Footer;
