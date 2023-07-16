import {Link} from 'react-router-dom'

import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartData, removeAllCartItems} = value

      const onPaymentSuccess = () => {
        removeAllCartItems()
      }

      let total = 0
      cartData.forEach(eachCartItem => {
        total += eachCartItem.cost * eachCartItem.quantity
      })

      return (
        <div className="cart-summary-container">
          <hr className="dotted-line" />
          <div className="order-total-value">
            <h1 className="order-total-label">Order Total:</h1>
            <p className="order-total-label-amount" data-testid="total-price">
              Rs {total} /-
            </p>
          </div>
          <p className="total-items">{cartData.length} Items in cart</p>
          <Link to="/payment-success" className="button-link">
            <button
              type="button"
              className="checkout-button"
              onClick={onPaymentSuccess}
            >
              Place Order
            </button>
          </Link>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
