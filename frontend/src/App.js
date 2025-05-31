import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import InstallButton from "./InstallButton";
// 🔁 Lazy imports
const Home = lazy(() => import('./containers/Home'));
const Error404 = lazy(() => import('./containers/errors/Error404'));
const Signup = lazy(() => import('./containers/auth/Signup'));
const Login = lazy(() => import('./containers/auth/Login'));
const Activate = lazy(() => import('./containers/auth/Activate'));
const ResetPassword = lazy(() => import('./containers/auth/ResetPassword'));
const ResetPasswordConfirm = lazy(() => import('./containers/auth/ResetPasswordConfirm'));
const Shop = lazy(() => import('./containers/Shop'));
const ProductDetail = lazy(() => import('./containers/pages/products/productDetail'));
const Search = lazy(() => import('./containers/pages/Search'));
const Cart = lazy(() => import('./containers/pages/checkout/Cart'));
const Checkout = lazy(() => import('./containers/pages/checkout/Checkout'));
const ThankYou = lazy(() => import('./containers/pages/checkout/ThankYou'));
const Dashboard = lazy(() => import('./containers/pages/dashboard/Dashboard'));
const DashboardPayments = lazy(() => import('./containers/pages/dashboard/DashboardPayments'));
const DashboardPaymentDetail = lazy(() => import('./containers/pages/dashboard/DashboardPaymentDetail'));
const DashboardProfile = lazy(() => import('./containers/pages/dashboard/DashboardProfile'));
const ContactUs = lazy(() => import('./containers/ContactUs'));
const About = lazy(() => import('./containers/About'));
const Help = lazy(() => import('./containers/Help'));
const Products = lazy(() => import('./containers/pages/products/Products'));
const News = lazy(() => import('./containers/News'));
const Brands = lazy(() => import('./containers/Brands'));
const UserRegister = lazy(() => import('./containers/pages/contact/UserRegister'));
const Contacto = lazy(() => import('./containers/pages/contact/Contacto'));
const Wishlist = lazy(() => import('./containers/pages/checkout/Wishlist'));
const SentimentAnalysis = lazy(() => import('./containers/ai/SentimentAnalysis'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <InstallButton />
        <Suspense fallback={<div className="text-center mt-10">Cargando módulo...</div>}>
          <Routes>
            {/* General */}
            <Route path="*" element={<Error404 />} />
            <Route path="/" element={<Home />} />

            {/* Auth */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/activate/:uid/:token" element={<Activate />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />

            {/* Ecommerce */}
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/search" element={<Search />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/payments" element={<DashboardPayments />} />
            <Route path="/dashboard/payment/:transaction_id" element={<DashboardPaymentDetail />} />
            <Route path="/dashboard/profile" element={<DashboardProfile />} />

            {/* Info */}
            <Route path="/about" element={<About />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/user_register" element={<UserRegister />} />
            <Route path="/help" element={<Help />} />
            <Route path="/news" element={<News />} />
            <Route path="/brands" element={<Brands />} />

            {/* ai */}
            <Route path="/ai/sentiment-analysis" element={<SentimentAnalysis />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
