import './index.css'
import {useContext, useState} from 'react'
import CartContext from '../../context/CartContext'

const paymentOptionList = [
  {id: 'CARD', displayText: 'Card', isDisabled: true},
  {id: 'NET BANKING', displayText: 'Net Banking', isDisabled: true},
  {id: 'UPI', displayText: 'UPI', isDisabled: true},
  {id: 'WALLET', displayText: 'Wallet', isDisabled: true},
  {id: 'CASH ON DELIVERY', displayText: 'Cash On Delivery', isDisabled: false},
]

const Payment = () => {
  const {cartList} = useContext(CartContext)
  const [payMethod, setPaymentMethod] = useState('')
  const [isOrderPlaced, SetIsOrderPlaced] = useState(false)
  const updatePaymentMethod = event => {
    const {id} = event.target
    setPaymentMethod(id)
  }
  const onPlaceOrder = () => SetIsOrderPlaced(true)
  const getTotalPrice = () =>
    cartList.reduce((acc, item) => acc + item.quantity * item.price, 0)
  const renderPaymentMethodsInput = () => (
    <ul className="unorder-list">
      {paymentOptionList.map(eachMethod => (
        <li key={eachMethod.id}>
          <input
            type="radio"
            id={eachMethod.id}
            name="paymentMethod"
            disabled={eachMethod.isDisabled}
            onChange={updatePaymentMethod}
          />
          <label htmlFor={eachMethod.id}>{eachMethod.displayText}</label>
        </li>
      ))}
    </ul>
  )
  return (
    <div>
      {isOrderPlaced ? (
        <p>Your order has been placed successfully</p>
      ) : (
        <>
          <h1>Payments Details</h1>
          <p>Payment Method</p>
          {renderPaymentMethodsInput()}
          <div>
            <p>Order details:</p>
            <p>Quantity:{cartList.length}/-</p>
            <p>Total Price: RS{getTotalPrice()}/-</p>
          </div>
          <button
            disabled={payMethod === ''}
            type="button"
            onClick={onPlaceOrder}
          >
            Confirm Order
          </button>
        </>
      )}
    </div>
  )
}

export default Payment
