import { connect } from 'react-redux';
import { useEffect, useState, Fragment } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { XIcon } from '@heroicons/react/outline';
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
    <div className="flex">
      {/* Sidebar para móviles */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex flex-col max-w-xs w-full bg-white pt-5 pb-4">
            <button className="absolute top-0 right-0 mt-2 mr-2 p-2 rounded-full focus:outline-none" onClick={() => setSidebarOpen(false)}>
              <XIcon className="h-6 w-6 text-gray-600" aria-hidden="true" />
            </button>
            <nav className="mt-5 px-2 space-y-1">
              <DashboardLink />
            </nav>
          </div>
        </div>
      )}

      {/* Sidebar para escritorio */}
      <aside className="hidden md:flex md:w-64 md:flex-col border-r border-gray-200 bg-white">
        <div className="flex items-center px-4 pt-5">
          <Link to="/" className="px-2.5 py-1.5 border shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
            Regresar
          </Link>
        </div>
        <nav className="mt-5 flex-grow px-2 space-y-1">
          <DashboardLink />
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 md:pl-64 p-6">
        <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900">Información de la persona</h3>
          <p className="text-sm text-gray-500">Datos personales y solicitud.</p>
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
