import React, { useState, useEffect, useRef } from 'react';
import Layout from '../hocs/Layout';
import { LocationMarkerIcon, PhoneIcon, MailIcon, DeviceMobileIcon } from '@heroicons/react/solid';
import { branches } from '../helpers/fixedLocation';


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
      <div className="px-6 sm:px-12 lg:px-20 py-16 bg-gradient-to-b from-white to-gray-200 min-h-screen">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-gray-900">Sucursales</h1>
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
                  <LocationMarkerIcon className="w-5 h-5 text-red-500 mr-2" /> {address}
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

              <button className="mt-4 px-6 py-2 bg-midnight-blue text-white text-sm font-semibold rounded-lg hover:bg-purple-night transition-all duration-300">
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
