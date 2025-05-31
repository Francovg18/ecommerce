import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { MenuIcon, XIcon, CheckIcon, UserCircleIcon, LocationMarkerIcon, PhoneIcon } from '@heroicons/react/outline';
import { Oval } from 'react-loader-spinner';
import { list_orders } from '../../../redux/actions/orders';
import { get_items, get_total, get_item_total } from "../../../redux/actions/cart";
import { update_user_profile } from '../../../redux/actions/profile';
import { cities } from '../../../helpers/fixedCities';
import DashboardLink from '../../../components/dashboard/DashboardLink';

const DashboardProfile = ({
  list_orders,
  get_items,
  get_total,
  get_item_total,
  update_user_profile,
  isAuthenticated,
  profile
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    get_items();
    get_total();
    get_item_total();
    list_orders();
  }, [get_items, get_total, get_item_total, list_orders]);

  const [formData, setFormData] = useState({
    address_line_1: '',
    address_line_2: '',
    city: '',
    state_province_region: '',
    age: '',
    phone: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        address_line_1: profile.address_line_1 || '',
        address_line_2: profile.address_line_2 || '',
        city: profile.city || '',
        state_province_region: profile.state_province_region || '',
        age: profile.age || '',
        phone: profile.phone || '',
      });
    }
  }, [profile]);

  const { address_line_1, address_line_2, city, state_province_region, age, phone } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await update_user_profile(address_line_1, address_line_2, city, state_province_region, age, phone);
    setLoading(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);
  };

  if (!isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      {/* Para móviles */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex flex-col w-72 max-w-xs bg-white shadow-xl rounded-r-xl overflow-hidden">
            <div className="p-5 bg-gradient-to-r from-midnight-blue to-purple-night">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Mi Cuenta</h2>
                <button className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition" onClick={() => setSidebarOpen(false)}>
                  <XIcon className="h-5 w-5 text-white" />
                </button>
              </div>
            </div>
            <nav className="mt-5 p-4 space-y-3">
              <DashboardLink />
            </nav>
          </div>
        </div>
      )}

      {/* Para escritorio */}
      <aside className="hidden md:flex md:w-72 md:flex-col bg-white border-r border-gray-200 shadow-lg fixed h-full">
        <div className="p-5 bg-gradient-to-r from-midnight-blue to-purple-night">
          <h2 className="text-xl font-bold text-white">Mi Cuenta</h2>
        </div>
        <div className="p-4">
          <Link to="/" className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-midnight-blue bg-indigo-100 border border-transparent rounded-md hover:bg-indigo-200 transition">
            Regresar a Inicio
          </Link>
        </div>
        <nav className="mt-2 p-4 space-y-2">
          <DashboardLink />
        </nav>
      </aside>

      <main className="flex-1 md:ml-72">
        <div className="sticky top-0 z-10 bg-white shadow-md">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center md:hidden">
                <button 
                  className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  onClick={() => setSidebarOpen(true)}
                >
                  <MenuIcon className="h-6 w-6" />
                </button>
              </div>
              <div className="flex items-center">
                <h1 className="text-2xl font-semibold text-gray-800">Perfil de Usuario</h1>
              </div>
              <div className="flex items-center">
                <UserCircleIcon className="h-8 w-8 text-midnight-blue" />
              </div>
            </div>
          </div>
        </div>

        {/* Contenido del formulario */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-midnight-blue to-purple-night">
              <h2 className="text-lg font-bold text-white">Información Personal</h2>
              <p className="text-indigo-100 text-sm">Actualiza tus datos de contacto y dirección</p>
            </div>
            
            <form onSubmit={onSubmit} className="p-6">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Dirección Principal</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <LocationMarkerIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="address_line_1"
                      value={address_line_1}
                      onChange={onChange}
                      className="pl-10 block w-full py-3 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Av. Principal 123"
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Dirección Secundaria</label>
                  <input
                    type="text"
                    name="address_line_2"
                    value={address_line_2}
                    onChange={onChange}
                    className="mt-1 block w-full py-3 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Direccion secundaria"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Ciudad</label>
                  <select
                    name="city"
                    value={city}
                    onChange={onChange}
                    className="mt-1 block w-full py-3 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">{profile?.city || "Seleccionar ciudad"}</option>

                    {cities.map((cityOption, index) => (
                      <option key={index} value={cityOption.name}>{cityOption.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Provincia</label>
                  <input
                    type="text"
                    name="state_province_region"
                    value={state_province_region}
                    onChange={onChange}
                    className="mt-1 block w-full py-3 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Edad</label>
                  <input
                    type="number"
                    name="age"
                    value={age}
                    onChange={onChange}
                    className="mt-1 block w-full py-3 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Celular</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="phone"
                      value={phone}
                      onChange={onChange}
                      className="pl-10 block w-full py-3 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="79876543"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                {loading ? (
                  <button 
                    disabled
                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-midnight-blue cursor-not-allowed"
                  >
                    <Oval width={24} height={24} color="#fff" secondaryColor="#ccc" />
                    <span className="ml-2">Guardando...</span>
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={`w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white transition-all ${
                      success 
                        ? "bg-deep-rose hover:bg-royal-purple" 
                        : "bg-gradient-to-r from-midnight-blue to-purple-night hover:from-purple-night hover:to-midnight-blue"
                    }`}
                  >
                    {success ? (
                      <>
                        <CheckIcon className="h-5 w-5 text-white" />
                        <span className="ml-2">¡Información Actualizada!</span>
                      </>
                    ) : (
                      <span>Guardar Cambios</span>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  profile: state.Profile.profile,
});

export default connect(mapStateToProps, {
  list_orders,
  get_items,
  get_total,
  get_item_total,
  update_user_profile
})(DashboardProfile);