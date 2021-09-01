import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const initialState = {
    username: '',
    password: '',
  };

  const [loginCredentials, setLoginCredentials] = useState(initialState);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChangeInput = (e) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitBtnClick = async (e) => {
    e.preventDefault();

    let userFound;

    await axios.get('http://localhost:8080/users').then((res) => {
      userFound = res.data.find(
        (user) =>
          user.username.toLowerCase() ===
          loginCredentials.username.toLocaleLowerCase()
      );
    });

    if (userFound && userFound.password === loginCredentials.password) {
      dispatch({ type: 'LOGIN', payload: userFound });

      history.push('/');
    }
  };
  useEffect(() => {
    return () => {
      setLoginCredentials(initialState);
    };
    // eslint-disable-next-line
  }, []);
  return (
    <div className='login'>
      <div className='login__container'>
        <div className='login__container__user'>
          <FontAwesomeIcon icon={faUser} />
          <h2>Login</h2>
        </div>
        <div className='login__container__field'>
          <label htmlFor='username'>Username:</label>
          <input
            id='username'
            type='text'
            value={loginCredentials.username}
            name='username'
            onChange={handleChangeInput}
          />
        </div>
        <div className='login__container__field'>
          <label htmlFor='password'>Password:</label>
          <input
            id='password'
            type='password'
            value={loginCredentials.passsword}
            name='password'
            onChange={handleChangeInput}
          />
        </div>
        <Link className='login-link' to='/register'>
          <span className='semitransparent'>
            You don't have an account? Click here to register
          </span>
        </Link>
        <button
          className='login-btn'
          type='submit'
          onClick={handleSubmitBtnClick}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
