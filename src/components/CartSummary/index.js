import CartContext from '../../context/CartContext'
import Popup from 'reactjs-popup'
import './index.css'
import Payment from '../Payment'
const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const items = cartList.length
      const totalPrice = cartList.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0,
      )
      return (
        <>
          <div className="cart-summary-container">
            <h1 className="order-total-value">
              <span className="order-total-label">Order Total:</span> Rs{' '}
              {totalPrice}
              /-
            </h1>
            <p className="total-items">{items} Items in cart</p>

            <Popup
              trigger={
                <button
                  type="button"
                  className="button checkout-button d-sm-none"
                >
                  Checkout
                </button>
              }
              modal
              nested
            >
              {close => (
                <div className="modal">
                  <button className="close" onClick={close}>
                    &times;
                  </button>

                  <div className="actions">
                    <Popup
                      trigger={
                        <button className="pop-container">Confirm Order</button>
                      }
                      position="top left"
                    >
                      {(close = <Payment close={close} />)}
                    </Popup>
                  </div>
                </div>
              )}
            </Popup>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
