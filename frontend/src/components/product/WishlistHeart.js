import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WishlistHeart = ({
  addToWishlist,
  removeFromWishlist,
  product,
  wishlist,
  setAlert
}) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("green");

  useEffect(() => {
    if (wishlist && product) {
      const found = wishlist.some(
        (item) => item.product.id.toString() === product.id.toString()
      );
      setIsInWishlist(found);
    }
  }, [wishlist, product]);

  const handleToggle = async () => {
    if (loading) return;
    setLoading(true);

    try {
      if (isInWishlist) {
        await removeFromWishlist(product.id);
        setIsInWishlist(false);
        setToastMessage("Eliminado de favoritos 😭");
        setToastColor("red");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        setAlert && setAlert("Producto eliminado de favoritos", "warning");
      } else {
        const success = await addToWishlist(product);
        if (success) {
          setIsInWishlist(true);
          setToastMessage("Añadido a favoritos 😎");
          setToastColor("green");
          setShowToast(true);
          setTimeout(() => setShowToast(false), 3000);
          setAlert && setAlert("Producto añadido a favoritos", "success");
        } else {
          setAlert && setAlert("Ya está en favoritos", "info");
        }
      }
    } catch (err) {
      console.error(err);
      setAlert && setAlert("Error al procesar favoritos", "danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleToggle}
        disabled={loading}
        className={`ml-4 py-2 px-3 rounded-md flex items-center justify-center transition-all duration-200
          ${isInWishlist ? "text-red-500 bg-red-100" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"}`}
        title={isInWishlist ? "Eliminar de favoritos" : "Agregar a favoritos"}
      >
        <svg
          className="h-6 w-6 flex-shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill={isInWishlist ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span className="sr-only">
          {isInWishlist ? "Eliminar de favoritos" : "Agregar a favoritos"}
        </span>
      </button>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className={`absolute -top-16 left-0 z-50 px-5 py-3 rounded-lg shadow-lg text-sm sm:text-base font-semibold whitespace-nowrap
              ${toastColor === "green" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WishlistHeart;
