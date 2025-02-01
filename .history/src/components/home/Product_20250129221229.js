import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm"; // Importa tu formulario de Login
import { XIcon } from "@heroicons/react/solid"; // Ícono para cerrar el modal
import Login from '../../containers/auth/Login'
function LoginModal() {
  const [isOpen, setIsOpen] = useState(false); // Estado para abrir/cerrar el modal

  return (
    <div className="relative">
      {/* Botón de Inicio de Sesión */}
      <button
        onClick={() => setIsOpen(true)} // Abre el modal
        className="mt-4 px-6 py-2 border-1 border-transparent bg-gradient-to-r from-midnight-blue via-royal-purple to-purple-night text-white font-semibold rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl hover:border-crimson-red transition-all duration-300 ease-in-out transform hover:bg-gradient-to-r hover:from-crimson-red hover:to-deep-rose focus:outline-none focus:ring-4 focus:ring-crimson-red focus:ring-opacity-50"
      >
        INICIA SESIÓN
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            {/* Botón de Cerrar */}
            <button
              onClick={() => setIsOpen(false)} // Cierra el modal
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition"
            >
              <XIcon className="w-6 h-6" />
            </button>

            {/* Título */}
            <h2 className="text-xl font-bold text-center text-gray-900 mb-4">Iniciar Sesión</h2>

            {/* Formulario de Inicio de Sesión */}
            <Login /> {/* Aquí se renderiza el formulario */}

          </div>
        </div>
      )}
    </div>
  );
}

export default LoginModal;
