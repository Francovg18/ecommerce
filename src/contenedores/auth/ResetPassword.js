import Layout from '../../hocs/Layout';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../../redux/actions/auth';
// Cambia Loader por Oval
import { Oval } from 'react-loader-spinner';
import { Navigate } from 'react-router';

const ResetPassword = ({
  reset_password,
  loading
}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [requestSent, setRequestSent] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    reset_password(email);
    setRequestSent(true);
  };

  if (requestSent && !loading)
    return <Navigate to='/' />;

  return (
    <Layout>
      <div className="min-h-full flex justify-center py-12 sm:px-6 lg:px-8">
        <div className="flex bg-white shadow-lg border border-gray-300 sm:rounded-lg w-[45%] max-w-[80%]">
          {/* Borde degradado a la izquierda */}
          <div className="w-[20%] bg-gradient-to-r from-degradado-1 via-degradado-2 via-degradado-3 via-degradado-4 to-degradado-5 rounded-l-lg rounded-tr-[18px] rounded-br-[18px]"></div>

          <div className="w-[80%] sm:mx-auto sm:w-full sm:max-w-[70%] px-0 py-4">
            <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Recuperar contraseña</h2>

            <div className="mt-3 sm:mx-auto sm:w-full">
              <div className="py-8 px-3">
                <form onSubmit={e => onSubmit(e)} className="space-y-6">
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
                        placeholder="Email"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    {loading ? (
                      <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <Oval color="#fff" width={20} height={20} ariaLabel="loading" />
                      </button>
                    ) : (
                      <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-degradado-5 hover:bg-blue-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Enviar al correo
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

    
  );
};

const mapStateToProps = state => ({
  loading: state.Auth.loading
});

export default connect(mapStateToProps, {
  reset_password
})(ResetPassword);
