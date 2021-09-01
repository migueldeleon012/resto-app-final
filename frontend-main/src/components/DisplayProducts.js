import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import EditProductForm from './EditProductForm';

import { onlyUnique } from '../helper';

import axios from 'axios';
import { useHistory } from 'react-router-dom';

const DisplayProducts = () => {
  const products = useSelector((state) => state.products);
  const displayModal = useSelector((state) => state.displayModal);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = useSelector((state) => state.currentUser);

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('All');

  const dispatch = useDispatch();
  const history = useHistory();

  const onCategoryChangeClickHandler = (e) => {
    setSelectedCategory(e.target.value);
  };

  const onEditButtonClickHanlder = (e) => {
    dispatch({ type: 'DISPLAY_MODAL' });
    setId(e.currentTarget.dataset.id);
    setName(e.currentTarget.dataset.name);
    setPrice(e.currentTarget.dataset.price);
    setCategory(e.currentTarget.dataset.category);
    setImage(e.currentTarget.dataset.image);
  };

  const handleOrderBtnClick = async (product) => {
    if (!isLoggedIn) {
      history.push('/login');
    } else {
      let itemFound = currentUser.cartItems.find(
        (item) => item._id === product._id
      );
      if (itemFound) {
        await axios.put(
          `http://localhost:8080/users/increaseCount/${currentUser._id}/${itemFound._id}`,
          { count: itemFound.count + 1 }
        );
      } else {
        await axios.put(
          `http://localhost:8080/users/addToCart/${currentUser._id}`,
          { _id: product._id, count: 1 }
        );
      }
      await axios
        .get(`http://localhost:8080/users/${currentUser._id}`)
        .then((res) => {
          dispatch({ type: 'SET_USER', payload: res.data });
        });
    }
  };

  return (
    <main>
      <select defaultValue='' onChange={(e) => onCategoryChangeClickHandler(e)}>
        <option value='' disabled>
          Select Category
        </option>
        <option value='All'>All</option>
        {products
          .map((product) => product.category)
          .filter(onlyUnique)
          .map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
      </select>
      <div className='container'>
        {products
          .filter((product) =>
            selectedCategory === 'All'
              ? product
              : product.category === selectedCategory
          )
          .map((product) => (
            <div className='container__card' key={product._id}>
              <div className='img'>
                <img src={product.image} alt={product.name} />
              </div>
              <div className='container__card__desc'>
                <div className='name'>
                  <h4>{product.name}</h4>
                  <p>Php {product.price}</p>
                </div>
                <div className='btns'>
                  <button onClick={() => handleOrderBtnClick(product)}>
                    Order
                  </button>
                  {currentUser.isAdmin && (
                    <>
                      <button
                        onClick={onEditButtonClickHanlder}
                        data-id={product._id}
                        data-name={product.name}
                        data-price={product.price}
                        data-category={product.category}
                        data-image={product.image}
                      >
                        Edit
                      </button>
                      <button
                        className='delete'
                        onClick={async () => {
                          await axios.delete(
                            `http://localhost:8080/items/${product._id}`
                          );
                          await axios
                            .get('http://localhost:8080/items/')
                            .then((res) =>
                              dispatch({
                                type: 'INIT_PRODUCTS',
                                payload: res.data,
                              })
                            );
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      {displayModal && (
        <EditProductForm
          id={id}
          name={name}
          price={price}
          category={category}
          image={image}
          displayModal={displayModal}
        />
      )}
    </main>
  );
};

export default DisplayProducts;
