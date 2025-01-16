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
  const [maxLength, setMaxLength] = useState(35); 
  const headingRef = useRef(null);

  useEffect(() => {
    const updateMaxLength = () => {
      setMaxLength(window.innerWidth >= 1024 ? 90 : 35);
    };

    updateMaxLength();
    window.addEventListener('resize', updateMaxLength);
    return () => window.removeEventListener('resize', updateMaxLength);
  }, []);

  useEffect(() => {
    if (headingRef.current) {
      const textLength = headingRef.current.textContent.length;
      setProgressWidth(Math.min((textLength / maxLength) * 100, 100));
    }
  }, [maxLength]);

  return (
    <>
      <Navbar />
      <div className="px-4 sm:px-16 py-12">
        <h2
          ref={headingRef}
          className="text-2xl font-extrabold tracking-tight text-gray-900 relative inline-block"
        >
          Nuestras Sucursales
        </h2>
        <div className="w-full bg-gray-200 h-1 mt-1">
          <div
            className="bg-red-500 h-1"
            style={{ width: `${progressWidth}%` }}
          ></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 mt-12">
          {branches.map(({ title, address, tel, fax, cel, email, buttonText }, index) => (
            <div
              key={index}
              className="border-2 border-red-300 rounded-lg p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 shadow-lg"
            >
              <img
                src="/path-to-map-image.png"
                alt={`Mapa de ${address}`}
                className="w-full sm:w-32 h-32 rounded-md object-cover"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
                <p className="text-sm sm:text-base">Telf/Fax: {tel}</p>
                <p className="text-sm sm:text-base">Fax: {fax}</p>
                <p className="text-sm sm:text-base">Cel: {cel}</p>
                <p className="text-sm sm:text-base">Email: {email}</p>
                <button className="mt-4 px-4 sm:px-6 py-2 bg-red-500 text-white text-sm sm:text-base font-semibold rounded-lg hover:bg-red-600">
                  {buttonText}
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
