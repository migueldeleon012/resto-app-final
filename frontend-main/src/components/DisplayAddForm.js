import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { onlyUnique } from '../helper';

const DisplayForm = () => {
  const products = useSelector((state) => state.products);

  const [newItem, setNewItem] = useState({
    name: '',
    price: 0,
    category: 'Other',
    image: '',
    other: '',
  });

  const dispatch = useDispatch();

  const [comment, setComment] = useState('');
  const [className, setClassName] = useState('');

  const handleInputChange = (e) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };

  const onAddButtonClickHandler = async () => {
    if (
      newItem.name === '' ||
      newItem.price === '' ||
      newItem.category === '' ||
      newItem.image === '' ||
      (newItem.category === 'Other' && newItem.other === '')
    ) {
      setComment('please do not leave any input field empty');
      setClassName('red');
    } else if (newItem.price <= 0) {
      setComment('please do not give free products');
      setClassName('red');
    } else {
      if (products.find((product) => product.name === newItem.name)) {
        setComment('Product Exists');
        setClassName('red');
      } else {
        setComment('Product successfully added');
        setClassName('green');
        await axios.post('http://localhost:8080/items', {
          name: newItem.name,
          price: newItem.price,
          image: newItem.image,
          category:
            newItem.category === 'Other' ? newItem.other : newItem.category,
        });
        await axios.get('http://localhost:8080/items').then((res) => {
          dispatch({ type: 'INIT_PRODUCTS', payload: res.data });
        });
      }
    }
  };

  return (
    <div className='container__inputs'>
      <h2>Add Product</h2>
      <p className={className}>{comment}</p>
      <div className='container__inputs__input'>
        <label>Name</label>
        <input
          type='text'
          name='name'
          value={newItem.name}
          onChange={handleInputChange}
        />
      </div>

      <div className='container__inputs__input'>
        <label>Price</label>
        <input
          type='number'
          name='price'
          value={newItem.price}
          onChange={handleInputChange}
        />
      </div>

      <div className='container__inputs__input'>
        <label>Image</label>
        <input
          type='text'
          name='image'
          value={newItem.image}
          onChange={handleInputChange}
        />
      </div>

      <div className='container__inputs__input category'>
        <select
          value={newItem.category}
          onChange={handleInputChange}
          name='category'
        >
          <option value='' disabled>
            Select Category
          </option>
          {products
            ?.map((product) => product.category)
            ?.filter(onlyUnique)
            ?.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          <option value='Other'>Other</option>
        </select>
        {newItem.category === 'Other' && (
          <div className='container__inputs__input'>
            <label>Other</label>
            <input
              type='text'
              name='other'
              value={newItem.other}
              onChange={handleInputChange}
            />
          </div>
        )}
      </div>
      <button onClick={onAddButtonClickHandler}>Add Product</button>
    </div>
  );
};

export default DisplayForm;
