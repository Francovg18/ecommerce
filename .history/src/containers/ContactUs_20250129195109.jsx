import React, { useState, useEffect, useRef } from 'react';
import { branches } from '../helpers/fixedLocation';
import Layout from '../hocs/Layout';
import { MapIcon, PhoneIcon, MailIcon, DeviceMobileIcon } from '@heroicons/react/solid';

function ContactUs() {
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
    <Layout>
      <div className="px-6 sm:px-12 lg:px-20 py-12 bg-gray-50">
        {/* Encabezado */}
        <div className="text-center">
          <h2
            ref={headingRef}
            className="text-3xl font-extrabold tracking-tight text-gray-900 relative inline-block"
          >
            🌍 Nuestras Sucursales
          </h2>
          <div className="w-full bg-gray-300 h-1 mt-2">
            <div className="bg-red-500 h-1 transition-all duration-500" style={{ width: `${progressWidth}%` }}></div>
          </div>
        </div>

        {/* Contenedor de sucursales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {branches.map(({ title, address, tel, fax, cel, email, buttonText }, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Imagen del mapa */}
              <img
                src="/path-to-map-image.png"
                alt={`Mapa de ${address}`}
                className="w-full h-40 object-cover rounded-lg"
              />

              {/* Información */}
              <div className="text-center mt-4 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500 flex items-center justify-center">
                  <MapIcon className="w-5 h-5 text-red-500 mr-2" /> {address}
                </p>
                <p className="text-sm text-gray-500 flex items-center justify-center">
                  <PhoneIcon className="w-5 h-5 text-red-500 mr-2" /> Telf/Fax: {tel}
                </p>
                {fax && (
                  <p className="text-sm text-gray-500 flex items-center justify-center">
                    <PhoneIcon className="w-5 h-5 text-red-500 mr-2" /> Fax: {fax}
                  </p>
                )}
                <p className="text-sm text-gray-500 flex items-center justify-center">
                  <DeviceMobileIcon className="w-5 h-5 text-red-500 mr-2" /> Cel: {cel}
                </p>
                <p className="text-sm text-gray-500 flex items-center justify-center">
                  <MailIcon className="w-5 h-5 text-red-500 mr-2" /> {email}
                </p>
              </div>

              {/* Botón */}
              <button className="mt-4 px-6 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-all duration-300">
                {buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ContactUs;
