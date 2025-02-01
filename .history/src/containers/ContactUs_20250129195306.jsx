import React, { useState, useEffect, useRef } from 'react';
import Layout from '../hocs/Layout';
import { MapPinIcon, PhoneIcon, MailIcon, DeviceMobileIcon } from '@heroicons/react/24/solid';

const branches = [
  {
    title: 'La Paz',
    address: 'Av. Arce, Zona Sopocachi',
    tel: '2-2444444',
    cel: '76543210',
    email: 'lapaz@sucursales.com',
    mapUrl: 'https://www.google.com/maps?q=-16.5000,-68.1500&output=embed',
  },
  {
    title: 'Santa Cruz',
    address: 'Av. Cristo Redentor, 4to Anillo',
    tel: '3-3555555',
    cel: '76543211',
    email: 'santacruz@sucursales.com',
    mapUrl: 'https://www.google.com/maps?q=-17.7833,-63.1833&output=embed',
  },
  {
    title: 'Cochabamba',
    address: 'C. España, Esq. Bolívar',
    tel: '4-4666666',
    cel: '76543212',
    email: 'cochabamba@sucursales.com',
    mapUrl: 'https://www.google.com/maps?q=-17.3936,-66.1568&output=embed',
  }
];

function ContactUs() {
  const [progressWidth, setProgressWidth] = useState(0);
  const headingRef = useRef(null);

  useEffect(() => {
    if (headingRef.current) {
      const textLength = headingRef.current.textContent.length;
      setProgressWidth(Math.min((textLength / 90) * 100, 100));
    }
  }, []);

  return (
    <Layout>
      <div className="px-6 sm:px-12 lg:px-20 py-16 bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
        <div className="text-center">
          <h2
            ref={headingRef}
            className="text-4xl font-extrabold tracking-tight text-gray-900 relative inline-block"
          >
            🌍 Nuestras Sucursales en Bolivia
          </h2>
          <div className="w-full bg-gray-300 h-1 mt-2 rounded-full overflow-hidden">
            <div className="bg-red-500 h-1 transition-all duration-700" style={{ width: `${progressWidth}%` }}></div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {branches.map(({ title, address, tel, cel, email, mapUrl }, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col items-center shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <iframe
                src={mapUrl}
                className="w-full h-40 rounded-lg"
                loading="lazy"
              ></iframe>

              <div className="text-center mt-4 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-500 flex items-center justify-center">
                  <MapPinIcon className="w-5 h-5 text-red-500 mr-2" /> {address}
                </p>
                <p className="text-sm text-gray-500 flex items-center justify-center">
                  <PhoneIcon className="w-5 h-5 text-red-500 mr-2" /> Telf: {tel}
                </p>
                <p className="text-sm text-gray-500 flex items-center justify-center">
                  <DeviceMobileIcon className="w-5 h-5 text-red-500 mr-2" /> Cel: {cel}
                </p>
                <p className="text-sm text-gray-500 flex items-center justify-center">
                  <MailIcon className="w-5 h-5 text-red-500 mr-2" /> {email}
                </p>
              </div>

              <button className="mt-4 px-6 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-all duration-300">
                Contactar
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default ContactUs;
