import { useSelector } from 'react-redux';

function DisplayTotal() {
  const currentUser = useSelector((state) => state.currentUser);
  const products = useSelector((state) => state.products);

  return (
    <div className='total'>
      <div className='total__btn'>
        <button className='order'>Order now!</button>
      </div>
      <div>
        <h3>Total:</h3>
        <p>
          Php{' '}
          {currentUser?.cartItems
            ?.map((item) => ({
              ...products.find((product) => product._id === item._id),
              count: item.count,
            }))
            .filter((item) => item.name !== undefined)
            .map((cartItem) => cartItem.price * cartItem.count)
            .reduce((previous, current) => previous + current)}
          .00
        </p>
      </div>
    </div>
  );
}

export default DisplayTotal;
