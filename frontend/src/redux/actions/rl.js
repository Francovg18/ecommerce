import {
    TRAIN_SENTIMENT_MODEL_SUCCESS,
    TRAIN_SENTIMENT_MODEL_FAIL,
    GET_SENTIMENT_PREDICTION_SUCCESS,
    GET_SENTIMENT_PREDICTION_FAIL
} from './types';

import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/api/ml/sentimiento`;

// Entrenamiento del modelo
export const train_sentiment_model = () => async dispatch => {
    try {
        const res = await axios.get(`${API_URL}/train`, {
            headers: { Accept: 'application/json' }
        });

        dispatch({
            type: TRAIN_SENTIMENT_MODEL_SUCCESS,
            payload: res.data.message
        });
    } catch (error) {
        console.error("Error entrenando modelo:", error);
        dispatch({ type: TRAIN_SENTIMENT_MODEL_FAIL });
    }
};

// Predicción de sentimiento/emoción
export const get_sentiment_prediction = (comment) => async dispatch => {
    try {
        const token = localStorage.getItem('access');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `JWT ${token}`
            }
        };

        const body = JSON.stringify({ comment });

        const res = await axios.post(`${API_URL}/predict`, body, config);

        dispatch({
            type: GET_SENTIMENT_PREDICTION_SUCCESS,
            payload: res.data  // incluye prediction y probability
        });
    } catch (error) {
        console.error("Error en predicción:", error);
        dispatch({ type: GET_SENTIMENT_PREDICTION_FAIL });
    }
};
