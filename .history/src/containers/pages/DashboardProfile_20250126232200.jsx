import { connect } from 'react-redux'
import {list_orders} from '../../redux/actions/orders'
import { get_items, get_total, get_item_total } from "../../redux/actions/cart";
import { useEffect } from 'react';
import { Navigate } from 'react-router';
import DashboardLink from '../../components/dashboard/DashboardLink';
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuAlt2Icon, XIcon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import { Link } from 'react-router-dom';
import { cities } from '../../helpers/fixedCity';
import { update_user_profile } from '../../redux/actions/profile';
import { Oval } from 'react-loader-spinner';
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DashboardProfile =({
    list_orders,
    get_items,
    get_total,
    get_item_total,
    orders,
    isAuthenticated,
    user,
    update_user_profile,
    profile
})=>{

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [loading, setLoading] = useState(false)

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
        zipcode: '',
        phone: '',
    });

    const {
        address_line_1,
        address_line_2,
        city,
        state_province_region,
        zipcode,
        phone,
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
      e.preventDefault();
      setLoading(true)
      update_user_profile(
          address_line_1,
          address_line_2,
          city,
          state_province_region,
          zipcode,
          phone,
      );
      setLoading(false)
      window.scrollTo(0, 0);
  };

    if(!isAuthenticated)
        return <Navigate to="/"/>

    return (
        <>
            <div>
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
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                    <Link to="/">
                  <img
                    className="h-8 w-auto cursor-pointer"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                    alt="Workflow"
                  />
                  </Link>
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                  <DashboardLink/>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
            </div>
          </Dialog>
        </Transition.Root>

        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          <div className="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
            <Link
                to="/"
                className="inline-flex items-center px-2.5 py-1.5 border border-gray-500 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Atrás
            </Link>

              
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                <DashboardLink/>
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex-1 px-4 flex justify-between">
              <div className="ml-4 flex items-center md:ml-6 absolute top-4 right-12">
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                      <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100">
                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </span>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="flex-1">
            <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <form onSubmit={e => onSubmit(e)} className="max-w-3xl mx-auto">
              <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Datos Personales</h3>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Direccion 1: 
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    <input
                      type="text"
                      name="address_line_1"
                      placeholder={profile.address_line_1}
                      onChange={e => onChange(e)}
                      value={address_line_1}
                      className="flex-1 block w-full min-w-0 rounded-md sm:text-sm border-2 border-gray-300 bg-gray-100 px-2"
                    />
                  </div>
                </div>

              </div>
              
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Direccion 2: 
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    
                    <input
                      type="text"
                      name='address_line_2'
                      placeholder={`${profile.address_line_2}`}
                      onChange={e => onChange(e)}
                      value={address_line_2}
                      className="flex-1 block w-full min-w-0 rounded-md sm:text-sm border-2 border-gray-300 bg-gray-100 px-2"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Provincia: 
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    
                    <input
                      type="text"
                      name='state_province_region'
                      placeholder={`${profile.state_province_region}`}
                      onChange={e => onChange(e)}
                      value={state_province_region}
                      className="flex-1 block w-full min-w-0 rounded-md sm:text-sm border-2 border-gray-300 bg-gray-100 px-2"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Código Postal: 
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    
                    <input
                      type="text"
                      name='zipcode'
                      placeholder={`${profile.zipcode}`}
                      onChange={e => onChange(e)}
                      value={zipcode}
                      className="flex-1 block w-full min-w-0 rounded-md sm:text-sm border-2 border-gray-300 bg-gray-100 px-2"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                Celular: 
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <div className="max-w-lg flex rounded-md shadow-sm">
                    
                    <input
                      type="text"
                      name='phone'
                      placeholder={`${profile.phone}`}
                      onChange={e => onChange(e)}
                      value={phone}
                      className="flex-1 block w-full min-w-0 rounded-md sm:text-sm border-2 border-gray-300 bg-gray-100 px-2"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                  Ciudad
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <select
                            id='city' 
                            name='city'
                            className="flex-1 block w-full min-w-0 rounded-md sm:text-sm border-2 border-gray-300 bg-gray-100 px-2"
                            onChange={e => onChange(e)}
                        >
                            <option value={city}>{profile.city}</option>
                            {
                                cities && cities.map((city, index) => (
                                    <option key={index} value={city.name}>{city.name}</option>
                                ))
                            }
                        </select>
                </div>
              </div>

              {loading?<button
                className="inline-flex mt-4 float-right items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Oval
                width={20}
                height={20}
                color="#fff"
                />
              </button>:<button
                type="submit"
                className="inline-flex mt-6 float-right items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-midnight-blue hover:bg-purple-night focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Guardar
              </button>}

            </form>
            </div>
            </div>
          </main>
        </div>
      </div>
        </>
    )
}

const mapStateToProps =state=>({
    orders: state.Orders.orders,
    isAuthenticated: state.Auth.isAuthenticated,
    user: state.Auth.user,
    profile: state.Profile.profile,
})

export default connect(mapStateToProps,{
    list_orders,
    get_items,
    get_total,
    get_item_total,
    update_user_profile
}) (DashboardProfile)