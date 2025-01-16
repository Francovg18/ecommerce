import Layout from '../../hocs/Layout'
import { useState, useEffect } from 'react'
import LogoMini from '../../assets/img/logoMini.jpg'
import {connect} from 'react-redux'
import { signup } from '../../redux/actions/auth'

const Signup = ({
  signup
}) => {

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  const [accountCreated, setAccountCreated] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    re_password: ''
  })

  const { 
    first_name,
    last_name,
    email,
    password,
    re_password
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e =>{
    e.preventDefault();
    signup(first_name, last_name, email, password, re_password);
    setAccountCreated(true);
    window.scrollTo(0,0)
  }

  return (
    <Layout>
      <div className="min-h-full flex justify-center py-12 sm:px-6 lg:px-8">
        <div className="flex bg-white shadow-lg border border-gray-300 sm:rounded-lg w-full max-w-2xl">
          {/* Borde degradado a la izquierda */}
          <div className="w-[23%] bg-gradient-to-r from-degradado-1 via-degradado-2 via-degradado-3 via-degradado-4 to-degradado-5 rounded-l-lg rounded-tr-[18px] rounded-br-[18px]"></div>

          <div className="sm:mx-auto sm:w-full sm:max-w-md px-10 py-8">

            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Registrarse</h2>

            <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="py-8 px-1">
                <form onSubmit={e => onSubmit(e)} className="space-y-6">
                  <div>
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                      Nombre
                    </label>
                    <div className="mt-1">
                      <input
                        name="first_name"
                        value={first_name}
                        onChange={e => onChange(e)}
                        type="text"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                      Apellido
                    </label>
                    <div className="mt-1">
                      <input
                        name="last_name"
                        value={last_name}
                        onChange={e => onChange(e)}
                        type="text"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Correo
                    </label>
                    <div className="mt-1">
                      <input
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        type="email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Contraseña
                    </label>
                    <div className="mt-1">
                      <input
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        type="password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Confirmar contraseña
                    </label>
                    <div className="mt-1">
                      <input
                        name="re_password"
                        value={re_password}
                        onChange={e => onChange(e)}
                        type="password"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-degradado-5 hover:bg-blue-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Registrarse
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps, { signup })(Signup)
