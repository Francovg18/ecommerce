import { Link } from "react-router-dom";

const Footer = () => {
    return (
      <footer className="bg-gray-100 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between text-gray-700">
          {/* Columns */}
          <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
            <h3 className="font-semibold text-gray-800">
              Silicom
            </h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Categorias</li>
              <li>Analytics</li>
              <li>Commerce</li>
              <li>Insights</li>
            </ul>
          </div>
          <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
            <h3 className="font-semibold text-gray-800 ">
              Ayuda
            </h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Price</li>
              <li>Documentation</li>
            </ul>
          </div>
          <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
            <h3 className="font-semibold text-gray-800">
              Compañia
            </h3>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Marketing</li>
              <li>Analytics</li>
              <li>Commerce</li>
              <li>Insights</li>
            </ul>
          </div>
          <div className="w-full sm:w-1/4">
            <h3 className="font-semibold text-gray-800">
              Déjanos tu comentario
            </h3>
            <p className="text-sm mt-2 mb-3">Ayúdanos a mejorar el sitio web</p>
            <form className="flex">
              <input
                type="text"
                placeholder="Comentario"
                className="w-full px-3 py-1 text-sm border border-gray-300 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-midnight-blue text-white px-3 py-1 rounded-r-md text-sm hover:bg-purple-night transition duration-300"
              >
                Comentar
              </button>
            </form>
          </div>
        </div>
        
        {/* Divider */}
        <hr className="my-6 border-1 border-midnight-blue mx-4" />

        
        {/* Footer bottom */}
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-gray-600 text-sm">
          <p>Copyright © 2024 Silicom - Sin límite en comunicación y comercialización. All Rights Reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link to='' className="text-gray-600 hover:text-midnight-blue text-lg">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link to='' className="text-gray-600 hover:text-midnight-blue text-lg">
              <i className="fab fa-whatsapp"></i>
            </Link>
            <Link to='' className="text-gray-600 hover:text-purple-500 text-lg">
              <i className="fab fa-instagram"></i>
            </Link>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  

  