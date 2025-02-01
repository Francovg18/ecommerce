import React from 'react';
import Layout from '../../hocs/Layout';
import { UsersIcon, ShoppingCartIcon, GlobeAltIcon, LightningBoltIcon } from '@heroicons/react/solid';

function About() {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen py-16 px-6 sm:px-12 lg:px-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-gray-900">Acerca de Nosotros</h1>
          <p className="mt-4 text-lg text-gray-600">
            Somos <span className="text-red-500 font-semibold">Silicom</span>, Sin Límite en comunicación y comercialización. Le damos la bienvenida a nuestro nuevo Portal Web,
            donde podrá encontrar información de nuestros destacados productos, asistencia y puntos de comercialización en todo el país.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <UsersIcon className="w-16 h-16 text-red-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Nuestra Comunidad</h3>
            <p className="text-gray-600 mt-2">Conectamos a miles de clientes con los mejores productos del mercado.</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <ShoppingCartIcon className="w-16 h-16 text-red-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Variedad de Productos</h3>
            <p className="text-gray-600 mt-2">Ofrecemos una amplia gama de productos tecnológicos de alta calidad.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <GlobeAltIcon className="w-16 h-16 text-red-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Presencia Nacional</h3>
            <p className="text-gray-600 mt-2">Contamos con múltiples puntos de comercialización en todo el país.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <LightningBoltIcon className="w-16 h-16 text-red-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Atención Rápida</h3>
            <p className="text-gray-600 mt-2">Brindamos asistencia rápida y efectiva para garantizar la mejor experiencia.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default About;
