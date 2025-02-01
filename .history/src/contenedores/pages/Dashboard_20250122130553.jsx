import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { list_orders } from '../../redux/actions/orders';
import { get_items, get_total, get_item_total } from '../../redux/actions/cart';
import { Navigate } from 'react-router-dom';
import DashboardLink from '../../componentes/dashboard/DashboardLink';
import {
  BellIcon,
  MenuIcon,
  XIcon,
  SearchIcon
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' }
];

function Dashboard({
  list_orders,
  get_items,
  get_total,
  get_item_total,
  orders,
  isAuthenticated,
  user
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    get_items();
    get_total();
    get_item_total();
    list_orders();
  }, [get_items, get_total, get_item_total, list_orders]);

  if (!isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <Transition show={sidebarOpen} as={Fragment}>
        <div className="fixed inset-0 flex z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="absolute top-0 right-0 p-2">
              <button
                className="text-gray-400 hover:text-gray-500"
                onClick={() => setSidebarOpen(false)}
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-shrink-0 px-4 py-5">
              <Link to="/">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                  alt="Workflow"
                />
              </Link>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              <DashboardLink />
            </nav>
          </div>
        </div>
      </Transition>

      {/* Static Sidebar for Desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-white border-r border-gray-200">
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex-shrink-0 px-4">
            <Link to="/">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                alt="Workflow"
              />
            </Link>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            <DashboardLink />
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 md:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-10 flex-shrink-0 h-16 bg-white shadow flex items-center px-4">
          <button
            className="md:hidden text-gray-500 focus:outline-none"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon className="h-6 w-6" />
          </button>
          <div className="flex-1 flex justify-between items-center">
            <form className="w-full max-w-lg flex" action="#">
              <div className="relative flex items-center w-full">
                <SearchIcon className="absolute left-3 h-5 w-5 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </form>
            <div className="ml-4 flex items-center">
              <button className="p-1 rounded-full text-gray-400 hover:text-gray-500">
                <BellIcon className="h-6 w-6" />
              </button>
              <div className="ml-3 relative">
                <button className="max-w-xs bg-white flex items-center text-sm rounded-full">
                  <img
                    className="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    alt="User"
                  />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Section */}
        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white shadow rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900">Información de la Persona</h3>
                <p className="mt-1 text-sm text-gray-500">Datos personales y solicitud.</p>
                <div className="mt-5 border-t border-gray-200 pt-5">
                  <dl>
                    <div className="sm:flex sm:justify-between py-4">
                      <dt className="text-sm font-medium text-gray-500">Nombre Completo</dt>
                      <dd className="text-sm text-gray-900">{user.first_name} {user.last_name}</dd>
                    </div>
                    <div className="sm:flex sm:justify-between py-4">
                      <dt className="text-sm font-medium text-gray-500">Correo</dt>
                      <dd className="text-sm text-gray-900">{user.email}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  orders: state.Orders.orders,
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user
});

export default connect(mapStateToProps, {
  list_orders,
  get_items,
  get_total,
  get_item_total
})(Dashboard);
