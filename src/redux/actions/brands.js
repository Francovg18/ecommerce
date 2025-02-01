import axios from 'axios';
import {
    GET_BRANDS_SUCCESS,
    GET_BRANDS_FAIL,
} from './types';

export const get_brands = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/brand/brands`, config);
        
        if (res.status >= 200 && res.status < 300) {
            dispatch({
                type: GET_BRANDS_SUCCESS,
                payload: res.data // Asegúrate de que tu API devuelva un objeto con `brands`
            });
        } else {
            console.error('Error: Unexpected response status', res.status);
            dispatch({
                type: GET_BRANDS_FAIL
            });
        }
    } catch (err) {
        console.error('Error fetching brands:', err.message);
        dispatch({
            type: GET_BRANDS_FAIL
        });
    }
};
