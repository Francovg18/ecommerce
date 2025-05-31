import React from "react";
import { MapIcon, PhoneIcon, MailIcon, ChatAltIcon, GlobeAltIcon, ShoppingBagIcon, UserGroupIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-200 to-blue-100 bg-clip-text text-transparent">Silicom</h2>
            <p className="text-sm text-indigo-300 mt-1">Sin Límite en comunicación y comercialización</p>
          </div>
          
          <div className="flex space-x-6">
            <Link to='' className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1">
              <i className="fab fa-facebook-f text-xl"></i>
            </Link>
            <Link to='' className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1">
              <i className="fab fa-twitter text-xl"></i>
            </Link>
            <Link to='' className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1">
              <i className="fab fa-instagram text-xl"></i>
            </Link>
            <Link to='' className="w-10 h-10 rounded-full bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1">
              <i className="fab fa-linkedin-in text-xl"></i>
            </Link>
          </div>
        </div>
        
        <div className="relative h-0.5 w-full bg-gray-800 mb-12 overflow-hidden">
          <div className="absolute w-1/3 h-full bg-gradient-to-r from-crimson-red to-red-500 animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
            <ul className="space-y-3">
              {[
                {text: "Sobre Nosotros", link: "/about"},
                {text: "Ayuda & Soporte", link: "/help"},
                {text: "Contacto", link: "/contactus"},
                {text: "Tienda", link: "/shop"},
                {text: "Términos y Condiciones", link: "/terms"}
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
            <h3 className="text-l font-bold text-white mb-6 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-12 after:bg-red-500 after:rounded-full">Contacto</h3>
            <ul className="space-y-4">
            <li className="flex items-start">
              <a
                href="https://wa.me/59164163930?text=Hola,%20tengo%20una%20consulta..."
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-green-500 mr-3 mt-1 hover:bg-green-600 transition"
              >
                <ChatAltIcon className="w-5 h-5 text-white" />
              </a>
              <div>
                <p className="text-sm text-gray-400">WhatsApp</p>
                <p>78945612</p>
              </div>
            </li>

            <li className="flex items-start">
              <a
                href="mailto:alefrvg@gmail.com?subject=Consulta&body=Hola,%20tengo%20una%20consulta..."
                className="p-2 rounded-full bg-blue-500 text-white mr-3 mt-1"
              >
                <MailIcon className="w-5 h-5" />
              </a>
              <div>
                <p className="text-sm text-gray-400">Correo Electrónico</p>
                <p>silicom@empresa.com</p>
              </div>
            </li>

              <li className="flex items-start">
                <div className="p-2 rounded-full bg-red-600 mr-3 mt-1">
                  <MapIcon className="w-5 h-5 red-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Dirección</p>
                  <p>Calle Comercio, La Paz, Bolivia</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="text-l font-bold text-white mb-6 relative inline-block after:content-[''] after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-12 after:bg-red-500 after:rounded-full">Soporte</h3>
            <p className="text-gray-400 mb-4">Contactanos a nuestro soporte tecnico</p>

              <li className="flex items-start">
                <div className="p-2 rounded-full bg-green-800 mr-3 mt-1">
                  <PhoneIcon className="w-5 h-5 red-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Teléfono</p>
                  <p>800-123-456</p>
                </div>
              </li>
            <p className="text-gray-500 text-xs mt-3">
              Nos importa tu privacidad. No compartiremos tu información con terceros.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">Copyright &copy; {new Date().getFullYear()} <span className="red-400">Silicom</span> - Sin límite en comunicación y comercialización. All Rights Reserved.</p> 
          <div className="flex justify-center mt-4 space-x-6 text-gray-500 text-sm">
            <Link to="/privacy" className="hover:red-400 transition">Privacidad</Link>
            <Link to="/terms" className="hover:red-400 transition">Términos</Link>
            <Link to="/cookies" className="hover:red-400 transition">Cookies</Link>
            <Link to="/sitemap" className="hover:red-400 transition">Mapa del sitio</Link>
            <Link to="/signup" className="text-base font-medium text-gray-500 hover:text-gray-900 flex items-center">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;