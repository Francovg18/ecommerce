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
                brands: payload.brands
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
