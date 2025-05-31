import Layout from "../../../hocs/Layout"
import { useState } from "react";
import { connect } from "react-redux"
import { setAlert } from "../../../redux/actions/alert";
import { useDispatch } from "react-redux";

import {
    remove_item,
    update_item,
    get_items,
    get_total,
    get_item_total
} from "../../../redux/actions/cart";
import {
    remove_wishlist_item,
} from "../../../redux/actions/wishlist";
import { useEffect } from "react";
import CartItem from "../../../components/cart/CartItem";
import { Link } from "react-router-dom";
import { get_wishlist_items } from "../../../redux/actions/wishlist";
const Cart = ({
  get_items,
  get_total,
  get_item_total,
  isAuthenticated,
  items,
  compare_amount,
  total_items,
  remove_item,
  update_item,
  setAlert,
  wishlist_items,
  user 
}) => {
    const dispatch = useDispatch();

    const [render, setRender] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        get_items();
        get_total();
        get_item_total();
        dispatch(get_wishlist_items());
    }, [render, get_items, get_total, get_item_total, dispatch]);
    
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
    const showItems = () => {
      return (
          <div>
              {items &&
                  items.length !== 0 &&
                  items.map((item, index) => {
                      let count = item.count;
                      return (
                          <div key={index}>
                              <CartItem
                                  item={item}
                                  count={count}
                                  update_item={update_item}
                                  remove_item={remove_item}
                                  render={render}
                                  setRender={setRender}
                                  setAlert={setAlert}
                              />
                          </div>
                      );
                  })}
          </div>
      );
  };



    const checkoutButton = () => {
        if (total_items < 1) {
            return(
                <>
                <Link
                to='/shop'
                
            >
                <button
                className="w-full bg-midnight-blue border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-purple-night focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-night"
            >
                Buscar items
                </button>
            </Link>
            </>
            )
        } else if (!isAuthenticated) {
            return(<>
            <Link
                to='/login'
                
            >
                <button
                className="w-full bg-midnight-blue border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-purple-night focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-night"
            >
                Login
                </button>
            </Link>
            </>)
            
        } else {
            return(
                <>
                <Link
                to='/checkout'>
                 <button
                className="w-full bg-midnight-blue border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-purple-night focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-night"
            >
                   Verificar
                </button>
            </Link>
                </>
            )
           
        }
    }

    

    return (
      <Layout>
      <div className="bg-white">
          <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Productos en Carrito ({total_items})
              </h1>

              <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                  <section aria-labelledby="cart-heading" className="lg:col-span-7">
                      <h2 id="cart-heading" className="sr-only">Items in your shopping cart</h2>
                      <ul className="border-t border-b border-gray-200 divide-y divide-gray-200">
                          {showItems()}
                      </ul>
                  </section>

                  <section
                      aria-labelledby="summary-heading"
                      className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
                  >
                      <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                          Resumen del pedido
                      </h2>

                      <dl className="mt-6 space-y-4">
                          <div className="flex items-center justify-between">
                              <dt className="text-sm text-gray-600">Subtotal</dt>
                              <dd className="text-sm font-medium text-gray-900">{compare_amount.toFixed(2)} Bs</dd>
                          </div>

                          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                              <dt className="text-sm text-gray-600">Estimación de envío</dt>
                              <dd className="text-sm font-medium text-gray-900">0 Bs</dd>
                          </div>

                          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                              <dt className="text-sm text-gray-600">Estimación de Impuestos</dt>
                              <dd className="text-sm font-medium text-gray-900">0 Bs</dd>
                          </div>

                          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                              <dt className="text-base font-medium text-gray-900">Total Pedido</dt>
                              <dd className="text-base font-medium text-gray-900">{totalPedido.toFixed(2)} Bs</dd>
                          </div>
                      </dl>

                      <div className="mt-6">{checkoutButton()}</div>
                  </section>
              </div>
          </div>
      </div>

  </Layout>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.Auth.isAuthenticated,
    items: state.Cart.items,
    wishlist_items: state.Wishlist.items,
    amount: state.Cart.amount,
    compare_amount: state.Cart.compare_amount,
    total_items: state.Cart.total_items,
    user: state.Auth.user
})

export default connect(mapStateToProps,{
    get_items,
    get_total,
    get_item_total,
    remove_item,
    update_item,
    setAlert,
    remove_wishlist_item,
    get_wishlist_items 
}) (Cart)