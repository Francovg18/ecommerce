import axios from 'axios';
import {
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAIL,
    GET_ORDER_DETAIL_SUCCESS,
    GET_ORDER_DETAIL_FAIL,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAIL,
    GET_TOTAL_SUCCESS,
    GET_TOTAL_FAIL,
    GET_ITEM_TOTAL_SUCCESS,
    GET_ITEM_TOTAL_FAIL
} from './types';


// Acción para listar órdenes del usuario
export const list_orders = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/get-orders`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_ORDERS_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({ type: GET_ORDERS_FAIL });
            }
        } catch(err) {
            dispatch({ type: GET_ORDERS_FAIL });
        }
    }
};


// obtener el detalle de una orden específica
export const get_order_detail = transactionId => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/orders/get-order/${transactionId}`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_ORDER_DETAIL_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({ type: GET_ORDER_DETAIL_FAIL });
            }
        } catch(err) {
            dispatch({ type: GET_ORDER_DETAIL_FAIL });
        }
    }
};


// obtener los ítems del carrito
export const get_items = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart/get-items`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_ITEMS_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({ type: GET_ITEMS_FAIL });
            }
        } catch(err) {
            dispatch({ type: GET_ITEMS_FAIL });
        }
    }
};


// obtener el total del carrito
export const get_total = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart/get-total`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_TOTAL_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({ type: GET_TOTAL_FAIL });
            }
        } catch(err) {
            dispatch({ type: GET_TOTAL_FAIL });
        }
    }
};


// obtener el total de ítems en el carrito
export const get_item_total = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/cart/get-item-total`, config);

            if (res.status === 200) {
                dispatch({
                    type: GET_ITEM_TOTAL_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({ type: GET_ITEM_TOTAL_FAIL });
            }
        } catch(err) {
            dispatch({ type: GET_ITEM_TOTAL_FAIL });
        }
    }
};

