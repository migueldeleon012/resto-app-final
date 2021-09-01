import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { v4 as uuidv4 } from 'uuid';

const DisplayForm = () => {
  const categories = useSelector((state) => state.categories);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [comment, setComment] = useState('');
  const [className, setClassName] = useState('');

  const onNameInputChangeHandler = (e) => {
    setName(e.target.value);
  };

  const onPriceInputChangeHandler = (e) => {
    setPrice(e.target.value);
  };

  const onCategoryInputChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  const onImageInputChangeHandler = (e) => {
    setImage(e.target.value);
  };

  const onAddButtonClickHandler = async () => {
    let addedItem = {
      id: uuidv4(),
      name,
      price,
      category,
      image,
    };

    if (name === '' || price === '' || category === '' || image === '') {
      setComment('please do not leave any input field empty');
      setClassName('red');
    } else if (price <= 0) {
      setComment('please do not give free products');
      setClassName('red');
    } else {
      console.log(name, price, image, category);
      setComment('Product successfully added');
      setClassName('green');
      await axios.post('http://localhost:8080/items', addedItem);
    }
  };

  return (
    <div className="container__inputs">
      <h2>Add Product</h2>
      <p className={className}>{comment}</p>
      <div className="container__inputs__input">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => onNameInputChangeHandler(e)}
        />
      </div>

      <div className="container__inputs__input">
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => onPriceInputChangeHandler(e)}
        />
      </div>

      <div className="container__inputs__input">
        <label htmlFor="image">Image</label>
        <input
          type="text"
          id="image"
          value={image}
          onChange={(e) => onImageInputChangeHandler(e)}
        />
      </div>

      <div className="container__inputs__input category">
        <select
          id="category "
          defaultValue=""
          onChange={(e) => onCategoryInputChangeHandler(e)}
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <button onClick={onAddButtonClickHandler}>Add Product</button>
    </div>
  );
};

export default DisplayForm;
