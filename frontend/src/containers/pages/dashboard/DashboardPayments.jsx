import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/es";
import {
  list_orders,
  get_items,
  get_total,
  get_item_total,
} from "../../../redux/actions/orders";
import DashboardLink from "../../../components/dashboard/DashboardLink";
import { XIcon, MenuIcon, CreditCardIcon, TruckIcon, DocumentTextIcon } from "@heroicons/react/outline";

moment.locale("es");

const PanelPagos = ({
  list_orders,
  get_items,
  get_total,
  get_item_total,
  orders,
  isAuthenticated,
  user
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    get_items();
    get_total();
    get_item_total();
    list_orders();
  }, [get_item_total, get_items, get_total, list_orders]);

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
                <h1 className="text-2xl font-semibold text-gray-800">Historial de Pedidos</h1>
              </div>
              <div className="flex items-center">
                <CreditCardIcon className="h-8 w-8 text-midnight-blue" />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto sm:px-6 lg:px-8 py-8 max-w-4xl">
          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="px-6 py-4 bg-gradient-to-r from-midnight-blue to-purple-night">
                <h2 className="text-lg font-bold text-white">Sin Pedidos</h2>
              </div>
              <div className="p-6 text-center">
                <p className="text-gray-500 mb-4">No tienes órdenes registradas.</p>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-midnight-blue to-purple-night hover:from-indigo-700 hover:to-blue-600 transition"
                >
                  Explorar productos
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((pedido) => (
                <div key={pedido.id} className="bg-white rounded-xl shadow-xl overflow-hidden mb-16 mt-5">
                  <div className="px-6 py-4 bg-gradient-to-r from-midnight-blue to-purple-night">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="text-lg font-bold text-white">Pedido #{pedido.transaction_id.slice(-6)}</h2>
                        <p className="text-indigo-100 text-sm">
                          <time dateTime={pedido.date_issued}>
                            {moment(pedido.date_issued).format('LL')} • {moment(pedido.date_issued).fromNow()}
                          </time>
                        </p>
                      </div>
                      <span className="px-3 py-1 text-xs font-semibold text-indigo-800 bg-indigo-100 rounded-full">
                        {pedido.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 ">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      <div className="md:col-span-7">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          <Link to={`/product/${pedido.id}`} className="hover:text-midnight-blue transition">
                            {pedido.name}
                          </Link>
                        </h3>
                        <p className="text-gray-600 mb-4">{pedido.description}</p>
                        
                        <div className="flex items-center text-sm text-gray-500 mb-4">
                          <DocumentTextIcon className="h-5 w-5 text-indigo-500 mr-2" />
                          <div>
                            ID de Transacción: <span className="font-medium">{pedido.transaction_id}</span>
                          </div>
                        </div>
                        
                        <Link
                          to={`/dashboard/payment/${pedido.transaction_id}`}
                          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-midnight-blue to-purple-night hover:from-purple-night hover:to-midnight-blue transition"
                        >
                          Ver factura completa
                        </Link>
                      </div>
                      
                      <div className="md:col-span-5 bg-indigo-50 p-4 rounded-lg">
                        <div className="mb-4">
                          <div className="flex items-center mb-2">
                            <TruckIcon className="h-5 w-5 text-indigo-500 mr-2" />
                            <h4 className="font-medium text-gray-900">Dirección de Envío</h4>
                          </div>
                          <div className="ml-7 text-gray-600">
                            <p className="text-sm">{pedido.address_line_1}</p>
                            {pedido.address_line_2 && <p className="text-sm">{pedido.address_line_2}</p>}
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center mb-2">
                            <CreditCardIcon className="h-5 w-5 text-indigo-500 mr-2" />
                            <h4 className="font-medium text-gray-900">Detalles del Pago</h4>
                          </div>
                          <div className="ml-7 text-gray-600 space-y-1">
                            <p className="text-sm flex justify-between">
                              <span>Subtotal:</span>
                              <span className="font-medium">{(pedido.amount).toFixed(2)} Bs</span>
                            </p>
                            <p className="text-sm flex justify-between">
                              <span>Costo Envio:</span>
                              <span className="font-medium">{(pedido.shipping_price).toFixed(2)} Bs</span>
                            </p>
                            <div className="border-t border-gray-200 my-2 pt-2">
                              <p className="text-sm flex justify-between font-bold text-gray-900">
                                <span>Total:</span>
                                <span>{pedido.amount} Bs</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.Orders.orders,
  user: state.Auth.user,
  isAuthenticated: state.Auth.isAuthenticated
});

export default connect(mapStateToProps, {
  list_orders,
  get_items,
  get_total,
  get_item_total,
})(PanelPagos);