import { connect } from 'react-redux'
import { list_orders } from '../../../redux/actions/orders'
import { get_items, get_total, get_item_total } from "../../../redux/actions/cart";
import { useEffect, useState, Fragment } from 'react';
import { Navigate } from 'react-router';
import DashboardLink from '../../../components/dashboard/DashboardLink';
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'
import { Link } from 'react-router-dom';
import moment from 'moment'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const statusStyles = {
  'Not Processed': 'bg-gray-400 text-gray-700',
  'Processed': 'bg-blue-500 text-blue-700',
  'Shipping': 'bg-orange-500 text-orange-700',
  'Delivery': 'bg-green-500 text-green-700',
  'Cancelled': 'bg-red-500 text-red-700'
};

const DashboardPayments = ({ list_orders, get_items, get_total, get_item_total, orders, isAuthenticated }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    get_items()
    get_total()
    get_item_total()
    list_orders()
  }, [get_items, get_total, get_item_total, list_orders])

  if (!isAuthenticated)
    return <Navigate to="/" />

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Cerrar barra lateral</span>
                  <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-5 flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  <DashboardLink />
                </nav>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white py-16 sm:px-6 sm:py-24 lg:px-8">
              <div className="space-y-12">
                {orders.map((product) => (
                  <Fragment key={product.id}>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Detalles de la Orden</h1>
                    <div className="mt-6">
                      <p className={`font-medium px-4 py-2 rounded-full inline-block ${statusStyles[product.status]}`}>
                        Estado: {product.status}
                      </p>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  orders: state.Orders.orders,
  isAuthenticated: state.Auth.isAuthenticated,
})

export default connect(mapStateToProps, {
  list_orders,
  get_items,
  get_total,
  get_item_total
})(DashboardPayments)
