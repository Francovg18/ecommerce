import React from "react";
import { MapIcon, PhoneIcon, MailIcon, GlobeAltIcon, ShoppingBagIcon, UserGroupIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Secciones del Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Información de la Empresa */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Silicom</h3>
            <p className="text-gray-400">
              Sin Límite en comunicación y comercialización. Ofrecemos la mejor calidad en productos y servicios.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-red-400 transition">Sobre Nosotros</a></li>
              <li><a href="/help" className="hover:text-red-400 transition">Ayuda</a></li>
              <li><a href="/contactus" className="hover:text-red-400 transition">Contacto</a></li>
              <li><a href="/shop" className="hover:text-red-400 transition">Tienda</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center"><PhoneIcon className="w-5 h-5 text-red-400 mr-2" /> +591 123-456-789</li>
              <li className="flex items-center"><MailIcon className="w-5 h-5 text-red-400 mr-2" /> soporte@silicom.com</li>
              <li className="flex items-center"><MapIcon className="w-5 h-5 text-red-400 mr-2" /> Calle Comercio, Bolivia</li>
            </ul>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <Link to='' className="hover:text-red-400 transition"><i className="fab fa-facebook-f text-2xl"></i></Link>
              <Link to='' clLinkssName="hover:text-red-400 transition"><i className="fab fa-twitter text-2xl"></i></Link>
              <Link to='' className="hover:text-red-400 transition"><i className="fab fa-instagram text-2xl"></i></Link>
              <Link to='' className="hover:text-red-400 transition"><i className="fab fa-linkedin-in text-2xl"></i></Link>
            </div>
          </div>
        </div>

        {/* Línea Divisoria */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm">
          <p>Copyright &copy; {new Date().getFullYear()} Silicom - Sin límite en comunicación y comercialización. All Rights Reserved.</p> 
        </div>
      </div>
    </footer>
  );
}

export default Footer;