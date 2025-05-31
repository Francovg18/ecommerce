import { useState } from "react";
import { Link } from "react-router-dom";
import { XIcon, CheckIcon, ClockIcon } from "@heroicons/react/solid";

const WishlistItem = ({ item, remove_wishlist_item, setRender, setAlert }) => {
    const [loading, setLoading] = useState(false);

    const removeItemHandler = async () => {
        if (loading) return;
        setLoading(true);
        try {
            await remove_wishlist_item(item.product.id);  // ✅ Solo pasamos el ID
            setRender(prev => !prev);                     // ✅ Fuerza recarga
            setAlert("Producto eliminado de favoritos", "success");
        } catch (err) {
            console.error("Error eliminando el producto de la lista de deseos:", err);
            setAlert("Error al eliminar el producto", "danger");
        } finally {
            setLoading(false);
        }
    };

    return (
        <li className="flex py-6 sm:py-10">
            {/* Imagen del producto */}
            <div className="flex-shrink-0">
                <img
                    src={item?.product?.photo}
                    alt={`Imagen del producto ${item?.product?.name || ""}`}
                    className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                />
            </div>

            {/* Información del producto */}
            <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                        <h3 className="text-sm">
                            <Link
                                to={`/product/${item?.product?.id}`}
                                className="font-medium text-gray-700 hover:text-gray-800"
                            >
                                {item?.product?.name}
                            </Link>
                        </h3>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                            Bs {item?.product?.price}
                        </p>
                    </div>

                    {/* Botón para eliminar */}
                    <div className="absolute top-0 right-0">
                        <button
                            onClick={removeItemHandler}
                            disabled={loading}
                            className={`-m-2 p-2 inline-flex ${loading
                                ? "text-gray-300 cursor-not-allowed"
                                : "text-gray-400 hover:text-gray-500"}`}
                        >
                            <span className="sr-only">Eliminar</span>
                            <XIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                {/* Estado de stock */}
                <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                    {item?.product?.quantity > 0 ? (
                        <>
                            <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" />
                            <span>En Stock</span>
                        </>
                    ) : (
                        <>
                            <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-300" />
                            <span>Agotado</span>
                        </>
                    )}
                </p>
            </div>
        </li>
    );
};

export default WishlistItem;
