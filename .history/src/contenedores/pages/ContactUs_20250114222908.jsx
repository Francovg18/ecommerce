import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../componentes/navegacion/Navbar';
import Footer from '../../componentes/navegacion/Footer';

function ContactUs() {
  const branches = [
    {
      title: 'Oficina Central La Paz',
      address: 'Calle 21',
      tel: '591-2-2799588 - 2791838 - 2775854',
      fax: '591-2-2799868',
      cel: '70596000',
      email: 'silicom.bolivia@hotmail.com',
      buttonText: 'Central',
    },
    {
      title: 'Oficina Central Oruro',
      address: 'Calle 21',
      tel: '591-2-2799588 - 2791838 - 2775854',
      fax: '591-2-2799868',
      cel: '70596000',
      email: 'silicom.bolivia@hotmail.com',
      buttonText: 'Central',
    },
    {
      title: 'Oficina Central Cochabamba',
      address: 'Calle 21',
      tel: '591-2-2799588 - 2791838 - 2775854',
      fax: '591-2-2799868',
      cel: '70596000',
      email: 'silicom.bolivia@hotmail.com',
      buttonText: 'Central',
    },
    {
      title: 'Oficina Central Santa Cruz',
      address: 'Calle 21',
      tel: '591-2-2799588 - 2791838 - 2775854',
      fax: '591-2-2799868',
      cel: '70596000',
      email: 'silicom.bolivia@hotmail.com',
      buttonText: 'Central',
    },
    {
      title: 'Oficina Central Tarija',
      address: 'Calle 21',
      tel: '591-2-2799588 - 2791838 - 2775854',
      fax: '591-2-2799868',
      cel: '70596000',
      email: 'silicom.bolivia@hotmail.com',
      buttonText: 'Central',
    },
  ];

  const [progressWidth, setProgressWidth] = useState(0);
  const headingRef = useRef(null); // Referencia al h2

  useEffect(() => {
    if (headingRef.current) {
      const textLength = headingRef.current.textContent.length; // Longitud del texto dinámico
      const maxLength = 50; // Longitud máxima para calcular el porcentaje
      const calculatedWidth = Math.min((textLength / maxLength) * 100, 100); // Porcentaje calculado
      setProgressWidth(calculatedWidth);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-16 py-12">
        {/* h2 dinámico con referencia */}
        <h2
          ref={headingRef}
          className="text-2xl font-extrabold tracking-tight text-gray-900 relative inline-block"
        >
          Nuestras Sucursales
        </h2>
        {/* Barra de progreso dinámica */}
        <div className="w-full bg-gray-200 h-1 mt-2">
          <div
            className="bg-red-500 h-1"
            style={{ width: `${progressWidth}%` }}
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
