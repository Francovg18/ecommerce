// WishlistHeart.js
import { useState, useEffect } from "react";

// Función para obtener la wishlist desde el backend
const fetchWishlist = async () => {
    try {
        const response = await fetch(`/api/wishlist/items/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();
            return data.wishlist; // Asume que devuelve un array de items
        } else {
            console.error("Error al obtener la wishlist.");
            return [];
        }
    } catch (error) {
        console.error("Error en fetchWishlist:", error);
        return [];
    }
};

// Componente principal
const WishlistHeart = ({ product }) => {
    const [isInWishlist, setIsInWishlist] = useState(false);

    useEffect(() => {
        const checkIfInWishlist = async () => {
            const wishlist = await fetchWishlist();
            const found = wishlist.some(
                (item) => item.product.id.toString() === product.id.toString()
            );
            setIsInWishlist(found);
        };

        checkIfInWishlist();
    }, [product]);

    const handleWishlistToggle = async () => {
        // Lógica para añadir o eliminar de la wishlist (ya implementada)
    };

    return (
        <button
            onClick={handleWishlistToggle}
            className={`ml-4 py-3 px-3 rounded-md flex items-center justify-center 
            ${isInWishlist ? "text-red-500 bg-red-100" : "text-gray-400 hover:bg-gray-100 hover:text-gray-500"}`}
        >
            <svg
                className="h-6 w-6 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill={isInWishlist ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
            <span className="sr-only">
                {isInWishlist ? "Remove from favorites" : "Add to favorites"}
            </span>
        </button>
    );
};

export default WishlistHeart;
