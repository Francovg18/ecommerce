import Layout from "../../../hocs/Layout";
import { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  get_wishlist_items,
  remove_wishlist_item,
} from "../../../redux/actions/wishlist";
import { setAlert } from "../../../redux/actions/alert";

const Wishlist = ({ wishlist_items, setAlert, isAuthenticated, user, product }) => {
  const [removingId, setRemovingId] = useState(null);
  const [progressWidth, setProgressWidth] = useState(0);
  const [hover, setHover] = useState(null);
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(get_wishlist_items());
  }, [render, dispatch]);

  useEffect(() => {
    if (wishlist_items && wishlist_items.length > 0) {
      const maxItems = 12;
      const progress = Math.min((wishlist_items.length / maxItems) * 100, 100);
      setProgressWidth(progress);
    } else {
      setProgressWidth(0);
    }
  }, [wishlist_items]);

  const handleRemoveItem = async (id) => {
    setRemovingId(id);
    await dispatch(remove_wishlist_item(id));
    setTimeout(() => {
      setRender((prev) => !prev);
      setAlert("Producto eliminado de favoritos", "success");
      setRemovingId(null);
    }, 300);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl bg-clip-text text-transparent bg-black">
                Productos Favoritos
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                {wishlist_items?.length 
                  ? `${wishlist_items.length} producto${wishlist_items.length !== 1 ? 's' : ''} en tu lista`
                  : "Aún no tienes productos favoritos"}
              </p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Link
                to="/shop"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-midnight-blue to-purple-night hover:from-crimson-red hover:to-deep-rose focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                </svg>
                Explorar más productos
              </Link>
            </div>
          </div>

          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressWidth}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-deep-rose via-crimson-red to-red-500 h-2"
            />
          </div>

          {wishlist_items && wishlist_items.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-y-10 gap-x-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            >
              <AnimatePresence>
                {wishlist_items.map((item, index) => (
                  <motion.div
                    key={item.product.id}
                    variants={itemVariants}
                    exit="exit"
                    layout
                    className={`group relative ${removingId === item.product.id ? 'opacity-50' : ''}`}
                    onMouseEnter={() => setHover(item.product.id)}
                    onMouseLeave={() => setHover(null)}
                  >
                    <div className="m-2 rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                      <div className="relative pb-[100%]">
                        <Link to={`/product/${item.product.id}`}>
                          <img
                            src={item.product.photo}
                            alt={item.product.name}
                            className="p-6 absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 ease-in-out group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                        </Link>
 
                        
                        <button
                          onClick={() => handleRemoveItem(item.product.id)}
                          className="absolute top-3 right-3 z-10 bg-white text-gray-600 rounded-full p-2 shadow-md hover:bg-red-50 hover:text-red-500 transition-all duration-300 transform hover:scale-110"
                          title="Eliminar de favoritos"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="p-4">
                        <Link to={`/product/${item.product.id}`}>
                          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 h-10">
                            {item.product.name}
                          </h3>
                          <div className="mt-2 flex justify-between items-center">
                          <span className="text-lg">
                            {user && user.mayorista_tipo !== undefined ? (
                              user.mayorista_tipo === 0 ? item.product?.price :
                              user.mayorista_tipo === 1 ? item.product?.price_mayorista_1 :
                              user.mayorista_tipo === 2 ? item.product?.price_mayorista_2 :
                              user.mayorista_tipo === 3 ? item.product?.price_mayorista_3 :
                              "N/A"
                            ) : "Inicia sesión"}
                          </span>

                            
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ 
                                opacity: hover === item.product.id ? 1 : 0,
                                x: hover === item.product.id ? 0 : 10
                              }}
                              className="text-purple-600"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            </motion.div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-32 w-32 text-gray-400 mb-6 transform rotate-[-10deg]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    >
                    <path d="M6 6h15l-1.5 9h-13L4 4H2" />
                    <circle cx="9" cy="20" r="1" />
                    <circle cx="18" cy="20" r="1" />
                    </svg>



              </motion.div>

              <h2 className="text-2xl font-bold text-gray-700 mb-2">Tu lista de favoritos está vacía</h2>
              <p className="text-gray-500 text-lg mb-8 max-w-md">
                Agrega productos a tus favoritos para guardarlos aquí y tenerlos a la mano cuando los necesites
              </p>

              <Link
                to="/shop"
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-midnight-blue to-purple-night p-0.5 text-sm font-medium text-white hover:text-white focus:outline-none focus:ring-4 focus:ring-purple-200"
              >
                <span className="relative rounded-md bg-white px-6 py-3 transition-all duration-75 ease-in group-hover:bg-opacity-0 text-gray-700 group-hover:text-white font-semibold">
                  Descubrir productos increíbles
                </span>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  wishlist_items: state.Wishlist.items,
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user
});

export default connect(mapStateToProps, {
  setAlert,
  remove_wishlist_item,
  get_wishlist_items,
  
})(Wishlist);