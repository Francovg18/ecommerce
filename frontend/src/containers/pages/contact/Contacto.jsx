import { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import FullWidthLayout from "../../../hocs/Layout";

const ContactIcons = {
  Mail: () => (
    <svg className="h-8 w-8 text-white group-hover:animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Phone: () => (
    <svg className="h-8 w-8 text-white group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  Location: () => (
    <svg className="h-8 w-8 text-white transition-transform duration-300 transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
};

function Contacto() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: '',
    city: '',
  });

  const { name, email, subject, message, phone, city } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const onSubmit = e => {
    e.preventDefault();

    if (!agreed) {
      toast.error("Debes aceptar los términos y condiciones de privacidad.");
      return;
    }

    setLoading(true);

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    formData.append('phone', phone);
    formData.append('city', city);

    axios.post(`${process.env.REACT_APP_API_URL}/api/contacts/`, formData, config)
      .then(res => {
        setLoading(false);
        toast.success("Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.");
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          phone: '',
          city: '',
        });
        setAgreed(false);
        setActiveStep(1);
      })
      .catch(err => {
        setLoading(false);
        toast.error("Error al enviar el mensaje.");
      });
  };

  const isStep1Valid = name && email && phone;
  const isStep2Valid = subject && city && message;

  return (
    <FullWidthLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold bg-gray-800 text-transparent bg-clip-text">
              ¡Contactanos!
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
               ¿Tienes alguna duda o inquietud sobre nuestros productos? Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo.
            </p>
          </div>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mx-auto max-w-4xl">
            <div className="bg-gradient-to-r from-midnight-blue to-purple-night p-6">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <div className={`rounded-full h-10 w-10 flex items-center justify-center ${activeStep >= 1 ? 'bg-white text-midnight-blue' : 'bg-indigo-400 text-white'} font-bold`}>
                    1
                  </div>
                  <div className="ml-3 text-white font-medium">Tus Datos</div>
                </div>
                <div className="flex-1 flex items-center mx-4">
                  <div className={`h-1 flex-1 ${activeStep >= 2 ? 'bg-white' : 'bg-indigo-300'}`}></div>
                </div>
                <div className="flex items-center">
                  <div className={`rounded-full h-10 w-10 flex items-center justify-center ${activeStep >= 2 ? 'bg-white text-purple-600' : 'bg-indigo-400 text-white'} font-bold`}>
                    2
                  </div>
                  <div className="ml-3 text-white font-medium">Tu Mensaje</div>
                </div>
                <div className="flex-1 flex items-center mx-4">
                  <div className={`h-1 flex-1 ${activeStep >= 3 ? 'bg-white' : 'bg-indigo-300'}`}></div>
                </div>
                <div className="flex items-center">
                  <div className={`rounded-full h-10 w-10 flex items-center justify-center ${activeStep >= 3 ? 'bg-white text-purple-600' : 'bg-indigo-400 text-white'} font-bold`}>
                    3
                  </div>
                  <div className="ml-3 text-white font-medium">Confirmar</div>
                </div>
              </div>
            </div>

            <form onSubmit={e => onSubmit(e)}>
              <div className="p-8">
                {activeStep === 1 && (
                  <div className="space-y-6 opacity-100 transition-opacity duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Datos Personales</h2>
                    
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        value={name}
                        name="name"
                        onChange={e => onChange(e)}
                        required
                        className="peer h-14 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-midnight-blue"
                        placeholder="Nombre completo"
                      />
                      <label htmlFor="name" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                        Nombre completo
                      </label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          onChange={e => onChange(e)}
                          value={email}
                          required
                          className="peer h-14 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-midnight-blue"
                          placeholder="Correo electrónico"
                        />
                        <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                          Correo electrónico
                        </label>
                      </div>
                      
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          onChange={e => onChange(e)}
                          value={phone}
                          autoComplete="tel"
                          required
                          className="peer h-14 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-midnight-blue"
                          placeholder="Teléfono"
                        />
                        <label htmlFor="phone" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                          Teléfono
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {activeStep === 2 && (
                  <div className="space-y-6 opacity-100 transition-opacity duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">¿En qué podemos ayudarte?</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <input
                          type="text"
                          id="subject"
                          value={subject}
                          name="subject"
                          onChange={e => onChange(e)}
                          required
                          className="peer h-14 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-midnight-blue"
                          placeholder="Asunto"
                        />
                        <label htmlFor="subject" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">
                          Asunto
                        </label>
                      </div>
                      
                      <div className="relative">
                        <select
                          id="city"
                          name="city"
                          onChange={e => onChange(e)}
                          value={city}
                          required
                          className="peer h-14 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-midnight-blue bg-transparent"
                        >
                          <option value="" disabled>Selecciona tu ciudad</option>
                          <option value="La Paz">La Paz</option>
                          <option value="Santa Cruz">Santa Cruz</option>
                          <option value="Cochabamba">Cochabamba</option>
                          <option value="Oruro">Oruro</option>
                          <option value="Potosí">Potosí</option>
                          <option value="Chuquisaca">Sucre</option>
                          <option value="Tarija">Tarija</option>
                          <option value="Beni">Trinidad</option>
                          <option value="Pando">Cobija</option>
                        </select>
                        <label htmlFor="city" className="absolute left-0 -top-3.5 text-gray-600 text-sm">
                          Ciudad
                        </label>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <textarea
                        id="message"
                        name="message"
                        value={message}
                        onChange={e => onChange(e)}
                        rows={5}
                        required
                        className="peer w-full border-2 border-gray-300 rounded-lg p-4 text-gray-900 placeholder-transparent focus:outline-none focus:border-midnight-blue resize-none"
                        placeholder="Mensaje"
                      />
                      <label htmlFor="message" className="absolute left-2 -top-3 text-gray-600 text-sm transition-all bg-white px-2">
                        Mensaje
                      </label>
                    </div>
                  </div>
                )}

                {activeStep === 3 && (
                  <div className="space-y-6 opacity-100 transition-opacity duration-300">
                    <h2 className="text-2xl font-bold text-gray-800 text-center">Revisar y Enviar</h2>
                    
                    <div className="bg-indigo-50 rounded-lg p-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500">Nombre</h3>
                          <p className="text-gray-800">{name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500">Email</h3>
                          <p className="text-gray-800">{email}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500">Teléfono</h3>
                          <p className="text-gray-800">{phone}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-semibold text-gray-500">Ciudad</h3>
                          <p className="text-gray-800">{city}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500">Asunto</h3>
                        <p className="text-gray-800">{subject}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500">Mensaje</h3>
                        <p className="text-gray-800">{message}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id="privacy"
                        checked={agreed}
                        onChange={() => setAgreed(!agreed)}
                        className="h-5 w-5 text-midnight-blue border-gray-300 rounded focus:ring-crimson-red mt-1"
                      />
                      <label htmlFor="privacy" className="text-sm text-gray-500">
                        Al seleccionar esto, aceptas nuestras{' '}
                        <Link to="/privacidad" className="font-medium text-midnight-blue hover:text-crimson-red">
                          Políticas de Privacidad
                        </Link> y{' '}
                        <Link to="/terminos" className="font-medium text-midnight-blue hover:text-crimson-red">
                          Términos de Uso
                        </Link>.
                      </label>
                    </div>
                  </div>
                )}
              </div>

              <div className="px-8 py-6 bg-gray-50 flex justify-between">
                {activeStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crimson-red"
                  >
                    Anterior
                  </button>
                ) : (
                  <div></div>
                )}

                {activeStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={activeStep === 1 ? !isStep1Valid : !isStep2Valid}
                    className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                      (activeStep === 1 && isStep1Valid) || (activeStep === 2 && isStep2Valid)
                        ? 'bg-midnight-blue hover:bg-purple-night'
                        : 'bg-indigo-300 cursor-not-allowed'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crimson-red`}
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading || !agreed}
                    className={`inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${
                      loading || !agreed
                        ? 'bg-indigo-300 cursor-not-allowed'
                        : 'bg-midnight-blue hover:bg-purple-night'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crimson-red`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      'Enviar Mensaje'
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 mt-24">
            <div className="group bg-gradient-to-br from-midnight-blue to-blue-600 rounded-2xl shadow-xl p-6 m-10 transform transition duration-300 hover:scale-105 hover:rotate-1">
              <div className="flex flex-col items-center text-center text-white space-y-4">
                <div className="bg-white/20 p-4 rounded-full">
                  <ContactIcons.Location />
                </div>
                <h3 className="text-xl font-bold">Visítanos</h3>
                <p>Silicom</p>
                <p>Ubicación calle 123</p>
              </div>
            </div>

            <div className="m-10 group bg-gradient-to-br from-midnight-blue to-blue-700 rounded-2xl shadow-xl p-6 transform transition duration-300 hover:scale-105 md:translate-y-4 hover:-rotate-1">
              <div className="flex flex-col items-center text-center text-white space-y-4">
                <div className="bg-white/20 p-4 rounded-full">
                  <ContactIcons.Phone />
                </div>
                <h3 className="text-xl font-bold">Llámanos</h3>
                <p>76543210</p>
                <div className="mt-2">
                  <p>Lun-Vie: 9AM - 6PM</p>
                  <p>Sáb: 9AM - 1PM</p>
                  <p>Dom: Cerrado</p>
                </div>
              </div>
            </div>

            <div className="m-10 group bg-gradient-to-br from-blue-600 to-cyan-700 rounded-2xl shadow-xl p-6 transform transition duration-300 hover:scale-105 hover:rotate-1">
              <div className="flex flex-col items-center text-center text-white space-y-4">
                <div className="bg-white/20 p-4 rounded-full">
                  <ContactIcons.Mail />
                </div>
                <h3 className="text-xl font-bold">Escríbenos</h3>
                <p>soporte@tienda.com</p>
                <p className="text-sm">
                  Respondemos en menos de 24 horas en días laborables
                </p>
              </div>
            </div>
          </div>

          

        </div>
      </div>
    </FullWidthLayout>
  );
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(Contacto);