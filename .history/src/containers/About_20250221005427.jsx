import React from 'react';
import Layout from '../../hocs/Layout';
import { UsersIcon, ShoppingCartIcon, GlobeAltIcon,BriefcaseIcon } from '@heroicons/react/solid';
function About() {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen py-16 px-6 sm:px-12 lg:px-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-gray-900">Acerca de Nosotros</h1>
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
            { icon: BriefcaseIcon, title: "20 Años de Experiencia", text: "Llevamos dos décadas ofreciendo soluciones innovadoras en seguridad electrónica." }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center transition-transform transform hover:scale-105 hover:shadow-2xl">
              <item.icon className="w-16 h-16 text-red-500 mx-auto animate-bounce" />
              <h3 className="text-xl font-semibold mt-4 text-gray-800">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800">Nuestra Misión</h2>
            <p className="mt-4 text-gray-700 text-lg leading-relaxed">
              Brindamos servicios para la seguridad y el valor de la vida con soluciones tecnológicas avanzadas, respaldadas por un personal capacitado y comprometido con nuestros clientes.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800">Nuestra Visión</h2>
            <p className="mt-4 text-gray-700 text-lg leading-relaxed">
              Convertirnos en una empresa líder en el mercado, seguir siendo representantes exclusivos de la marca COMMAX y expandir nuestro alcance para superar las expectativas de nuestros clientes.
            </p>
          </div>
        </div>
        <div className="mt-12  p-8 ">
          <h2 className="text-3xl font-bold text-black">Nuestra Historia</h2>
          <p className="mt-4 text-black text-lg leading-relaxed">
            Silicom Bolivia fue fundada en el año 2002 como una empresa unipersonal representada por Young Bok Joo Kim. En sus inicios, nos dedicamos a la distribución de equipos de seguridad electrónica exclusivamente en La Paz. Con el tiempo, y gracias a una visión de expansión, comenzamos a importar equipos directamente desde Corea y abrimos nuevas sucursales en Cochabamba y Santa Cruz.
          </p>
          <p className="mt-4 text-black text-lg leading-relaxed">
            Durante estos 20 años, hemos logrado consolidarnos en el mercado con una amplia gama de productos de marcas reconocidas como COMMAX, SAMSUNG, HIKVISION, SECOM, IDIS, ANVIZ y muchas más.
          </p>
        </div>
      </div>
      
    </Layout>
  );
}

export default About;
