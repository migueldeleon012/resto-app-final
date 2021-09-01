import './scss/main.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import DisplayAddForm from './components/DisplayAddForm';
import DisplayProduct from './components/DisplayProducts';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';

// import {v4 as uuidv4} from 'uuid'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';

const App = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = useSelector((state) => state.currentUser);
  const displayModal = useSelector((state) => state.displayModal);

  const dispatch = useDispatch();
  const [displayNavbar, setDisplayNavbar] = useState(false);

  const body = document.querySelector('body');
  if (displayModal) {
    body.classList.add('overflow');
  } else {
    body.classList.remove('overflow');
  }
  useEffect(() => {
    const initFrontEnd = async () => {
      await axios.get('http://localhost:8080/items').then((res) => {
        dispatch({ type: 'INIT_PRODUCTS', payload: res.data });
      });
    };
    initFrontEnd();

    //eslint-disable-next-line
  }, []);

  const notDisplayNavbar = () => {
    setDisplayNavbar(!displayNavbar);
  };

  return (
    <div className='App'>
      <Router>
        <nav className='nav'>
          <h1>Pizza at iba pa</h1>
          <div className={displayNavbar ? 'nav__links active' : 'nav__links'}>
            <div className='links'>
              <p className='link'>{currentUser?.username}</p>
              <Link className='link' to='/' onClick={notDisplayNavbar}>
                Products
              </Link>
              {currentUser?.isAdmin && (
                <>
                  <Link className='link' to='/form' onClick={notDisplayNavbar}>
                    Add Product
                  </Link>
                </>
              )}

              {isLoggedIn && !currentUser?.isAdmin && (
                <>
                  <Link className='link' to='/cart' onClick={notDisplayNavbar}>
                    Cart
                  </Link>
                  <Link
                    className='link'
                    to='/'
                    onClick={() => {
                      notDisplayNavbar();
                      dispatch({ type: 'LOGOUT' });
                    }}
                  >
                    Logout
                  </Link>
                </>
              )}

              {!isLoggedIn && (
                <>
                  <Link className='link' to='/login' onClick={notDisplayNavbar}>
                    Login
                  </Link>
                  <Link
                    className='link'
                    to='/register'
                    onClick={notDisplayNavbar}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className='nav__burger' onClick={notDisplayNavbar}>
            <div className='line'></div>
            <div className='line'></div>
            <div className='line'></div>
          </div>
        </nav>
        <Route exact path='/' component={DisplayProduct} />
        <Route path='/cart' component={Cart} />
        <Route path='/register' component={Register}></Route>

        <Route path='/form'>
          <DisplayAddForm />
        </Route>
        <Route path='/login'>{!isLoggedIn && <Login />}</Route>
      </Router>
    </div>
  );
};

export default App;
