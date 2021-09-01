import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function DisplayTotal() {
  const currentUser = useSelector((state) => state.currentUser);

  return (
    <div className='total'>
      <div className='total__btn'>
        <button className='order'>Order now!</button>
      </div>
      <div>
        <h3>Total:</h3>
        <p>
          Php{' '}
          {currentUser.cartItems
            .map((cartItem) => cartItem.price * cartItem.count)
            .reduce((previous, current) => previous + current)}
          .00
        </p>
      </div>
    </div>
  );
}

export default DisplayTotal;
