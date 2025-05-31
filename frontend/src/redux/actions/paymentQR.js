import axios from 'axios';
import {
  SET_AMOUNT,
  SET_REFERENCE,
  SET_LOADING,
  SET_QR_DATA,
  SET_PAYMENT_STATUS
} from './types.js';

export const set_amount = (amount) => ({ type: SET_AMOUNT, payload: amount });
export const set_reference = (reference) => ({ type: SET_REFERENCE, payload: reference });

export const generate_qr_payment = (amount, reference) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });

  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
    }
  };

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/qr_payment/generate-qr/`,
      { amount, reference },
      config
    );

    if (res.data?.qr_code_url && res.data?.reference) {
      dispatch({ type: SET_QR_DATA, payload: res.data });
    }
  } catch (err) {
    alert("Fallo en la generación del QR");
  }

  dispatch({ type: SET_LOADING, payload: false });
};

export const verify_payment = () => async (dispatch, getState) => {
  const { qrData, paymentStatus } = getState().PaymentQR;
  if (!qrData || !qrData.reference || paymentStatus === "paid") return;

  const config = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `JWT ${localStorage.getItem('access')}`,
    }
  };

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/qr_payment/verify-payment/`,
      { reference: qrData.reference },
      config
    );

    if (res.data?.success) {
      dispatch({ type: SET_PAYMENT_STATUS, payload: "paid" });
    }
  } catch (err) {
    console.error("Verificación fallida:", err);
  }
};
