import {
    TRAIN_SENTIMENT_MODEL_SUCCESS,
    TRAIN_SENTIMENT_MODEL_FAIL,
    GET_SENTIMENT_PREDICTION_SUCCESS,
    GET_SENTIMENT_PREDICTION_FAIL,
    TRAIN_EMOTION_MODEL_SUCCESS,
    TRAIN_EMOTION_MODEL_FAIL,
    EMOTION_PREDICTION_SUCCESS,
    EMOTION_PREDICTION_FAIL
} from './types';
import { getCookie } from '../../utils/csrf'; 
import axios from 'axios';

const SENTIMENT_API_URL = `${process.env.REACT_APP_API_URL}/api/ml/sentimiento`;
const EMOTION_API_URL = `${process.env.REACT_APP_API_URL}/api/emotionstate`;

// Entrenar modelo de sentimiento
export const train_sentiment_model = () => async dispatch => {
    try {
        const res = await axios.get(`${SENTIMENT_API_URL}/train`, {
            headers: { Accept: 'application/json' }
        });

        dispatch({
            type: TRAIN_SENTIMENT_MODEL_SUCCESS,
            payload: res.data.message
        });
    } catch (error) {
        console.error("Error entrenando modelo de sentimiento:", error);
        dispatch({ type: TRAIN_SENTIMENT_MODEL_FAIL });
    }
};

// Obtener predicción de sentimiento
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

        const res = await axios.post(`${SENTIMENT_API_URL}/predict`, body, config);

        dispatch({
            type: GET_SENTIMENT_PREDICTION_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        console.error("Error en predicción:", error);
        dispatch({ type: GET_SENTIMENT_PREDICTION_FAIL });
    }
};

// Entrenar modelo emocional
export const train_emotion_model = () => async dispatch => {
    try {
        const res = await axios.get(`${EMOTION_API_URL}/train`, {
            headers: { Accept: 'application/json' }
        });
        dispatch({
            type: TRAIN_EMOTION_MODEL_SUCCESS,
            payload: res.data.message
        });
    } catch (err) {
        dispatch({
            type: TRAIN_EMOTION_MODEL_FAIL,
            payload: 'Error al entrenar el modelo emocional'
        });
    }
};

// ✅ Obtener predicción emocional (versión corregida)
export const get_emotion_prediction = (respuestas) => async dispatch => {
    try {
        const csrfToken = getCookie('csrftoken');

        const res = await axios.post(
            `${EMOTION_API_URL}/predict`,
            { respuestas },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                withCredentials: false
            }
        );

        const data = res.data;

        dispatch({
            type: EMOTION_PREDICTION_SUCCESS,
            payload: data
        });

        return { type: EMOTION_PREDICTION_SUCCESS, payload: data }; // ✅ necesario
    } catch (err) {
        console.error("Error al predecir estado emocional:", err.response?.data || err.message);

        dispatch({
            type: EMOTION_PREDICTION_FAIL,
            payload: 'Error al predecir el estado emocional'
        });

        return { type: EMOTION_PREDICTION_FAIL, error: true }; // ✅ necesario
    }
};
