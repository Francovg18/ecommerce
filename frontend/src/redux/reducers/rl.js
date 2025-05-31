import {
    TRAIN_SENTIMENT_MODEL_SUCCESS,
    TRAIN_SENTIMENT_MODEL_FAIL,
    GET_SENTIMENT_PREDICTION_SUCCESS,
    GET_SENTIMENT_PREDICTION_FAIL
} from "../actions/types";

const initialState = {
    sentiment_model_message: null,
    sentiment_prediction: null,
    sentiment_probability: null
};

export default function ml(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case TRAIN_SENTIMENT_MODEL_SUCCESS:
            return { ...state, sentiment_model_message: payload };

        case TRAIN_SENTIMENT_MODEL_FAIL:
            return { ...state, sentiment_model_message: null };

        case 'GET_SENTIMENT_PREDICTION_SUCCESS':
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
                sentiment_probability: null
            };

        default:
            return state;
    }
}
