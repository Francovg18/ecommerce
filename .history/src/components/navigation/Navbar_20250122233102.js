import { Fragment, useEffect, useState } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import logoGif from '../../assets/img/gif4.webp'
import logo from '../../assets/img/logoP.jpg'
import { Link, Navigate, NavLink } from 'react-router-dom'
import Alert from '../../components/alert'
import logoMini from '../../assets/img/logoMini.jpg'
import { MenuIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/outline'
import { connect } from 'react-redux'
import { logout } from '../../redux/actions/auth'
import { get_categories } from '../../redux/actions/categories'
import { get_search_products } from '../../redux/actions/products'
import { HomeIcon, ShoppingBagIcon, CollectionIcon, PhoneIcon, InformationCircleIcon } from '@heroicons/react/outline';

import SearchBox from './SearchBox'
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Navbar({
  isAuthenticated,
  logout,
  get_categories,
  categories,
  get_search_products,
  total_items
}) {

  const [redirect, setRedirect] = useState(false);
  const [render, setRender] = useState(false);
  const [formData, setFormData] = useState({
    category_id: 0,
    search: ''
  });
  const { category_id, search } = formData;
  useEffect(()=>{
    get_categories()
  }, [get_categories])

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    get_search_products(search, category_id);
    setRender(!render);
  }

  if(render){
    return <Navigate to='/search' />
  }

  const logoutHandler = () => {
    logout()
    setRedirect(true);
  }

  if(redirect){
    window.location.reload(false);
    return <Navigate to='/' />
  }

  const authLinks = (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-full  text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 ml-3">
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/dashboard"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Info
                </Link>
              )}
            </Menu.Item>
            
            
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logoutHandler}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full text-left px-4 py-2 text-sm'
                    )}
                  >
                    Salir
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
  const guestLinks = (
    <Fragment>
    <div className="hidden md:flex items-center md:ml-7">
    <Link to="/login" className="text-base font-medium text-gray-500 hover:text-gray-900 flex items-center">
      Log in
      <UserIcon className="h-5 w-5 ml-2" aria-hidden="true" />
    </Link>
      <Link
        to="/signup"
        className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-midnight-blue hover:bg-purple-night "
      >
        Register
        <img
          src={logoGif}
          alt="Cargando"
          className="w-7 h-6 mt-0.3 ml-2"
        />
      </Link>
    </div>

    </Fragment>
  )
  const guestLinksMobile = (
    <Fragment>
      <div className="w-full flex justify-between items-center -mt-4">
        <img className=" ml-2 h-9 w-auto" src={logoMini} alt="Workflow" />
        <div className="flex items-center">
          <Link to="/login" className="text-base font-medium text-gray-500 hover:text-gray-900 flex items-center">
            Log in
            <UserIcon className="h-5 w-5 ml-2" aria-hidden="true" />
          </Link>
          <Link
            to="/signup"
            className="ml-8 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-midnight-blue hover:bg-purple-night"
          >
            Register
            <img
              src={logoGif}
              alt="Cargando"
              className="w-7 h-6 mt-0.3 ml-2"
            />
          </Link>
        </div>
      </div>
    </Fragment>
  )
  const authLinksMobile = (
    <Menu as="div" className="ml-2 relative inline-block text-left w-full flex items-center justify-between">
      <div className="flex items-center">
        <img className="h-16 w-auto" src={logo} alt="Workflow" />
      </div>
  
      <Menu.Button className="inline-flex justify-center items-center text-sm font-medium text-gray-700 focus:outline-none ml-3">
        <span className="inline-block h-10 w-10 rounded-full overflow-hidden bg-gray-100 mr-4">
          <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </span>
      </Menu.Button>
  
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-32 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/dashboard"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Infooo
                </Link>
              )}
            </Menu.Item>
  
            <form method="POST" action="#">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={logoutHandler}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'block w-full text-left px-4 py-2 text-sm'
                    )}
                  >
                    Salir
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
  
  return (
    <>
    <Popover className="relative bg-white ">
      <div className="absolute inset-0 shadow z-30 pointer-events-none " aria-hidden="true" />
      <div className="relative z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-3 lg:px-8 md:justify-start md:space-x-10">
          
          {/* Contenedor para pantallas pequeñas */}
          <div className="flex flex-col items-center space-y-4 md:space-y-6">
            {/* Fila 1: Logo, Carrito y Menú */}
            <div className="flex items-center justify-between w-full px-5">
              {/* Logo */}
              <Link to="/" className="flex">
                <img
                  className="h-auto w-52 sm:w-52 md:w-48 lg:w-52"
                  src={logo}
                  alt="Logo"
                />
              </Link>

              {/* Carrito */}
              <Link
                to="/cart"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset"
              >
                <span className="sr-only">Open menu</span>
                <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
              </Link>

              {/* Ícono de menú hamburguesa */}
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>

            {/* Fila 2: Buscador */}
            <div className="w-full px-4">
              {window.location.pathname === "/search" ? null : (
                <SearchBox
                  search={search}
                  onChange={onChange}
                  onSubmit={onSubmit}
                  categories={categories}
                />
              )}
            </div>
          </div>

    {/* Contenedor para pantallas  grandes */}
    <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
      <Popover.Group as="nav" className="flex space-x-10">
        {window.location.pathname === '/search' ? null : (
          <div className="flex flex-1 justify-center">
            <SearchBox 
              search={search}
              onChange={onChange}
              onSubmit={onSubmit}
              categories={categories}
            />
          </div>
        )}
      </Popover.Group>
      <div className="flex items-center ">
        <div className="flex items-center md:ml-12">
          <Link to="/cart">
              <ShoppingCartIcon className="h-6 w-6 cursor-pointer text-gray-300 "/>
              <span className="text-xs absolute top-3 mt-3 ml-4 bg-red-500 text-white font-semibold rounded-full px-2 text-center">{total_items}</span>
          </Link>
        </div> 
        {isAuthenticated ? authLinks:guestLinks}
      </div>
    </div>

      </div>
      <div className="hidden md:flex bg-custom-gradient text-white py-1.5 px-6 justify-around items-center shadow-lg shadow-blue-800/20 animate-gradient-x">
      {[
        { to: "/", label: "Inicio", icon: <HomeIcon className="w-5 h-5 mr-2" /> },
        { to: "/category", label: "Categoría", icon: <CollectionIcon className="w-5 h-5 mr-2" /> },
        { to: "/shop", label: "Catálogo", icon: <ShoppingBagIcon className="w-5 h-5 mr-2" /> },
        { to: "/contactus", label: "Contáctanos", icon: <PhoneIcon className="w-5 h-5 mr-2" /> },
        { to: "/about", label: "¿Quiénes somos?", icon: <InformationCircleIcon className="w-5 h-5 mr-2" /> },
      ].map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          className={({ isActive }) =>
            `relative text-base font-medium transition-all duration-300 ease-in-out px-6 py-2 
            rounded-lg group ${
              isActive
                ? "text-yellow-200 scale-105 "
                : "hover:bg-midnight-blue/100 hover:text-white"
            }`
          }
        >
          <span className="flex items-center hover:text-white hover:drop-shadow-[0_0_4px_red] transition-all duration-300">
            {item.icon}
            {item.label}
          </span>
          <span className="absolute inset-y-0 left-0 flex items-center -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            <ChevronLeftIcon className="w-6 h-6 text-yellow-300" />
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            <ChevronRightIcon className="w-6 h-6 text-yellow-300" />
          </span>
        </NavLink>
      ))}
    </div>

      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white text-black divide-y-2 divide-gray-500">
            <div className="pt-5 pb-6 px-5 sm:pb-8">
              <div className="flex items-center justify-between">
                <div>
                  
                  
                </div>
                <div className="-mr-2">
                  <Popover.Button className="rounded-md px-2 inline-flex items-center text-black hover:text-purple-night focus:outline-none focus:ring-2 focus:ring-inset ">
                    <span className="sr-only">Cerrar menú</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                    </svg>
                  </Popover.Button>
                </div>
              </div>
              
              <div className="mt-6 sm:mt-8">
                
                <nav>
                  
                <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                {isAuthenticated ? authLinksMobile : guestLinksMobile}
                
                <NavLink
                  to="/"
                  className="px-8 text-base font-medium -m-3 flex items-center p-3 rounded-lg hover:bg-midnight-blue hover:text-white"
                >
                  <HomeIcon className="h-5 w-5 mr-3" />
                  Inicio
                </NavLink>

                <NavLink
                  to="/shop"
                  className="px-8 text-base font-medium -m-3 flex items-center p-3 rounded-lg hover:bg-midnight-blue hover:text-white"
                >
                  <ShoppingBagIcon className="h-5 w-5 mr-3" />
                  Categoria
                </NavLink>

                <NavLink
                  to="/shop"
                  className="px-8 text-base font-medium -m-3 flex items-center p-3 rounded-lg hover:bg-midnight-blue hover:text-white"
                >
                  <CollectionIcon className="h-5 w-5 mr-3" />
                  Catalogo
                </NavLink>

                <NavLink
                  to="/"
                  className="px-8 text-base font-medium -m-3 flex items-center p-3 rounded-lg hover:bg-midnight-blue hover:text-white"
                >
                  <PhoneIcon className="h-5 w-5 mr-3" />
                  Contactanos
                </NavLink>

                <NavLink
                  to="/about"
                  className="px-8 text-base font-medium -m-3 flex items-center p-3 rounded-lg hover:bg-midnight-blue hover:text-white"
                >
                  <InformationCircleIcon className="h-5 w-5 mr-3" />
                  ¿Quiénes Somos?
                </NavLink>
              </div>
                </nav>
              </div>
            </div>
            
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
    <Alert/>
    </>
  )
}
const mapStateToProps = state =>  ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
  categories: state.Categories.categories,
  total_items: state.Cart.total_items
})
export default connect(mapStateToProps, {
  logout,
  get_categories,
  get_search_products
}) (Navbar)