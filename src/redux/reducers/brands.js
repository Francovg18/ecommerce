import {
    GET_BRANDS_SUCCESS,
    GET_BRANDS_FAIL
} from '../actions/types';

const initialState = {
    brands: null
};

export default function Brands(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_BRANDS_SUCCESS:
            return {
                ...state,
                brands: payload.brands // Ajusta si `payload` tiene otra estructura
            };
        case GET_BRANDS_FAIL:
            return {
                ...state,
                brands: null
            };
        default:
            return state;
    }
}
