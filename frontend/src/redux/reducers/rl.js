import {
    TRAIN_SENTIMENT_MODEL_SUCCESS,
    TRAIN_SENTIMENT_MODEL_FAIL,
    GET_SENTIMENT_PREDICTION_SUCCESS,
    GET_SENTIMENT_PREDICTION_FAIL,
    TRAIN_EMOTION_MODEL_SUCCESS,
    TRAIN_EMOTION_MODEL_FAIL,
    EMOTION_PREDICTION_SUCCESS,
    EMOTION_PREDICTION_FAIL
} from "../actions/types";

const initialState = {
    // Estado para análisis de sentimiento
    sentiment_model_message: null,
    sentiment_prediction: null,
    sentiment_probability: null,
    faltas_agresivas: null,
    suspendido: null,

    // Estado para análisis emocional
    emotion_model_message: null,
    emotion_prediction: null,
    emotion_probability: null
};

export default function ml(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        // SENTIMIENTO
        case TRAIN_SENTIMENT_MODEL_SUCCESS:
            return { ...state, sentiment_model_message: payload };

        case TRAIN_SENTIMENT_MODEL_FAIL:
            return { ...state, sentiment_model_message: null };

        case GET_SENTIMENT_PREDICTION_SUCCESS:
            return {
                ...state,
                sentiment_prediction: payload.prediction,
                sentiment_probability: payload.prob_agresivo,
                faltas_agresivas: payload.faltas_agresivas,
                suspendido: payload.suspendido
            };

        case GET_SENTIMENT_PREDICTION_FAIL:
            return {
                ...state,
                sentiment_prediction: null,
                sentiment_probability: null,
                faltas_agresivas: null,
                suspendido: null
            };

        // EMOCIÓN
        case TRAIN_EMOTION_MODEL_SUCCESS:
            return { ...state, emotion_model_message: payload };

        case TRAIN_EMOTION_MODEL_FAIL:
            return { ...state, emotion_model_message: payload };

        case EMOTION_PREDICTION_SUCCESS:
            return {
                ...state,
                emotion_prediction: payload.estado_emocional,
                emotion_probability: payload.probabilidad || null
            };

        case EMOTION_PREDICTION_FAIL:
            return {
                ...state,
                emotion_prediction: null,
                emotion_probability: null
            };

        default:
            return state;
    }
}
