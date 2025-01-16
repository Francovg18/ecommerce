import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { XIcon, CheckIcon, ClockIcon } from "@heroicons/react/solid";

const CartItem = ({
    item,
    count,
    update_item,
    remove_item,
    render,
    setRender,
    setAlert
}) => {
    const [itemCount, setItemCount] = useState(1);

    // Actualiza el estado con el valor inicial de count
    useEffect(() => {
        if (count) setItemCount(count);
    }, [count]);

    // Maneja el cambio de cantidad en el selector
    const onChange = (e) => setItemCount(e.target.value);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            if (item?.product?.quantity >= itemCount) {
                await update_item(item, itemCount);
                setRender(!render);
            } else {
                setAlert("No hay suficiente stock disponible", "danger");
            }
        } catch (err) {
            console.error("Error actualizando el carrito:", err);
            setAlert("Error al actualizar el producto", "danger");
        }
    };

    // Elimina el item del carrito
    const removeItemHandler = async () => {
        try {
            await remove_item(item);
            setRender(!render);
        } catch (err) {
            console.error("Error eliminando el producto:", err);
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
                        <div className="flex justify-between">
                            <h3 className="text-sm">
                                <Link
                                    to={`/product/${item?.product?.id}`}
                                    className="font-medium text-gray-700 hover:text-gray-800"
                                >
                                    {item?.product?.name}
                                </Link>
                            </h3>
                        </div>
                        <div className="mt-1 flex text-sm">
                            <p className="text-gray-500">Color</p>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                            $ {item?.product?.price}
                        </p>
                    </div>

                    {/* Selector de cantidad */}
                    <div className="mt-4 sm:mt-0 sm:pr-9">
                        <form onSubmit={onSubmit}>
                            <select
                                name="item_count"
                                onChange={onChange}
                                value={itemCount}
                                className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                {Array.from({ length: item?.product?.quantity || 1 }, (_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                            <button
                                type="submit"
                                className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                            >
                                <span className="mx-2">Actualizar</span>
                            </button>
                        </form>

                        {/* Botón para eliminar el producto */}
                        <div className="absolute top-0 right-0">
                            <button
                                onClick={removeItemHandler}
                                className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Eliminar</span>
                                <XIcon className="h-5 w-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Estado de stock */}
                <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                    {item?.product?.quantity > 0 ? (
                        <>
                            <CheckIcon
                                className="flex-shrink-0 h-5 w-5 text-green-500"
                                aria-hidden="false"
                                aria-label="En Stock"
                            />
                            <span>En Stock</span>
                        </>
                    ) : (
                        <>
                            <ClockIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-300"
                                aria-hidden="false"
                                aria-label="Agotado"
                            />
                            <span>Agotado</span>
                        </>
                    )}
                </p>
            </div>
        </li>
    );
};

export default CartItem;
