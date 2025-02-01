import React, { useState } from "react";
import axios from "axios";

const Footer = () => {
  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState("");

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await axios.post("/api/enviar-comentario/", { comentario });
      setMensaje("¡Comentario enviado exitosamente!");
      setComentario("");
    } catch (error) {
      setMensaje("Hubo un error al enviar el comentario. Inténtalo nuevamente.");
    }
  };

  return (
    <footer className="bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between text-gray-700">
        {/* Columnas */}
        <div className="w-full sm:w-1/4">
          <h3 className="font-semibold text-gray-800">
            Déjanos tu comentario
          </h3>
          <p className="text-sm mt-2 mb-3">Ayúdanos a mejorar el sitio web</p>
          <form className="flex" onSubmit={manejarEnvio}>
            <input
              type="text"
              placeholder="Comentario"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className="w-full px-3 py-1 text-sm border border-gray-300 rounded-l-md focus:outline-none"
              required
            />
            <button
              type="submit"
              className="bg-midnight-blue text-white px-3 py-1 rounded-r-md text-sm hover:bg-purple-night transition duration-300"
            >
              Comentar
            </button>
          </form>
          {mensaje && (
            <p className={`mt-2 text-sm ${mensaje.includes("error") ? "text-red-500" : "text-green-500"}`}>
              {mensaje}
            </p>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
