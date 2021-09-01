import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onlyUnique } from '../helper';

const EditProductForm = (props) => {
  // let nameRef = useRef()
  const [name, setName] = useState(props.name);
  const [price, setPrice] = useState(props.price);
  const [category, setCategory] = useState(props.category);
  const [image, setImage] = useState(props.image);
  const [className, setClassName] = useState('');
  const [comment, setComment] = useState('');

  const products = useSelector((state) => state.products);

  const dispatch = useDispatch();

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

  const onEditButtonClickHandler = async () => {
    let editedItem = {
      id: props.id,
      name,
      price,
      category,
      image,
    };

    if (name === '' || price === '' || category === '' || image === '') {
      setComment('please do not leave any input field empty');
      setClassName('red');
    } else {
      if (price <= 0) {
        setComment('please do not give free products');
        setClassName('red');
      } else {
        await axios.put(
          'http://localhost:8080/items/' + editedItem.id,
          editedItem
        );
        await axios
          .get('http://localhost:8080/items')
          .then((res) =>
            dispatch({ type: 'INIT_PRODUCTS', payload: res.data })
          );
        dispatch({ type: 'DISPLAY_MODAL' });
      }
    }
  };

  return (
    <div className="form">
      <div className="form__input">
        <h1>Edit Product:</h1>
        <p className={className}>{comment}</p>
        <div className="form__input__div">
          <label htmlFor="name">ID:</label>
          <input type="text" id="id" value={props.id} disabled />
        </div>

        <div className="form__input__div">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => onNameInputChangeHandler(e)}
          />
        </div>

        <div className="form__input__div">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => onPriceInputChangeHandler(e)}
          />
        </div>

        <div className="form__input__div">
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => onImageInputChangeHandler(e)}
          />
        </div>

        <div className="form__input__div category">
          <select
            id="category "
            defaultValue=""
            onChange={(e) => onCategoryInputChangeHandler(e)}
          >
            <option value="" disabled>
              Select Category
            </option>
            {products
              .map((product) => product.category)
              .filter(onlyUnique)
              .map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
          </select>
        </div>

        <button onClick={onEditButtonClickHandler}>Edit Product</button>
      </div>
    </div>
  );
};

export default EditProductForm;
