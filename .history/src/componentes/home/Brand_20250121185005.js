import React from 'react';
import { useSelector } from 'react-redux';

const Brand = () => {
    const brandsState = useSelector((state) => state.brands); // Asegúrate que 'brands' sea el nombre del reducer en el store.

    if (!brandsState) {
        return <p>Cargando...</p>; // Manejo de caso cuando el estado aún no está disponible.
    }

    const { brands } = brandsState;

    return (
        <div>
            <h1>Marcas</h1>
            <ul>
                {brands && brands.map((brand, index) => (
                    <li key={index}>
                        <h2>{brand.name}</h2>
                        <img src={brand.logo} alt={brand.name} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Brand;
