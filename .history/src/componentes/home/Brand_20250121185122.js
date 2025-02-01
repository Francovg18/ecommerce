import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_brands } from '../../redux/actions/brands'; // Asegúrate que esta acción esté bien configurada.

const Brand = () => {
    const dispatch = useDispatch();
    
    // Traer el estado de las marcas desde Redux
    const brandsState = useSelector((state) => state.brands);

    // Verifica si el estado ya está disponible
    useEffect(() => {
        dispatch(get_brands()); // Despacha la acción para obtener las marcas
    }, [dispatch]);

    // Si el estado es null o undefined, muestra "Cargando..."
    if (!brandsState || !brandsState.brands) {
        return <p>Cargando...</p>;
    }

    const { brands } = brandsState;

    return (
        <div>
            <h1>Marcas</h1>
            <ul>
                {brands.map((brand, index) => (
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
