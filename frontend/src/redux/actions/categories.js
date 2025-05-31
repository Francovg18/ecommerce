import axios from 'axios';
import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAIL,
} from './types';

export const get_categories = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/category/categories`, config);
        
        if (res.status >= 200 && res.status < 300) {
            dispatch({
                type: GET_CATEGORIES_SUCCESS,
                payload: res.data
            });
        } else {
            console.error('Error: Unexpected response status', res.status);
            dispatch({
                type: GET_CATEGORIES_FAIL
            });
        }
    } catch (err) {
        console.error('Error fetching categories:', err.message);
        dispatch({
            type: GET_CATEGORIES_FAIL
        });
    }
};
