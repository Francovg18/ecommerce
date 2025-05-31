import { connect } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import moment from "moment";
import { get_order_detail } from '../../../redux/actions/orders';
import { get_items, get_total, get_item_total } from "../../../redux/actions/cart";
import DashboardLink from '../../../components/dashboard/DashboardLink';
import {
  XIcon,
  MenuIcon,
  CreditCardIcon,
  DocumentTextIcon
} from '@heroicons/react/outline';

/* function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
} */

const DashboardPaymentDetail = ({
  order,
  isAuthenticated,
  get_order_detail
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const params = useParams();
  const transaction_id = params.transaction_id;
  
  useEffect(() => {
    get_order_detail(transaction_id);
  }, [transaction_id, get_order_detail]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

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

      {/* Contenido principal */}
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
                <h1 className="text-2xl font-semibold text-gray-800">Detalle de Factura</h1>
              </div>
              <div className="flex items-center">
                <DocumentTextIcon className="h-8 w-8 text-midnight-blue" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto sm:px-6 lg:px-8 py-8 max-w-4xl">
          {!order ? (
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-midnight-blue to-purple-night">
                <h2 className="text-lg font-bold text-white">Cargando pedido...</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-500">Buscando información del pedido...</p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-midnight-blue to-purple-night">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-white">Detalles del Pedido #{order.transaction_id ? order.transaction_id.slice(-6) : 'N/A'}</h2>
                  <span className="px-3 py-1 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full">
                    {order.status || 'Procesando'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-sm border-b border-gray-200 pb-5 flex justify-between items-center">
                  <div className="flex items-center text-sm text-gray-500">
                    <DocumentTextIcon className="h-5 w-5 text-indigo-500 mr-2" />
                    <div>
                      ID de Transacción: <span className="font-medium">{order.transaction_id}</span>
                    </div>
                  </div>
                  <div className="font-medium text-gray-900">
                    {order.date_issued ? (
                      <time dateTime={order.date_issued}>
                        {moment(order.date_issued).format('LL')} • {moment(order.date_issued).fromNow()}
                      </time>
                    ) : (
                      <time dateTime={new Date()}>
                        {moment().format('LL')}
                      </time>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Productos Comprados</h2>
                  <div className="space-y-8">
                    {order.order_items && order.order_items.map((product) => (
                      <div
                        key={product.id}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
                      >
                        <div className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="md:col-span-7">
                              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              <p className="hover:text-midnight-blue transition">
                                  Producto:
                                </p>
                              </h3>
                              <Link to={`/product/${product?.id || product?.product_id}`} className="hover:text-midnight-blue transition">
                                  {product.name}
                                </Link>
                              <p className="text-gray-600 mb-4">{product.s}</p>
                              
                              <div className="flex items-center text-sm text-gray-500 mb-4">
                                <DocumentTextIcon className="h-5 w-5 text-indigo-500 mr-2" />
                                <div>
                                  ID de Transacción: <span className="font-medium">{order.transaction_id}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="md:col-span-5 bg-indigo-50 p-4 rounded-lg">
                              
                              <div>
                                <div className="flex items-center mb-2">
                                  <CreditCardIcon className="h-5 w-5 text-indigo-500 mr-2" />
                                  <h4 className="font-medium text-gray-900">Detalles del Producto</h4>
                                </div>
                                <div className="ml-7 text-gray-600 space-y-1">
                                  <p className="text-sm flex justify-between">
                                    <span>Precio total del producto:</span>
                                    <span className="font-medium">
                                        {product.price}
                                    </span>
                                  </p>
                                  <p className="text-sm flex justify-between">
                                    <span>Cantidad:</span>
                                    <span className="font-medium">
                                      {product.count}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = state => ({
  order: state.Orders.order,
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user
});

export default connect(mapStateToProps, {
  get_items,
  get_total,
  get_item_total,
  get_order_detail
})(DashboardPaymentDetail);