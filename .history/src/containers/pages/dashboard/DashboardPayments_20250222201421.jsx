import { connect } from 'react-redux';
import { list_orders } from '../../../redux/actions/orders';
import { get_items, get_total, get_item_total } from '../../../redux/actions/cart';
import { useEffect, useState, Fragment } from 'react';
import { Navigate } from 'react-router';
import DashboardLink from '../../../components/dashboard/DashboardLink';
import { XIcon, MenuAlt2Icon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import moment from 'moment';

const DashboardPayments = ({ list_orders, get_items, get_total, get_item_total, orders, isAuthenticated }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    get_items();
    get_total();
    get_item_total();
    list_orders();
  }, [get_items, get_total, get_item_total, list_orders]);

  if (!isAuthenticated) return <Navigate to="/" />;

  return (
    <>
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

      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 border-r border-gray-200 bg-white overflow-y-auto">
        <div className="p-5">
          <Link to="/" className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
            Regresar
          </Link>
        </div>
        <nav className="mt-5 px-2 pb-4 space-y-1">
          <DashboardLink />
        </nav>
      </div>

      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button className="md:hidden p-2 text-gray-600" onClick={() => setSidebarOpen(true)}>
              <MenuAlt2Icon className="h-6 w-6" />
            </button>
            <div className="max-w-3xl mx-auto bg-white py-16 sm:px-6 sm:py-24 lg:px-1 space-y-12">
              {orders.map((product) => (
                <Fragment key={product.id}>
                  <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Detalles de la Orden</h1>
                    <div className="text-sm border-b border-gray-200 mt-2 pb-5 sm:flex sm:justify-between">
                      <dl className="flex">
                        <dt className="text-gray-500">ID de la Transacción: &nbsp;</dt>
                        <dd className="font-medium text-gray-900">{product.transaction_id}</dd>
                        <dt>
                          <span className="sr-only">Fecha</span>
                          <span className="text-gray-400 mx-2" aria-hidden="true">·</span>
                        </dt>
                        <dd className="font-medium text-gray-900">
                          <time dateTime={product.date_issued}>{moment(product.date_issued).fromNow()}</time>
                        </dd>
                      </dl>
                      <Link to={`/dashboard/payment/${product.transaction_id}`} className="font-medium text-indigo-600 hover:text-indigo-500">
                        Ver factura <span aria-hidden="true"> &rarr;</span>
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8 mt-6">
                      <div className="sm:col-span-7">
                        <h3 className="text-lg font-medium text-gray-900">
                          <Link to={`/product/${product.id}`} className="hover:text-indigo-600">{product.name}</Link>
                        </h3>
                        <p className="font-medium text-gray-900 mt-1">ID de la transacción: {product.transaction_id}</p>
                        <p className="text-gray-500 mt-3">{product.description}</p>
                      </div>
                      <div className="sm:col-span-12 md:col-span-7">
                        <dl className="grid grid-cols-1 gap-y-8 border-b py-8 border-gray-200 sm:grid-cols-2 sm:gap-x-6">
                          <div>
                            <dt className="font-medium text-gray-900">Dirección de entrega</dt>
                            <dd className="mt-3 text-gray-500">
                              <span className="block">{product.address_line_1}</span>
                              <span className="block">{product.address_line_2}</span>
                            </dd>
                          </div>
                          <div>
                            <dt className="font-medium text-gray-900">Envío</dt>
                            <dd className="mt-3 text-gray-500 space-y-3">
                              <p>{product.shipping_price} Bs</p>
                              <p>{product.amount} Costo Total</p>
                            </dd>
                          </div>
                        </dl>
                        <p className="font-medium text-gray-900 mt-6">Estado: {product.status}</p>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  orders: state.Orders.orders,
  isAuthenticated: state.Auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  list_orders,
  get_items,
  get_total,
  get_item_total
})(DashboardPayments);
