import Layout from '../../../hocs/Layout';
import { Navigate } from 'react-router';
import { connect } from 'react-redux';
import CartItem from '../../../components/cart/CartItem';
import { setAlert } from '../../../redux/actions/alert';
import { update_item, remove_item } from '../../../redux/actions/cart';
import { useEffect, useState } from 'react';
import { get_shipping_options } from '../../../redux/actions/shipping';
import { check_coupon } from '../../../redux/actions/coupons';
import { refresh } from '../../../redux/actions/auth';
import { get_payment_total, get_client_token, process_payment } from '../../../redux/actions/payment';
import { set_reference, generate_qr_payment, verify_payment } from "../../../redux/actions/paymentQR";
import DropIn from 'braintree-web-drop-in-react';
import { Oval } from 'react-loader-spinner';
import { cities } from '../../../helpers/fixedCity';
import ShippingForm from '../../../components/checkout/ShippingForm';
import { QRCodeCanvas } from "qrcode.react";

const Checkout = ({
  isAuthenticated,
  items,
  update_item,
  remove_item,
  setAlert,
  get_shipping_options,
  shipping,
  get_payment_total,
  get_client_token,
  process_payment,
  user,
  clientToken,
  made_payment,
  loading,
  total_after_coupon,
  total_compare_amount,
  estimated_tax,
  shipping_cost,
  check_coupon,
  coupon,
  reference,
  qrData,
  qrLoading,
  paymentStatus,
  set_reference,
  generate_qr_payment,
  verify_payment
}) => {
  const [formData, setFormData] = useState({
    full_name: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state_province_region: '',
    age: '0',
    telephone_number: '',
    coupon_name: '0',
    shipping_id: 0,
  });

  const [data, setData] = useState({ instance: {} });
  const [paymentMethod, setPaymentMethod] = useState('braintree');
  const [showQR, setShowQR] = useState(false);
  const [referencePrefix, setReferencePrefix] = useState('');
  const [render, setRender] = useState(false);

  const {
    full_name,
    address_line_1,
    address_line_2,
    city,
    state_province_region,
    age,
    telephone_number,
    coupon_name,
    shipping_id,
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const calculateTotalAmount = () => {
    if (!items || items.length === 0) return 0;
    return items.reduce((total, item) => {
      let price = item.product?.price || 0;
      if (user?.mayorista_tipo === 1) price = item.product?.price_mayorista_1 || price;
      else if (user?.mayorista_tipo === 2) price = item.product?.price_mayorista_2 || price;
      else if (user?.mayorista_tipo === 3) price = item.product?.price_mayorista_3 || price;
      return total + price * item.count;
    }, 0);
  };

  const totalPedido = calculateTotalAmount();

  const buy = async e => {
    e.preventDefault();
    let nonce = await data.instance.requestPaymentMethod();
    const applied_coupon = coupon ? coupon.name : '';
    process_payment(
      nonce,
      shipping_id,
      applied_coupon,
      full_name,
      address_line_1,
      address_line_2,
      city,
      state_province_region,
      age,
      telephone_number,
    );
  };

  const handleGenerateQR = () => {
    if (!reference.trim()) {
      setAlert('Por favor, ingresa una referencia válida.', 'error');
      return;
    }
    const amountToPay = total_after_coupon || totalPedido;
    generate_qr_payment(amountToPay, reference);
    setShowQR(true);
  };

  const completeQRPaymentPurchase = () => {
    const mockNonce = 'qr-payment-completed-' + Date.now();
    const applied_coupon = coupon ? coupon.name : '';
    process_payment(
      mockNonce,
      shipping_id,
      applied_coupon,
      full_name,
      address_line_1,
      address_line_2,
      city,
      state_province_region,
      age,
      telephone_number,
      'qr'
    );
    set_reference('');
  };
  
  const apply_coupon = async e => {
    e.preventDefault();
    check_coupon(coupon_name);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    get_shipping_options();
  }, [get_shipping_options]);

  useEffect(() => {
    get_client_token();
  }, [user, get_client_token]);

  useEffect(() => {
    if (coupon) get_payment_total(shipping_id, coupon.name);
    else get_payment_total(shipping_id, 'default');
  }, [shipping_id, coupon, get_payment_total]);

  useEffect(() => {
    if (!qrData || !qrData.reference || paymentStatus !== "pending") return;
    const interval = setInterval(() => verify_payment(), 5000);
    return () => clearInterval(interval);
  }, [qrData, paymentStatus, verify_payment]);

  useEffect(() => {
    const randomRef = 'REF-' + Math.floor(Math.random() * 1000000);
    setReferencePrefix(randomRef);
  }, []);

  if (!isAuthenticated) return <Navigate to="/" />;
  if (made_payment) return <Navigate to="/thankyou" />;

  const showItems = () => (
    <div>
      {items?.length > 0 && items.map((item, index) => (
        <CartItem
          key={index}
          item={item}
          count={item.count}
          update_item={update_item}
          remove_item={remove_item}
          render={render}
          setRender={setRender}
          setAlert={setAlert}
        />
      ))}
    </div>
  );

  const renderShipping = () => {
    if (shipping) {
      return (
        <div className='mb-5'>
          {shipping.map((shipping_option, index) => (
            <div key={index}>
              <input
                onChange={onChange}
                value={shipping_option.id}
                name='shipping_id'
                type='radio'
                required
              />
              <label className='ml-4'>
                {shipping_option.name} - Bs{shipping_option.price} ({shipping_option.time_to_delivery})
              </label>
            </div>
          ))}
        </div>
      );
    }
  };

  const renderQRPayment = () => {
    const referenceValue = reference.replace(referencePrefix + '_', '');
    return (
      <div className="mt-4">
        <div className="mb-4">
          <label htmlFor="reference" className="block text-sm font-medium text-gray-700">
            Referencia del pago
          </label>
          <input
            type="text"
            id="reference"
            placeholder="Ej. pedido-john"
            value={referenceValue}
            onChange={(e) => set_reference(`${referencePrefix}_${e.target.value}`)}
            className="w-full px-4 py-2 border rounded-lg mt-1"
          />
        </div>

        <button
          onClick={handleGenerateQR}
          disabled={qrLoading}
          className="w-full bg-midnight-blue border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-purple-night focus:outline-none"
        >
          {qrLoading ? "Generando QR..." : "Generar QR de pago"}
        </button>

        {showQR && qrData && (
          <div className="mt-6 flex flex-col items-center">
            <QRCodeCanvas
              value={`Monto: ${total_after_coupon || totalPedido} BOB, Referencia: ${reference}`}
              size={200}
            />
            <p className="mt-4 text-lg font-semibold">Referencia: {reference}</p>
            <p className="text-lg font-semibold">
              Estado:
              <span className={`ml-2 px-3 py-1 rounded-full ${
                paymentStatus === "pending" ? "bg-yellow-500" :
                paymentStatus === "paid" ? "bg-green-500" : "bg-red-500"
              } text-white`}>
                {paymentStatus === "pending" ? "Pendiente" :
                 paymentStatus === "paid" ? "Pagado" : "Fallido"}
              </span>
            </p>

            {paymentStatus === "pending" && (
              <p className="mt-2 text-sm text-gray-500">
                Escanea el QR para pagar. Verificando automáticamente...
              </p>
            )}

            {paymentStatus === "paid" && (
              <button
                onClick={completeQRPaymentPurchase}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
              >
                Verificar y completar compra
              </button>
            )}

            {paymentStatus === "failed" && (
              <p className="mt-4 text-red-600 font-medium">
                ⚠️ El pago ha fallado. Intenta nuevamente.
              </p>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderBraintreePayment = () => {
    if (!clientToken) {
      return (
        <button className="w-full bg-gray-600 text-white py-3 px-4 rounded">
          Generando token...
        </button>
      );
    }
    return (
      <>
        <DropIn
          options={{ authorization: clientToken, paypal: { flow: 'vault' } }}
          onInstance={instance => setData({ instance })}
        />
        <div className="mt-6">
          {loading ? (
            <button className="w-full bg-midnight-blue text-white py-3 px-4 rounded">
              <Oval color="#fff" height={20} width={20} />
            </button>
          ) : (
            <button
              type="submit"
              onClick={buy}
              className="w-full bg-midnight-blue hover:bg-purple-night text-white py-3 px-4 rounded"
            >
              Realizar Pedido
            </button>
          )}
        </div>
      </>
    );
  };

  const renderPaymentSelection = () => (
    <div className="mb-5">
      <h3 className="text-lg font-medium text-gray-900 mb-3">Método de pago</h3>
      <div>
        <input
          id="payment-method-qr"
          name="payment-method"
          type="radio"
          checked={paymentMethod === 'qr'}
          onChange={() => setPaymentMethod('qr')}
          className="mr-2"
        />
        <label htmlFor="payment-method-qr" className="text-gray-700">Pago con QR</label>
      </div>
      <div>
        <input
          id="payment-method-braintree"
          name="payment-method"
          type="radio"
          checked={paymentMethod === 'braintree'}
          onChange={() => setPaymentMethod('braintree')}
          className="mr-2"
        />
        <label htmlFor="payment-method-braintree" className="text-gray-700">Pago con tarjeta</label>
      </div>
    </div>
  );

  const renderPaymentInfo = () => (
    <>
      {renderPaymentSelection()}
      {paymentMethod === 'qr' ? renderQRPayment() : renderBraintreePayment()}
    </>
  );

  return (
    <Layout>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Checkout</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">Artículos en su carrito</h2>
              <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                {showItems()}
              </ul>
            </section>

            <ShippingForm
              full_name={full_name}
              address_line_1={address_line_1}
              address_line_2={address_line_2}
              city={cities}
              state_province_region={state_province_region}
              age={age}
              telephone_number={telephone_number}
              onChange={onChange}
              buy={buy}
              user={user}
              renderShipping={renderShipping}
              total_amount={totalPedido}
              total_after_coupon={total_after_coupon}
              total_compare_amount={total_compare_amount}
              estimated_tax={estimated_tax}
              shipping_cost={shipping_cost}
              shipping_id={shipping_id}
              shipping={shipping}
              renderPaymentInfo={renderPaymentInfo}
              coupon={coupon}
              apply_coupon={apply_coupon}
              coupon_name={coupon_name}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.Auth.isAuthenticated,
  user: state.Auth.user,
  items: state.Cart.items,
  total_items: state.Cart.total_items,
  shipping: state.Shipping.shipping,
  clientToken: state.Payment.clientToken,
  made_payment: state.Payment.made_payment,
  loading: state.Payment.loading,
  original_price: state.Payment.original_price,
  total_after_coupon: state.Payment.total_after_coupon,
  total_amount: state.Payment.total_amount,
  total_compare_amount: state.Payment.total_compare_amount,
  estimated_tax: state.Payment.estimated_tax,
  shipping_cost: state.Payment.shipping_cost,
  coupon: state.Coupons.coupon,
  reference: state.PaymentQR.reference,
  qrData: state.PaymentQR.qrData,
  qrLoading: state.PaymentQR.loading,
  paymentStatus: state.PaymentQR.paymentStatus,
});

export default connect(
  mapStateToProps, 
  { 
    update_item, 
    remove_item, 
    setAlert, 
    get_shipping_options, 
    refresh, 
    get_payment_total, 
    get_client_token, 
    process_payment, 
    check_coupon,
    set_reference,
    generate_qr_payment,
    verify_payment 
  }
)(Checkout);
