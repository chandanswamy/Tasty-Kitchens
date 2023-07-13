import Header from '../Header'
import Footer from '../Footer'

const Cart = () => {
  const tabActive = 'cart-active'
  return (
    <>
      <Header tabActive={tabActive} />
      <div>Cart</div>
      <Footer />
    </>
  )
}

export default Cart
