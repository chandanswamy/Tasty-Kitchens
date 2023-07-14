import {AiFillCloseCircle} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

import Header from '../Header'
import Footer from '../Footer'
import EmptyCartView from '../EmptyCartView'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartData, removeAllCartItems} = value
      const tabActive = 'cart-active'
      const showEmptyView = cartData.length === 0
      const onClickRemoveAllBtn = () => {
        removeAllCartItems()
      }

      return (
        <div className="cart-route">
          <Header tabActive={tabActive} />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <button
                  type="button"
                  className="remove-all-btn"
                  onClick={onClickRemoveAllBtn}
                >
                  Remove All
                  <AiFillCloseCircle size={20} />
                </button>
                <ul className="heading-container">
                  <li className="cart-heading">Item</li>
                  <li className="cart-heading">Quantity</li>
                  <li className="cart-heading">Price</li>
                </ul>
                <CartListView />
                <CartSummary />
              </div>
            )}
          </div>
          <Footer />
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
