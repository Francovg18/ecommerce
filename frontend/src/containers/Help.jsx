import React, { useState } from 'react';
import { 
  QuestionMarkCircleIcon, 
  ChatAltIcon, 
  PhoneIcon, 
  MailIcon,
  SearchIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  TruckIcon,
  CreditCardIcon,
  RefreshIcon
} from '@heroicons/react/solid';
import Layout from '../hocs/Layout';


const FAQ = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border border-gray-200 rounded-lg bg-white overflow-hidden transition-all duration-200 hover:shadow-md">
      <button 
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <QuestionMarkCircleIcon className="w-5 h-5 text-crimson-red mr-3 flex-shrink-0" />
          <h3 className="text-l font-medium text-gray-800">{question}</h3>
        </div>
        {isOpen ? 
          <ChevronUpIcon className="w-5 h-5 text-gray-500" /> : 
          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        }
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-600 border-t border-gray-100">
          <p className="pt-3 text-sm">{answer}</p>
        </div>
      )}
    </div>
  );
};

const CategorySection = ({ title, icon: Icon, faqs }) => {
  return (
    <div className="mb-10">
      <div className="flex items-center mb-6">
        <Icon className="w-6 h-6 text-crimson-red mr-3" />
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      </div>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <FAQ key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

const ContactCard = ({ icon: Icon, title, description, contactInfo }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105">
      <div className="text-center">
        <div className="inline-flex items-center justify-center p-3 bg-red-50 rounded-full mb-4">
          <Icon className="w-8 h-8 text-crimson-red" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="font-medium text-crimson-red">{contactInfo}</p>
      </div>
    </div>
  );
};

function Help() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const faqCategories = [
    {
      title: "Pedidos y Envíos",
      icon: TruckIcon,
      faqs: [
        { 
          question: "¿Cómo realizo un pedido?", 
          answer: "Para realizar un pedido, simplemente busca los productos que deseas, agrégalos al carrito y procede al checkout. Allí podrás verificar tu pedido, seleccionar el método de envío y completar el pago de forma segura." 
        },
        { 
          question: "¿Cuánto tiempo tardará en llegar mi pedido?", 
          answer: "El tiempo de entrega depende de tu ubicación. Generalmente, las entregas se realizan entre 2-5 días hábiles para áreas urbanas y 5-8 días para zonas rurales. Puedes hacer seguimiento de tu pedido con el código que recibirás por email." 
        },
        { 
          question: "¿Puedo modificar mi pedido una vez realizado?", 
          answer: "Puedes solicitar modificaciones en tu pedido durante las primeras horas después de realizarlo contactando a nuestro servicio al cliente. Una vez que el pedido entre en estado: procesado, no podremos realizar cambios." 
        },
        { 
          question: "¿Realizan envíos nacionales?", 
          answer: "Sí, realizamos envíos nacionales a todos los departamentos. Los tiempos de entrega varían entre 7-15 días hábiles dependiendo del destino. Puedes consultar las tarifas específicas durante el proceso de compra." 
        }
      ]
    },
    {
      title: "Pagos y Facturación",
      icon: CreditCardIcon,
      faqs: [
        { 
          question: "¿Qué métodos de pago aceptan?", 
          answer: "Aceptamos tarjetas de crédito, tarjetas de débito, PayPal, transferencias bancarias, pagos QR y pago contra entrega en algunas localidades. Todos nuestros métodos de pago cuentan con protección antifraude." 
        },
        { 
          question: "¿Cómo solicito una factura?", 
          answer: "Puedes solicitar tu factura durante el proceso de compra marcando la opción correspondiente e ingresando tus datos fiscales. También puedes solicitarla posteriormente a través de la sección 'Mis Pedidos' en tu cuenta o contactando con nuestro servicio de atención al cliente." 
        },
        { 
          question: "¿Ofrecen pagos en cuotas?", 
          answer: "No, no ofrecemos la posibilidad de pagar en cuotas. Las opciones disponibles se mostrarán durante el proceso de pago." 
        }
      ]
    },
    {
      title: "Devoluciones y Garantías",
      icon: RefreshIcon,
      faqs: [
        { 
          question: "¿Cómo puedo devolver un producto?", 
          answer: "Para devolver un producto, accede a 'Contactanos' en tu cuenta, contactanos con tu numero de orden del pedido correspondiente y solicita la devolucion. Nuestro soporte se encargará de analizar el caso" 
        },
        { 
          question: "¿Cuál es la política de garantía?", 
          answer: "Todos nuestros productos cuentan con la garantía oficial del fabricante, que varía según el tipo de artículo (generalmente entre 1 y 3 años). Además, ofrecemos 30 días de garantía de satisfacción en la que puedes devolver el producto si no cumple con tus expectativas." 
        },
        { 
          question: "¿Qué hago si recibo un producto defectuoso?", 
          answer: "Si recibes un producto defectuoso, contáctanos de inmediato dentro de las primeras 48 horas. Te indicaremos cómo proceder para el reemplazo o reparación sin costos adicionales, según lo que prefieras." 
        }
      ]
    },
    {
      title: "Información General",
      icon: ClockIcon,
      faqs: [
        { 
          question: "¿Cuál es el horario de atención al cliente?", 
          answer: "Nuestro servicio de atención al cliente está disponible de lunes a viernes de 9:00 a 18:00 y sábados de 10:00 a 15:00 (hora local). Para consultas urgentes, puedes utilizar nuestro chat en línea disponible 24/7." 
        },
        { 
          question: "¿Tienen tiendas físicas?", 
          answer: "Contamos con tiendas físicas en las principales ciudades del país. Puedes consultar la ubicación más cercana en la sección 'Nuestras Sucursales' de la web." 
        }
      ]
    }
  ];

  const filteredFAQs = searchTerm.length > 2 
    ? faqCategories.map(category => ({
        ...category,
        faqs: category.faqs.filter(faq => 
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.faqs.length > 0)
    : faqCategories;

  return (
    <Layout>
      <div className="bg-gradient-to-b from-slate-50 to-slate-200 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="animate-fadeIn relative">
            <div className="absolute inset-0 bg-crimson-red opacity-5 rounded-3xl transform -rotate-1"></div>
            <div className="absolute inset-0 bg-blue-500 opacity-5 rounded-3xl transform rotate-1"></div>
            <div className="relative bg-white px-8 py-12 rounded-2xl shadow-xl">
              <h1 className="text-2xl sm:text-4xl font-extrabold bg-gradient-to-r from-deep-rose to-red-500 bg-clip-text text-transparent">
                Centro de Ayuda
              </h1>
              <p className="mt-4 text-l text-gray-600">
                Encuentra respuestas a tus preguntas y resuelve tus dudas rápidamente
              </p>
              
              <div className="mt-8 max-w-md mx-auto">
                <div className="relative flex items-center">
                  <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3" />
                  <input
                    type="text"
                    placeholder="Buscar en preguntas frecuentes..."
                    className="w-full py-3 pl-10 pr-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-crimson-red focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((category, index) => (
                <CategorySection 
                  key={index} 
                  title={category.title} 
                  icon={category.icon} 
                  faqs={category.faqs} 
                />
              ))
            ) : (
              <div className="text-center py-10">
                <QuestionMarkCircleIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-700">No encontramos resultados para "{searchTerm}"</h3>
                <p className="text-gray-500 mt-2">Intenta con otros términos o contáctanos directamente</p>
              </div>
            )}
          </div>
          
          <div className="bg-gray-100 rounded-2xl shadow-lg p-8 mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Contáctanos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ContactCard 
                icon={ChatAltIcon}
                title="Chat en Vivo"
                description="Obtén ayuda inmediata de nuestros asesores"
                contactInfo="Disponible 24/7"
              />
              
              <ContactCard 
                icon={PhoneIcon}
                title="Atención Telefónica"
                description="Habla con nuestro equipo de soporte"
                contactInfo="800-123-4567"
              />
              
              <ContactCard 
                icon={MailIcon}
                title="Correo Electrónico"
                description="Envíanos tus consultas y te responderemos a la brevedad"
                contactInfo="tienda@silicom.com"
              />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-midnight-blue to-purple-night rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="p-8 md:w-2/3">
                <h2 className="text-2xl font-bold text-white mb-4">¿No encuentras lo que buscas?</h2>
                <p className="text-blue-100 mb-6">
                  Contactanos con nuestro equipo de soporte para obtener ayuda personalizada y resolver tus dudas.
                </p>
                <div className="inline-block bg-white px-6 py-3 rounded-lg font-medium text-blue-600 shadow-md hover:bg-blue-50 transition-colors">
                  800-123-4567
                </div>
              </div>
              <div className="md:w-1/3 bg-blue-400 flex items-center justify-center p-6">
                <PhoneIcon className="w-32 h-32 text-white " />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Help;