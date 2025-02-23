import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { MenuAlt2Icon, XIcon, EmojiHappyIcon } from '@heroicons/react/outline';
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
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar para móviles */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex flex-col w-64 bg-white shadow-lg p-5">
            <button className="absolute top-2 right-2 p-2" onClick={() => setSidebarOpen(false)}>
              <XIcon className="h-6 w-6 text-gray-600" />
            </button>
            <nav className="mt-5 space-y-2">
              <DashboardLink />
            </nav>
          </div>
        </div>
      )}

      {/* Sidebar para escritorio */}
      <aside className="hidden md:flex md:w-64 md:flex-col border-r border-gray-200 bg-white p-5 fixed h-full">
        <Link to="/" className="inline-flex items-center px-3 py-2 text-gray-700 bg-white border rounded-md hover:bg-gray-50">
          Regresar
        </Link>
        <nav className="mt-5 space-y-2">
          <DashboardLink />
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col md:ml-64 items-center justify-center p-6 w-full max-w-5xl mx-auto">
        <div className="sticky top-0 z-10 flex items-center justify-between bg-white shadow-md p-4 w-full max-w-7xl mx-auto">
          
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <EmojiHappyIcon className="h-6 w-6 text-gray-600" />
          </div>
        </div>

        {/* Contenido de usuario */}
        <div className="flex-1 p-6 w-full max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 text-center">Información de la persona</h3>
            <p className="text-sm text-gray-500 text-center">Datos personales y solicitud.</p>
            <div className="mt-5 border-t border-gray-200 pt-4">
              <dl className="divide-y divide-gray-200">
                <div className="py-4 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Nombre Completo</dt>
                  <dd className="col-span-2 text-sm text-gray-900">{user.first_name} {user.last_name}</dd>
                </div>
                <div className="py-4 grid grid-cols-3 gap-4">
                  <dt className="text-sm font-medium text-gray-500">Correo</dt>
                  <dd className="col-span-2 text-sm text-gray-900">{user.email}</dd>
                </div>
              </dl>
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
