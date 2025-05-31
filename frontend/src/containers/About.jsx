import React from 'react';
import Layout from '../hocs/Layout';
import { 
  UsersIcon, 
  ShoppingCartIcon, 
  GlobeAltIcon, 
  BriefcaseIcon,
  BadgeCheckIcon,
  LightBulbIcon,
  HeartIcon
} from '@heroicons/react/solid';

function About() {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">

        <div className="relative py-24 overflow-hidden bg-gray-900">
          <div className="absolute inset-0 bg-crimson-red opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-70"></div>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center md:text-left md:max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                Acerca de <span className="text-red-500">Silicom</span>
              </h1>
              <p className="mt-6 text-xl text-gray-300 font-medium leading-relaxed animate-fade-in">
                Sin Límite en comunicación y comercialización. Le damos la bienvenida a nuestro nuevo Portal Web,
                donde podrá encontrar información de nuestros destacados productos, asistencia y puntos de comercialización en todo el país.
              </p>
            </div>
          </div>
          <div className="hidden md:block absolute right-0 bottom-0 transform translate-y-12 translate-x-20 opacity-20">
            <svg width="320" height="320" viewBox="0 0 24 24" className="text-red-400 fill-current">
              <path d="M21 9l-9-7-9 7v11h18v-11zm-11 7.5h-1v-3.5h-2v3.5h-1v-4.5h4v4.5zm6 0h-4v-2h3v-1h-3v-1.5h4v4.5z"></path>
            </svg>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Nuestra Filosofía</h2>
            <div className="w-16 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-xl border-b-4 border-red-500 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <BadgeCheckIcon className="w-8 h-8 text-red-500 mr-3" />
                Nuestra Misión
              </h2>
              <p className="mt-4 text-gray-700 text-lg leading-relaxed">
                Brindamos servicios para la seguridad y el valor de la vida con soluciones tecnológicas avanzadas, respaldadas por un personal capacitado y comprometido con nuestros clientes.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-xl border-b-4 border-red-500 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <LightBulbIcon className="w-8 h-8 text-red-500 mr-3" />
                Nuestra Visión
              </h2>
              <p className="mt-4 text-gray-700 text-lg leading-relaxed">
                Convertirnos en una empresa líder en el mercado, seguir siendo representantes exclusivos de la marca COMMAX y expandir nuestro alcance para superar las expectativas de nuestros clientes.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Lo Que Nos Distingue</h2>
              <div className="w-24 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[ 
                { icon: UsersIcon, title: "Nuestra Comunidad", text: "Conectamos a miles de clientes con los mejores productos del mercado." },
                { icon: ShoppingCartIcon, title: "Variedad de Productos", text: "Ofrecemos una amplia gama de productos tecnológicos de alta calidad." },
                { icon: GlobeAltIcon, title: "Presencia Nacional", text: "Contamos con múltiples puntos de comercialización en todo el país." },
                { icon: BriefcaseIcon, title: "20 Años de Experiencia", text: "Llevamos dos décadas ofreciendo soluciones innovadoras en seguridad electrónica." }
              ].map((item, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:bg-red-50 hover:shadow-xl">
                  <div className="bg-red-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold mt-4 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Nuestra Historia</h2>
            <div className="w-20 h-1 bg-red-500 mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-red-400 transform -translate-x-1/2"></div>
            
            <div className="space-y-16">
              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
                  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
                    <div className="font-bold text-red-500 text-xl mb-2">2002</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Los Inicios</h3>
                    <p className="text-gray-700">
                      Silicom Bolivia fue fundada como una empresa unipersonal representada por Young Bok Joo Kim. En sus inicios, nos dedicamos a la distribución de equipos de seguridad electrónica exclusivamente en La Paz.
                    </p>
                  </div>
                </div>
                <div className="hidden md:block relative w-8 h-8 rounded-full bg-red-500 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="absolute w-4 h-4 rounded-full bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>

              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-12"></div>
                <div className="hidden md:block relative w-8 h-8 rounded-full bg-red-500 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="absolute w-4 h-4 rounded-full bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0">
                  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
                    <div className="font-bold text-red-500 text-xl mb-2">2005-2010</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Expansión</h3>
                    <p className="text-gray-700">
                      Con el tiempo, y gracias a una visión de expansión, comenzamos a importar equipos directamente desde Corea y abrimos nuevas sucursales en Cochabamba y Santa Cruz.
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
                  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
                    <div className="font-bold text-red-500 text-xl mb-2">2010-2022</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Consolidación</h3>
                    <p className="text-gray-700">
                      Durante estos años, hemos logrado consolidarnos en el mercado con una amplia gama de productos de marcas reconocidas como COMMAX, SAMSUNG, HIKVISION, SECOM, IDIS, ANVIZ y muchas más.
                    </p>
                  </div>
                </div>
                <div className="hidden md:block relative w-8 h-8 rounded-full bg-red-500 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="absolute w-4 h-4 rounded-full bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>

              <div className="md:flex items-center">
                <div className="md:w-1/2 md:pr-12"></div>
                <div className="hidden md:block relative w-8 h-8 rounded-full bg-red-500 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="absolute w-4 h-4 rounded-full bg-white left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                <div className="md:w-1/2 md:pl-12 mb-8 md:mb-0">
                  <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
                    <div className="font-bold text-red-500 text-xl mb-2">Actualidad</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovación Constante</h3>
                    <p className="text-gray-700">
                      Hoy, Silicom continúa innovando y expandiendo su catálogo de productos y servicios, manteniendo su compromiso con la excelencia y la satisfacción del cliente en todo Bolivia.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 py-16 border border-gray-900 m-12 rounded-2xl shadow-xl">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { number: "20+", label: "Años de experiencia", icon: BriefcaseIcon },
                { number: "3", label: "Ciudades principales", icon: GlobeAltIcon },
                { number: "10+", label: "Marcas exclusivas", icon: BadgeCheckIcon },
                { number: "1000+", label: "Clientes satisfechos", icon: HeartIcon }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-300 rounded-xl shadow-md p-6 text-center transform transition duration-300 hover:shadow-lg hover:scale-105"
                >
                  <div className="inline-flex items-center justify-center p-3 bg-red-500 bg-opacity-20 rounded-full mb-4 shadow-sm">
                    <stat.icon className="w-8 h-8 text-red-500" />
                  </div>
                  <div className="text-4xl font-extrabold text-black">{stat.number}</div>
                  <div className="text-gray-700 mt-2 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>
    </Layout>
  );
}

export default About;