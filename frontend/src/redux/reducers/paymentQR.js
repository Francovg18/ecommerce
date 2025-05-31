import {
  SET_AMOUNT,
  SET_REFERENCE,
  SET_LOADING,
  SET_QR_DATA,
  SET_PAYMENT_STATUS,
  SET_CSRF_TOKEN
} from '../actions/types.js';

const initialState = {
  amount: "",
  reference: "",
  qrData: null,
  loading: false,
  paymentStatus: "pending",
  csrfToken: "",
};

export default function PaymentReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_AMOUNT:
      return { ...state, amount: payload };
    case SET_REFERENCE:
      return { ...state, reference: payload };
    case SET_LOADING:
      return { ...state, loading: payload };
    case SET_QR_DATA:
      return { ...state, qrData: payload, paymentStatus: "pending" };
    case SET_PAYMENT_STATUS:
      return { ...state, paymentStatus: payload };
    case SET_CSRF_TOKEN:
      return { ...state, csrfToken: payload };
    default:
      return state;
  }
}
