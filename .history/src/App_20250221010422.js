import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Home from './containers/Home';
import Error404 from './containers/errors/Error404';

import Signup from './containers/auth/Signup';
import Login from './containers/auth/Login';
import Activate from './containers/auth/Activate';
import ResetPassword from './containers/auth/ResetPassword';
import ResetPasswordConfirm from './containers/auth/ResetPasswordConfirm';

import Shop from './containers/Shop';
import ProductDetail from './containers/pages/products/productDetail.jsx';

import Search from './containers/pages/Search';
import Cart from './containers/pages/checkout/Cart.jsx';
import Checkout from './containers/pages/checkout/Checkout.jsx';
import ThankYou from './containers/pages/checkout/ThankYou.jsx';
import Dashboard from './containers/pages/dashboard/Dashboard.jsx';
import DashboardPayments from './containers/pages/dashboard/DashboardPayments.jsx';
import DashboardPaymentDetail from './containers/pages/dashboard/DashboardPaymentDetail.jsx';
import DashboardProfile from './containers/pages/dashboard/DashboardProfile.jsx';
import ContactUs from './containers/ContactUs';
import About from './containers/About.jsx';
import Help from './containers/Help.jsx';
import Products from './containers/pages/products/Products.jsx';
import News from './containers/News';
import Brands from './containers/Brands';
import Contacto from './containers/pages/contact/Contacto.jsx';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Error Display */}
          <Route path="*" element={<Error404/>}/>

          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/cart' element={<Cart/>}/>
          <Route exact path='/checkout' element={<Checkout/>}/>
          
          {/* Authentication */}
          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/activate/:uid/:token' element={<Activate/>}/>
          <Route exact path='/reset_password' element={<ResetPassword/>} />
          <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>} />

          <Route exact path='/product/:productId' element={<ProductDetail/>}/>
          <Route exact path='/search' element={<Search/>}/>

          <Route exact path='/thankyou' element={<ThankYou/>}/>
          <Route exact path='/products' element={<Products/>}/>
          
          <Route exact path='/dashboard' element={<Dashboard/>}/>
          <Route exact path='/dashboard/payments' element={<DashboardPayments/>}/>
          <Route exact path='/dashboard/payment/:transaction_id' element={<DashboardPaymentDetail/>}/>
          <Route exact path='/dashboard/profile' element={<DashboardProfile/>}/>

          <Route exact path='/shop' element={<Shop/>}/>
          <Route exact path='/contactus' element={<ContactUs/>}/>
          <Route exact path='/about' element={<About/>}/>
          <Route exact path='/help' element={<Help/>}/>
          <Route exact path='/news' element={<News/>}/>
          <Route exact path='/brands' element={<Brands/>}/>
          <Route exact path='/contacto' element={<Contacto/>}/>


        </Routes>
      </Router>
    </Provider>
  );
}

export default App;