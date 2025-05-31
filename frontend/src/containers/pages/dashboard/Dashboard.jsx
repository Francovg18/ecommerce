import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { MenuIcon, XIcon, UserCircleIcon, EmojiHappyIcon } from '@heroicons/react/outline';
import DashboardLink from '../../../components/dashboard/DashboardLink';
import { list_orders } from '../../../redux/actions/orders';
import { get_items, get_total, get_item_total } from '../../../redux/actions/cart';

const Dashboard = ({ list_orders, get_items, get_total, get_item_total, orders, isAuthenticated, user }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    get_items();
    get_total();
    get_item_total();
    list_orders();
  }, [get_items, get_total, get_item_total, list_orders]);
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
                <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
              </div>
              <div className="flex items-center">
                <UserCircleIcon className="h-8 w-8 text-midnight-blue" />
              </div>
            </div>
          </div>
        </div>

        {/* Contenido del usuario */}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="px-6 py-4 bg-gradient-to-r from-midnight-blue to-purple-night">
              <h2 className="text-lg font-bold text-white">Información Personal</h2>
              <p className="text-indigo-100 text-sm">Datos del usuario y cuenta</p>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-100">
                  <div className="flex items-center space-x-3 mb-4">
                    <EmojiHappyIcon className="h-6 w-6 text-midnight-blue" />
                    <h3 className="text-lg font-medium text-indigo-800">Datos Personales</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Nombre Completo</p>
                      <p className="mt-1 text-base font-semibold text-gray-900">{user.first_name} {user.last_name}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Correo Electrónico</p>
                      <p className="mt-1 text-base font-semibold text-gray-900">{user.email}</p>
                      <p className="text-sm font-medium text-gray-500 mt-4">Tipo de Usuario:</p>
                      <p className="mt-1 text-base font-semibold text-gray-900">{user.get_mayorista_tipo_display}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-100">
                  <h3 className="text-lg font-medium text-indigo-800 mb-4">Resumen de Actividad</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-gray-500">Órdenes Totales</p>
                      <p className="mt-1 text-2xl font-bold text-midnight-blue">{orders ? orders.length : 0}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-gray-500">Última Orden</p>
                      <p className="mt-1 text-lg font-semibold text-gray-700">
                        {orders && orders.length > 0 ? 
                          new Date(orders[0].date_issued).toLocaleDateString() : 
                          'N/A'}
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <p className="text-sm font-medium text-gray-500">Estado de Cuenta</p>
                      <p className="mt-1 text-lg font-semibold text-green-600">Activo</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link 
                    to="/dashboard/profile" 
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-midnight-blue to-purple-night hover:from-purple-night hover:to-midnight-blue transition"
                  >
                    Editar Perfil
                  </Link>
                  <Link 
                    to="/dashboard/payments" 
                    className="inline-flex items-center justify-center px-6 py-3 border border-indigo-200 rounded-lg shadow-sm text-base font-medium text-midnight-blue bg-white hover:bg-indigo-50 transition"
                  >
                    Ver Mis Órdenes
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.Orders.orders,
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
});

export default connect(mapStateToProps, { list_orders, get_items, get_total, get_item_total })(Dashboard);