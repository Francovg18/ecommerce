import { Fragment, useEffect, useState } from 'react';
import { Menu, Popover, Transition } from '@headlessui/react';
import { Link, Navigate, NavLink } from 'react-router-dom';
import { MenuIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/outline';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import { get_categories } from '../../redux/actions/categories';
import { get_search_products } from '../../redux/actions/products';
import { MenuAlt1Icon, UserCircleIcon, HomeIcon, HeartIcon, ChevronDownIcon, ShoppingBagIcon, CollectionIcon, PhoneIcon, InformationCircleIcon } from '@heroicons/react/outline';
import SearchBox from './SearchBox';
import Alert from '../../components/alert';
import logoMini from '../../assets/img/logoMini.jpg';
import logoGif from '../../assets/img/gif4.webp';
import logo from '../../assets/img/logoP.jpg';


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
        <Menu.Button className="inline-flex justify-center w-full rounded-full text-sm font-medium text-gray-700 ml-3">
          <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gradient-to-r ">
            <div className="flex items-center justify-center h-full w-full bg-gray-50 rounded-full">
              <UserCircleIcon className="h-10 w-10 text-gray-600 group-hover:text-red-500 transition-all duration-300" />
            </div>
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
                    active ? 'bg-gray-50 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Informacion
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
    
      <Link
        to="/login"
        className="ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-midnight-blue hover:bg-purple-night "
      >
        Log in
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
            to="/user_register"
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
    <Menu as="div" className="ml-2 relative  text-left w-full flex items-center justify-between">
      <div className="flex items-center">
        <img className="h-16 w-auto" src={logo} alt="Workflow" />
      </div>
  
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-full text-sm font-medium text-gray-700 ml-3">
          <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gradient-to-r ">
            <div className="flex items-center justify-center h-full w-full bg-white rounded-full">
              <UserCircleIcon className="h-10 w-10 text-gray-600 group-hover:text-red-500 transition-all duration-300" />
            </div>
          </span>
        </Menu.Button>
      </div>
  
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
                  Informacion
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
    <Popover className="relative bg-gray-50 ">
      <div className="absolute inset-0 z-30 pointer-events-none " aria-hidden="true" />
        <div className="relative z-20">
          <div className="">
            <div className="">
              <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-5 sm:px-6 sm:py-3 lg:px-8 md:justify-start md:space-x-10">
                <div>
                  <Link to="/" className="hidden md:flex lg:flex">
                    <img className="h-auto w-52 sm:w-52 md:w-48 lg:w-52 -ml-2" src={logo} alt="Logo" />
                  </Link>
                </div>
                
                {/* Navbar para móviles */}
                <div className="flex flex-col items-center space-y-4 md:hidden w-full overflow-hidden">
                  <div className="flex items-center justify-between w-full px-4">
                    <Link to="/" className="flex">
                      <img className="h-auto max-w-[150px]" src={logo} alt="Logo" />
                    </Link>
                    
                    <div className="flex items-center space-x-4">
                    <p
                      className={`text-sm  ${
                        isAuthenticated ? "" : ""
                      }`}
                    >
                      {isAuthenticated ? (
                        <div className="flex items-center md:ml-1 mr-1">
                          <Link to="/wishlist" className="relative ml-1 flex items-center gap-1">
                            <HeartIcon className="bg-gray-100 h-5 w-5 cursor-pointer text-gray-800 hover:text-red-700 transition duration-200" />
                          </Link>
                        </div>
                      ) : (
                        <p></p>
                      )}
                    </p>
                      <Link
                        to="/cart"
                        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-600 hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset"
                      >
                        <span className="sr-only">Open cart</span>
                        <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                      </Link>
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-600 hover:text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Open menu</span>
                        <MenuIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>

                  <div className="w-[90%] md:w-auto bg-white shadow-lg rounded-md border border-gray-600 mx-auto transition-all duration-300 hover:border-gray-800">
                    <SearchBox 
                      search={search} 
                      onChange={onChange} 
                      onSubmit={onSubmit} 
                      categories={categories} 
                      className="rounded-md transition-all duration-300 hover:border-gray-200"
                    />
                  </div>
                  <div></div>
                  <div className="w-[100%] mx-auto h-px bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 mt-12 mb-6 rounded-full"></div>

                </div>

                {/* Navbar para pantallas grandes */}
                <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
                <Popover.Group as="nav" className="flex space-x-10">
                  <div className="flex flex-1 justify-center border border-gray-600 rounded-md transition-all duration-300 hover:border-gray-800">
                    <SearchBox 
                      search={search} 
                      onChange={onChange} 
                      onSubmit={onSubmit} 
                      categories={categories} 
                      className="rounded-md transition-all duration-300 hover:border-gray-200"
                    />
                  </div>
                </Popover.Group>
                  <div className="flex items-center">
                  <p
                    className={`text-sm  ${
                      isAuthenticated ? "" : ""
                    }`}
                  >
                    {isAuthenticated ? (
                      <div className="flex items-center md:ml-12 -mr-4">
                        <Link to="/wishlist" className="relative ml-1 flex items-center gap-1">
                          <p className="text-[14px]">Favoritos</p>
                          <HeartIcon className="bg-gray-100 h-5 w-5 cursor-pointer text-gray-800 hover:text-red-700 transition duration-200" />
                        </Link>
                      </div>
                    ) : (
                      <p></p>
                    )}
                  </p>

                    <div className="flex items-center md:ml-12">
                      <Link to="/cart" className="relative">
                        <ShoppingCartIcon className="h-6 w-6 cursor-pointer text-gray-600" />
                        <span className="text-xs absolute top-3 mt-3 ml-4 bg-red-500 text-white font-semibold rounded-full px-2 text-center">{total_items}</span>
                      </Link>
                      
                    </div>
                    
                    {isAuthenticated ? authLinks : guestLinks}
                  </div>
                </div>
              </div>
            </div>
          </div>

    <div className="hidden md:flex flex-wrap bg-custom-gradient text-white text-sm font-sans px-8 lg:px-16 justify-center md:justify-between items-center shadow-lg shadow-blue-800/20 animate-gradient-x !mt-0 !mb-0 !py-0 h-auto">
    {/* Categorías */}
    <div className="flex items-center shrink-0 mb-2 md:mb-0">
      <NavLink
        to="/shop"
        className={({ isActive }) =>
          `relative text-sm font-semibold transition-all duration-300 ease-in-out px-3 lg:px-6
          rounded-lg group ${
            isActive
              ? "text-yellow-200 scale-105"
              : "hover:bg-midnight-blue/100 hover:text-white"
          }`
        }
      >
        <span className="flex items-center hover:text-white hover:drop-shadow-[0_0_4px_red] transition-all duration-300 ml-4">
          <MenuAlt1Icon className="w-5 h-5 mr-1" />
          <strong>CATEGORÍAS</strong>
        </span>
      </NavLink>
      <div className="h-6 w-[1px] bg-white"></div>
    </div>

    {/* Navegación - Links */}
    <div className="flex flex-wrap justify-center xl:gap-14 lg:gap-10 md:gap-8 gap-4">
      {[
        { to: "/news", label: "NOVEDADES" },
        { to: "/brands", label: "MARCAS" },
      ].map((item, index) => (
        <div key={index}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              `relative text-sm font-semibold transition-all duration-300 ease-in-out px-3 md:px-5 lg:px-6 
              rounded-lg group ${
                isActive
                  ? "text-yellow-200 scale-105"
                  : "hover:text-white"
              }`
            }
          >
            <span className="flex items-center hover:text-white hover:drop-shadow-[0_0_4px_red] transition-all duration-300">
              <strong>{item.label}</strong>
            </span>
          </NavLink>
        </div>
      ))}

      <div className="relative group">
        <NavLink
          to="/contacto"
          className={({ isActive }) =>
            `relative text-sm font-semibold transition-all duration-300 ease-in-out px-3 md:px-5 lg:px-6 
            rounded-lg group-hover:text-yellow-200 ${
              isActive
                ? "text-yellow-200 scale-105"
                : "hover:text-white"
            }`
          }
        >
          <span className="flex items-center hover:text-white hover:drop-shadow-[0_0_4px_red] transition-all duration-300">
            <strong>CONTACTO</strong> <ChevronDownIcon className="w-4 h-4 ml-1" />
          </span>
        </NavLink>

        <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300">
          <NavLink
            to="/contactus"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-t-lg"
          >
            Nuestras Sucursales
          </NavLink>
          <NavLink
            to="/contacto"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-b-lg"
          >
            Contáctenos
          </NavLink>
        </div>
      </div>

      <div className="relative group">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `relative text-sm font-semibold transition-all duration-300 ease-in-out px-3 md:px-5 lg:px-6 
            rounded-lg group-hover:text-yellow-200 ${
              isActive
                ? "text-yellow-200 scale-105"
                : "hover:text-white"
            }`
          }
        >
          <span className="flex items-center hover:text-white hover:drop-shadow-[0_0_4px_red] transition-all duration-300">
            <strong>NOSOTROS</strong> <ChevronDownIcon className="w-4 h-4 ml-1" />
          </span>
        </NavLink>

        <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300">
          <NavLink
            to="/about"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-t-lg"
          >
            Sobre nosotros
          </NavLink>
          <NavLink
            to="/user_register"
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 rounded-b-lg"
          >
            ¿Cómo ser un cliente?
          </NavLink>
        </div>
      </div>

      <div className="relative group">
        <NavLink
          to="/help"
          className={({ isActive }) =>
            `relative text-sm font-semibold transition-all duration-300 ease-in-out px-3 md:px-5 lg:px-6 
            rounded-lg group-hover:text-yellow-200 ${
              isActive
                ? "text-yellow-200 scale-105"
                : "hover:text-white"
            }`
          }
        >
          <span className="flex items-center hover:text-white hover:drop-shadow-[0_0_4px_red] transition-all duration-300">
            <strong>AYUDA</strong>
          </span>
        </NavLink>
      </div>
    </div>
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
                <div className="grid gap-7  sm:gap-y-8 sm:gap-x-4">
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
                    Categorias
                  </NavLink>

                  <div className="relative group">
                    <NavLink
                      to="#"
                      className="px-8 text-base font-medium -m-3 flex items-center p-3 rounded-lg hover:bg-midnight-blue hover:text-white"
                    >
                      <InformationCircleIcon className="h-5 w-5 mr-3" />
                      Contactos
                      <ChevronDownIcon className="h-5 w-5 ml-auto" />
                    </NavLink>

                    {/* Submenú */}
                    <div className="absolute left-0 mt-2 w-full bg-white border rounded-md shadow-lg shadow-gray-400 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
                      <NavLink
                        to="/contactus"
                        className="block px-4 py-2 text-gray-800 hover:bg-midnight-blue hover:rounded-md hover:text-white"
                      >
                        Nuestras Sucursales
                      </NavLink>
                      <NavLink
                        to="/contacto"
                        className="block px-4 py-2 text-gray-800 hover:bg-midnight-blue hover:rounded-md hover:text-white"
                      >
                        Contactanos
                      </NavLink>
                    </div>
                  </div>

                  <NavLink
                    to="/news"
                    className="px-8 text-base font-medium -m-3 flex items-center p-3 rounded-lg hover:bg-midnight-blue hover:text-white"
                  >
                    <CollectionIcon className="h-5 w-5 mr-3" />
                    Novedades
                  </NavLink>

                  <NavLink
                    to="/brands"
                    className="px-8 text-base font-medium -m-3 flex items-center p-3 rounded-lg hover:bg-midnight-blue hover:text-white"
                  >
                    <PhoneIcon className="h-5 w-5 mr-3" />
                    Marcas
                  </NavLink>

                  <div className="relative group">
                    <NavLink
                      to="#"
                      className="px-8 text-base font-medium -m-3 flex items-center p-3 rounded-lg hover:bg-midnight-blue hover:text-white"
                    >
                      <InformationCircleIcon className="h-5 w-5 mr-3" />
                      Nosotros
                      <ChevronDownIcon className="h-5 w-5 ml-auto" />
                    </NavLink>

                    {/* Submenú */}
                    <div className="absolute left-0 mt-2 w-full bg-white border rounded-md shadow-lg shadow-gray-400 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200">
                      <NavLink
                        to="/contactus"
                        className="block px-4 py-2 text-gray-800 hover:bg-midnight-blue hover:rounded-md hover:text-white"
                      >
                        Sobre Nosotros
                      </NavLink>
                      <NavLink
                        to="/contacto"
                        className="block px-4 py-2 text-gray-800 hover:bg-midnight-blue hover:rounded-md hover:text-white"
                      >
                        Contactanos
                      </NavLink>
                    </div>
                  </div>

                  <NavLink
                    to="/help"
                    className="px-8 text-base font-medium -m-3 flex items-center p-3 rounded-lg hover:bg-midnight-blue hover:text-white"
                  >
                    <InformationCircleIcon className="h-5 w-5 mr-3" />
                    Ayuda
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