import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_brands } from '../actions/brands';

const Brand = () => {
    const dispatch = useDispatch();
    const { brands } = useSelector((state) => state.brands); // Asegúrate de que el reducer se llama 'brands'

    useEffect(() => {
        dispatch(get_brands()); // Llama a la acción para obtener las marcas
    }, [dispatch]);

    return (
        <div>
            <h1>Lista de Marcas</h1>
            {brands ? (
                <ul>
                    {brands.map((brand) => (
                        <li key={brand.id} style={{ marginBottom: '1rem' }}>
                            <p><strong>{brand.name}</strong></p>
                            {brand.logo ? (
                                <img 
                                    src={brand.logo} 
                                    alt={brand.name} 
                                    style={{ width: '100px', height: 'auto' }} 
                                />
                            ) : (
                                <p>Sin logo disponible</p>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Cargando marcas...</p>
            )}
        </div>
    );
};

export default Brand;
