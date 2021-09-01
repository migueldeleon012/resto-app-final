import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

function DisplayTotal() {
  const cart = useSelector(state => state.cart)
  const [total, setTotal] = useState(0)

  useEffect(() =>{
    let totalPrice = cart.map(item => item.price*item.qty )
    let result = 0
    for(const item of totalPrice){
      result+= item
    }
    setTotal(result)
  }, [cart])

  return (
    <div className="total">
      <div className="total__btn">
        <button className="order">Order now!</button>
      </div>
      <div>
      <h3>Total:</h3>
      <p>Php {total}.00</p>
      </div>

    </div>
  )
}

export default DisplayTotal
