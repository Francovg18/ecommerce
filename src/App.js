import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

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
import ContactUs from './contenedores/pages/ContactUs';

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

          <Route exact path='/shop' element={<Shop/>}/>
          <Route exact path='/product/:productId' element={<ProductDetail/>}/>
          <Route exact path='/search' element={<Search/>}/>

          <Route exact path='/thankyou' element={<ThankYou/>}/>
          
          <Route exact path='/dashboard' element={<Dashboard/>}/>
          <Route exact path='/dashboard/payments' element={<DashboardPayments/>}/>
          <Route exact path='/dashboard/payment/:transaction_id' element={<DashboardPaymentDetail/>}/>
          <Route exact path='/dashboard/profile' element={<DashboardProfile/>}/>
          <Route exact path='/contactus' element={<ContactUs/>}/>

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;