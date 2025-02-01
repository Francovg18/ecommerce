import Layout from '../../hocs/Layout';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/auth';
import { Oval } from 'react-loader-spinner';
import { Navigate } from 'react-router';
const Login = ({
  login,
  loading
}) => {

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { 
    email,
    password,
  } = formData;

  const [activated, setActivated] = useState(false);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e =>{
    e.preventDefault();
    login(email, password);
    setActivated(true);
  }

  if (activated)
    return <Navigate to='/' />;

  return (
    <Layout>
      <div className="min-h-full flex justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex bg-white shadow-lg border border-gray-300 sm:rounded-lg w-full max-w-2xl">
        {/* Borde degradado a la izquierda */}
        <div className="w-[23%] bg-gradient-to-r from-crimson-red via-deep-rose via-dark-burgundy via-royal-purple to-midnight-blue rounded-l-lg rounded-tr-[18px] rounded-br-[18px]"></div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md px-7 py-8">
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Iniciar sesión</h2>
          <p className="mt-1 text-center text-sm text-gray-600">
            O{' '}
            <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
              registrate
            </Link>
          </p>

          <div className="mt-1 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="py-8 px-1">
              <form onSubmit={e => onSubmit(e)} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Correo electrónico
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
                    Contrasenia
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

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link to="/reset_password" className="font-medium text-indigo-600 hover:text-indigo-500">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                </div>

                <div>
                  {loading ? (
                    <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <Oval color="#fff" width={20} height={20} ariaLabel="loading" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-midnight-blue hover:bg-purple-night focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Acceder
                    </button>
                  )}
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
const mapStateToProps = state => ({
  loading: state.Auth.loading
})

export default connect(mapStateToProps, {
  login
}) (Login)