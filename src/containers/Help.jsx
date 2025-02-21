import React from "react";
import Layout from "../hocs/Layout";
import { QuestionMarkCircleIcon, ChatAltIcon, PhoneIcon, MailIcon } from "@heroicons/react/solid";

function Help() {
  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen py-16 px-6 sm:px-12 lg:px-20">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-gray-900 animate-fade-in">
            ¿Necesitas ayuda?
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Encuentra respuestas a las preguntas más frecuentes o contáctanos para recibir asistencia personalizada.
          </p>
        </div>

        {/* Sección de Preguntas Frecuentes */}
        <div className="mt-12 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Preguntas Frecuentes</h2>
          <div className="space-y-6">
            {[
              { question: "¿Cómo realizo un pedido?", answer: "Agrega productos al carrito y sigue el proceso de pago." },
              { question: "¿Cuáles son los métodos de pago?", answer: "Aceptamos tarjetas de crédito/débito y pagos en línea." },
              { question: "¿Cuánto tarda en llegar mi pedido?", answer: "El tiempo de entrega varía según la ciudad y la disponibilidad." },
              { question: "¿Puedo devolver un producto?", answer: "Sí, dentro de los primeros 7 días hábiles, con el comprobante de compra." },
            ].map(({ question, answer }, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center">
                  <QuestionMarkCircleIcon className="w-6 h-6 text-red-500 mr-2" />
                  <h3 className="text-lg font-semibold">{question}</h3>
                </div>
                <p className="text-gray-600 mt-2">{answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contacto y Soporte */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <ChatAltIcon className="w-16 h-16 text-red-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Soporte en Línea</h3>
            <p className="text-gray-600 mt-2">Atención en tiempo real a través de nuestro chat en vivo.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <PhoneIcon className="w-16 h-16 text-red-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Llámanos</h3>
            <p className="text-gray-600 mt-2">Comunícate con nuestro equipo de asistencia al 800-123-456.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <MailIcon className="w-16 h-16 text-red-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4">Escríbenos</h3>
            <p className="text-gray-600 mt-2">Envía un correo a soporte@silicom.com y responderemos a la brevedad.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Help;
