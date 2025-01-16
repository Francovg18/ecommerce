import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../componentes/navegacion/Navbar';
import Footer from '../../componentes/navegacion/Footer';

function ContactUs() {
  const [textWidth, setTextWidth] = useState(0); // Estado para almacenar el ancho del texto
  const textRef = useRef(null); // Referencia para acceder al texto

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth); // Obtiene el ancho del texto
    }
  }, []);

  const branches = [
    // Tus datos de sucursales
  ];

  return (
    <>
      <Navbar />
      <div className="px-16 py-12">
        <div className="relative inline-block">
          <h2
            ref={textRef}
            className="text-2xl font-extrabold tracking-tight text-gray-900"
          >
            Nuestras Sucursales
          </h2>
          <div
            className="absolute left-0 bottom-0 h-1 bg-red-500"
            style={{ width: `${textWidth}px` }} // Establece la barra con el ancho del texto
          ></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mt-8">
          {branches.map((branch, index) => (
            <div
              key={index}
              className="border-2 border-red-300 rounded-lg p-4 flex items-center gap-4 shadow-lg"
            >
              <img
                src="/path-to-map-image.png"
                alt={`Mapa de ${branch.address}`}
                className="w-40 h-40 rounded-md object-cover"
              />
              <div>
                <h3 className="text-xl font-bold">{branch.title}</h3>
                <p>Telf/Fax: {branch.tel}</p>
                <p>Fax: {branch.fax}</p>
                <p>Cel: {branch.cel}</p>
                <p>Email: {branch.email}</p>
                <button className="mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600">
                  {branch.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ContactUs;
