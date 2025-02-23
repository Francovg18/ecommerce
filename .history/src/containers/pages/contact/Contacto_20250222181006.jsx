import FullWidthLayout from "../../../hocs/Layout"
import { connect } from "react-redux"
import axios from "axios"
import { MailIcon, PhoneIcon } from '@heroicons/react/outline'
import { useEffect, useState } from "react"
import { toast } from 'react-toastify'
import { Switch } from '@headlessui/react'
import { Link } from "react-router-dom"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Contacto() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [agreed, setAgreed] = useState(false)
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      subject: '',
      message: '',
      phone: '',
      budget: '',
    });

    const { name, email, subject, message, phone, budget } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
      e.preventDefault();

      if (agreed) {
        setLoading(true);

        const config = {
          headers: {
              'Content-Type': 'application/json'
          }
        };

        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('subject', subject)
        formData.append('message', message)
        formData.append('phone', phone)
        formData.append('budget', budget)

        const fetchData = async () => {
          axios.post(`${process.env.REACT_APP_API_URL}/api/contacts/`, formData, config)
          .then(res => {
            setLoading(false);
            toast.success("Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.")
          })
          .catch(err => {
            setLoading(false);
            toast.error("Error al enviar el mensaje.")
          })
        }

        fetchData()
      } else {
        toast.error("Debes aceptar los términos y condiciones de privacidad.")
      }
    }

    return (
        <FullWidthLayout>
            <div className="relative">
              <div className="absolute inset-0">
                <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50" />
              </div>
              <div className="relative max-w-7xl mx-auto lg:grid lg:grid-cols-5">
                <div className="py-16 px-4 sm:px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
                  <div className="max-w-lg mx-auto">
                    <h2 className="text-2xl font-gilroy-black tracking-tight text-gray-900 sm:text-3xl">¡Contáctanos!</h2>
                    <p className="mt-3 text-lg leading-6 text-gray-500">
                      ¿Tienes alguna duda o inquietud sobre nuestros productos? Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo.
                    </p>
                    <dl className="mt-8 text-base text-gray-500">
                      <div>
                        <dt className="sr-only">Dirección Postal</dt>
                        <dd>
                          <p>742 Evergreen Terrace</p>
                          <p>Springfield, OR 12345</p>
                        </dd>
                      </div>
                      <div className="mt-6">
                        <dt className="sr-only">Número de Teléfono</dt>
                        <dd className="flex">
                          <PhoneIcon className="flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                          <span className="ml-3">+1 (555) 123-4567</span>
                        </dd>
                      </div>
                      <div className="mt-3">
                        <dt className="sr-only">Correo Electrónico</dt>
                        <dd className="flex">
                          <MailIcon className="flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                          <span className="ml-3">soporte@tienda.com</span>
                        </dd>
                      </div>
                    </dl>
                    <p className="mt-6 text-base text-gray-500">
                      ¿Buscas oportunidades laborales?{' '}
                      <Link to="/empleos" className="font-gilroy-medium text-gray-700 underline">
                        Ver todas las vacantes
                      </Link>.
                    </p>
                  </div>
                </div>
                <div className="py-16 px-4 sm:px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
                  <div className="max-w-lg mx-auto lg:max-w-none">
                    <form onSubmit={e => onSubmit(e)} className="grid grid-cols-1 gap-y-6">
                      <div>
                        <label className="sr-only">Nombre Completo</label>
                        <input
                          type="text"
                          value={name}
                          name='name'
                          onChange={e => onChange(e)}
                          required
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                          placeholder="Nombre Completo"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="sr-only">Correo Electrónico</label>
                        <input
                          name="email"
                          type="email"
                          autoComplete="email"
                          onChange={e => onChange(e)}
                          value={email}
                          required
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                          placeholder="Correo Electrónico"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="sr-only">Teléfono</label>
                        <input
                          type="number"
                          name="phone"
                          id="phone"
                          onChange={e => onChange(e)}
                          value={phone}
                          autoComplete="tel"
                          required
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                          placeholder="Teléfono"
                        />
                      </div>
                      <div>
                        <label className="sr-only">Asunto</label>
                        <input
                          type="text"
                          value={subject}
                          name='subject'
                          onChange={e => onChange(e)}
                          required
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
                          placeholder="Asunto del Mensaje"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="sr-only">Mensaje</label>
                        <textarea
                          id="message"
                          name="message"
                          value={message}
                          onChange={e => onChange(e)}
                          rows={4}
                          className="block w-full shadow-sm py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border border-gray-300 rounded-md"
                          placeholder="Escribe tu mensaje aquí"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-gilroy-medium text-gray-700">Presupuesto (Opcional)</label>
                        <select
                          name="budget"
                          onChange={e => onChange(e)}
                          value={budget}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                          <option value="" disabled>Selecciona tu presupuesto</option>
                          <option value="0-5,000">$0 - $5,000</option>
                          <option value="5,000-10,000">$5,000 - $10,000</option>
                          <option value="10,000+">$10,000+</option>
                        </select>
                      </div>

                      <Switch
                        checked={agreed}
                        onChange={setAgreed}
                        className={classNames(
                          agreed ? 'bg-blue-600' : 'bg-gray-200',
                          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 dark:text-dark-txt border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                        )}
                      >
                        <span className="sr-only">Acepto los términos y políticas</span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            agreed ? 'translate-x-5' : 'translate-x-0',
                            'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                          )}
                        />
                      </Switch>
                      <div className="ml-3">
                        <p className="text-base text-gray-500">
                          Al seleccionar esto, aceptas nuestras{' '}
                          <Link to="/privacidad" className="font-medium text-blue-700 underline">
                            Políticas de Privacidad
                          </Link> y{' '}
                          <Link to="/terminos" className="font-medium text-blue-700 underline">
                            Términos de Uso
                          </Link>.
                        </p>
                      </div>

                      <div>
                        {loading ? (
                          <button
                            className="float-right inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-gilroy-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Enviando...
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="float-right inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-gilroy-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Enviar
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
        </FullWidthLayout>
    )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, {})(Contacto)
