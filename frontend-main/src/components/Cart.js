import axios from 'axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DisplayTotal from './DisplayTotal';

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    console.log(cart);
  }, []);

  const onMinusQuantityButtonClickHanlder = (e) => {
    console.log(e.target.dataset.id);
    // axios.put(`http://localhost:8080/items/${e.target.dataset.id}`)
  };

  const onPlusQuantityButtonClickHanlder = (e) => {
    console.log(e.target.dataset.id);
    // axios.put(`http://localhost:8080/items/${e.target.dataset.id}`)
  };

  const onDeleteCartButtonClickHandler = (e) => {
    console.log(e.target.dataset.id);
    //axios.delete(`http://localhost:8080/items/${e.target.dataset.id}`)
  };

  if (cart.length === 0) {
    return (
      <div className="container__cart">
        <h3>No items in the cart</h3>
      </div>
    );
  }
  return (
    <div className="container__cart">
      <h2>My Cart</h2>
      <div className="container__cart__placeholder">
        {cart.map((item) => (
          <div className="container__cart__item">
            <div className="img">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="specs">
              <div className="desc">
                <p>{item.name}</p>
                <div className="btns">
                  <button
                    onClick={(e) => onPlusQuantityButtonClickHanlder(e)}
                    data-id={item._id}
                  >
                    +
                  </button>
                  <button
                    onClick={(e) => onMinusQuantityButtonClickHanlder(e)}
                    data-id={item._id}
                  >
                    -
                  </button>
                  <span>{item.count}</span>
                </div>
                <button
                  className="delete"
                  onClick={(e) => onDeleteCartButtonClickHandler(e)}
                  data-id={item._id}
                >
                  Delete
                </button>
              </div>
              <div className="subtotal">
                <h4>Subtotal</h4>
                <p>Php {item.price * item.count}.00</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <DisplayTotal />
    </div>
  );
};

export default Cart;
