import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './hocs/PrivateRoute'; 
import Home from './contenedores/Home';
import Error404 from './contenedores/errors/Error404';
import Signup from './contenedores/auth/Signup';
import Login from './contenedores/auth/Login';
import Activate from './contenedores/auth/Activate';
import ResetPassword from './contenedores/auth/ResetPassword';
import ResetPasswordConfirm from './contenedores/auth/ResetPasswordConfirm';
import Shop from './contenedores/Shop';
import ProductDetail from './contenedores/pages/productDetail';
import Search from './contenedores/pages/Search';
import Cart from './contenedores/pages/Cart';
import Checkout from './contenedores/pages/Checkout';
import ThankYou from './contenedores/pages/ThankYou';
import Dashboard from './contenedores/pages/Dashboard';
import DashboardPayments from './contenedores/pages/DashboardPayments';
import DashboardPaymentDetail from './contenedores/pages/DashboardPaymentDetail';
import DashboardProfile from './contenedores/pages/DashboardProfile';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Ruta para página no encontrada */}
          <Route path="*" element={<Error404 />} />

          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/activate/:uid/:token" element={<Activate />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/thankyou" element={<ThankYou />} />

          {/* Rutas protegidas */}
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/dashboard/payments"
            element={
              <PrivateRoute>
                <DashboardPayments />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/payment/:transaction_id"
            element={
              <PrivateRoute>
                <DashboardPaymentDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <PrivateRoute>
                <DashboardProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
