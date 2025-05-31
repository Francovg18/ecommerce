import axios from 'axios';
import {
    GET_WISHLIST_ITEMS_SUCCESS,
    GET_WISHLIST_ITEMS_FAIL,
    ADD_WISHLIST_ITEM_SUCCESS,
    ADD_WISHLIST_ITEM_FAIL,
    GET_WISHLIST_ITEM_TOTAL_SUCCESS,
    GET_WISHLIST_ITEM_TOTAL_FAIL,
    REMOVE_WISHLIST_ITEM_SUCCESS,
    REMOVE_WISHLIST_ITEM_FAIL,
    CLEAR_WISHLIST,
} from './types';

const configWithToken = () => ({
    headers: {
        Authorization: `JWT ${localStorage.getItem('access')}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// Obtener todos los ítems
export const get_wishlist_items = () => async dispatch => {
    if (!localStorage.getItem('access')) return;

    try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/wishlist/wishlist-items`,
            configWithToken()
        );

        dispatch({
            type: GET_WISHLIST_ITEMS_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({ type: GET_WISHLIST_ITEMS_FAIL });
    }
};

// Agregar ítem
export const add_wishlist_item = product_id => async dispatch => {
    if (!localStorage.getItem('access')) return;

    const body = JSON.stringify({ product_id });

    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/wishlist/add-item`,
            body,
            configWithToken()
        );

        dispatch({
            type: ADD_WISHLIST_ITEM_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({ type: ADD_WISHLIST_ITEM_FAIL });
    }
};

// Obtener total
export const get_wishlist_item_total = () => async dispatch => {
    if (!localStorage.getItem('access')) return;

    try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/wishlist/get-item-total`,
            configWithToken()
        );

        dispatch({
            type: GET_WISHLIST_ITEM_TOTAL_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        dispatch({ type: GET_WISHLIST_ITEM_TOTAL_FAIL });
    }
};

// Remover ítem
export const remove_wishlist_item = (product_id) => async dispatch => {
    if (!localStorage.getItem('access')) return;

    const config = {
        ...configWithToken(),
        data: { product_id } 
    };

    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/wishlist/remove-item`, config);

        dispatch({
            type: REMOVE_WISHLIST_ITEM_SUCCESS,
            payload: product_id  
        });
        console.log('🚀 Producto eliminado del wishlist:', product_id);
    } catch (err) {
        dispatch({ type: REMOVE_WISHLIST_ITEM_FAIL });
    }
};

export const clear_wishlist = () => dispatch => {
    dispatch({ type: CLEAR_WISHLIST });
};
