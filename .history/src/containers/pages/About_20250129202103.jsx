import React from 'react';
import Layout from '../../hocs/Layout';
import { UsersIcon, ShoppingCartIcon, GlobeAltIcon, LightningBoltIcon } from '@heroicons/react/solid';

function About() {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen py-16 px-6 sm:px-12 lg:px-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
            Acerca de Nosotros
          </h1>
          <p className="mt-4 text-lg text-gray-700 font-medium leading-relaxed animate-fade-in">
            Somos <span className="text-red-500 font-bold">Silicom</span>, Sin Límite en comunicación y comercialización. Le damos la bienvenida a nuestro nuevo Portal Web,
            donde podrá encontrar información de nuestros destacados productos, asistencia y puntos de comercialización en todo el país.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[ 
            { icon: UsersIcon, title: "Nuestra Comunidad", text: "Conectamos a miles de clientes con los mejores productos del mercado." },
            { icon: ShoppingCartIcon, title: "Variedad de Productos", text: "Ofrecemos una amplia gama de productos tecnológicos de alta calidad." },
            { icon: GlobeAltIcon, title: "Presencia Nacional", text: "Contamos con múltiples puntos de comercialización en todo el país." },
            { icon: LightningBoltIcon, title: "Atención Rápida", text: "Brindamos asistencia rápida y efectiva para garantizar la mejor experiencia." }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
              <item.icon className="w-16 h-16 text-red-500 mx-auto animate-bounce" />
              <h3 className="text-xl font-semibold mt-4 text-gray-800">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default About;