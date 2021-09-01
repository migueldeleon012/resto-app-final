import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DisplayTotal from './DisplayTotal';

const Cart = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const products = useSelector((state) => state.products);

  const dispatch = useDispatch();

  const onMinusQuantityButtonClickHanlder = async (e) => {
    const itemFound = currentUser?.cartItems.find(
      (cartItem) => cartItem._id === e.target.dataset.id
    );
    if (itemFound?.count === 1) {
      await axios.delete(
        `http://localhost:8080/users/${currentUser._id}/${e.target.dataset.id}`
      );
    } else {
      await axios.put(
        `http://localhost:8080/users/increaseCount/${currentUser._id}/${e.target.dataset.id}`,
        { count: itemFound.count - 1 }
      );
    }
    await axios
      .get(`http://localhost:8080/users/${currentUser?._id}`)
      .then((res) => {
        dispatch({ type: 'SET_USER', payload: res.data });
      });
  };

  const onPlusQuantityButtonClickHanlder = async (e) => {
    const itemFound = currentUser?.cartItems.find(
      (cartItem) => cartItem._id === e.target.dataset.id
    );
    await axios.put(
      `http://localhost:8080/users/increaseCount/${currentUser._id}/${e.target.dataset.id}`,
      { count: itemFound.count + 1 }
    );
    await axios
      .get(`http://localhost:8080/users/${currentUser?._id}`)
      .then((res) => {
        dispatch({ type: 'SET_USER', payload: res.data });
      });
  };

  const onDeleteCartButtonClickHandler = async (e) => {
    await axios.delete(
      `http://localhost:8080/users/${currentUser._id}/${e.target.dataset.id}`
    );
    await axios
      .get(`http://localhost:8080/users/${currentUser?._id}`)
      .then((res) => {
        dispatch({ type: 'SET_USER', payload: res.data });
      });
  };

  useEffect(() => {
    const deleteOldItems = () => {
      let oldItems = currentUser?.cartItems?.filter(
        (cartItem) => cartItem.name === undefined
      );
      oldItems.forEach((oldItem) => {
        axios.delete(
          `http://localhost:8080/users/${currentUser._id}/${oldItem.id}`
        );
      });
    };
    deleteOldItems();
  });

  if (currentUser?.cartItems?.length === 0) {
    return (
      <div className='container__cart'>
        <h3>No items in the cart</h3>
      </div>
    );
  }

  return (
    <div className='container__cart'>
      <h2>My Cart</h2>
      <div className='container__cart__placeholder'>
        {currentUser?.cartItems
          ?.map((item) => ({
            ...products.find((product) => product._id === item._id),
            count: item.count,
          }))
          .filter((item) => item.name !== undefined)
          ?.map((item) => (
            <div className='container__cart__item' key={item._id}>
              <div className='img'>
                <img src={item.image} alt={item.name} />
              </div>
              <div className='specs'>
                <div className='desc'>
                  <p>{item.name}</p>
                  <div className='btns'>
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
                    className='delete'
                    onClick={(e) => onDeleteCartButtonClickHandler(e)}
                    data-id={item._id}
                  >
                    Delete
                  </button>
                </div>
                <div className='subtotal'>
                  <h4>Subtotal</h4>
                  <p>
                    Php {item.count * item.price}
                    .00
                  </p>
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
