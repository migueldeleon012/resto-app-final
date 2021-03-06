import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import axios from 'axios';

const Register = () => {
  const initialState = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const [newUser, setNewUser] = useState(initialState);

  const history = useHistory();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();

    await axios.get('http://localhost:8080/users').then((res) => {
      const userFound = res.data.find(
        (user) => user.username === newUser.username
      );
      if (userFound) {
        dispatch({
          type: 'SET_MESSAGE',
          payload: {
            msg: 'Username Already Taken',
            background: 'red',
            show: 'show',
          },
        });
        setTimeout(
          () =>
            dispatch({
              type: 'SET_MESSAGE',
              payload: {
                msg: 'Username Already Taken',
                background: 'red',
                show: '',
              },
            }),
          2000
        );
      } else {
        if (newUser.password !== newUser.confirmPassword) {
          dispatch({
            type: 'SET_MESSAGE',
            payload: {
              msg: 'Passwords must match',
              background: 'red',
              show: 'show',
            },
          });
          setTimeout(
            () =>
              dispatch({
                type: 'SET_MESSAGE',
                payload: {
                  msg: 'Passwords must match',
                  background: 'red',
                  show: '',
                },
              }),
            2000
          );
        } else {
          dispatch({
            type: 'SET_MESSAGE',
            payload: {
              msg: 'Registration Successful',
              background: 'green',
              show: 'show',
            },
          });
          setTimeout(
            () =>
              dispatch({
                type: 'SET_MESSAGE',
                payload: {
                  msg: 'Registration Successful',
                  background: 'green',
                  show: '',
                },
              }),
            2000
          );

          axios.post('http://localhost:8080/users', {
            username: newUser.username,
            password: newUser.password,
            isAdmin: false,
          });
          setNewUser(initialState);
          history.push('/login');
        }
      }
    });
  };

  return (
    <div className='login'>
      <div className='login__container'>
        <div className='login__container__user'>
          <FontAwesomeIcon icon={faUser} />
          <h2>Register</h2>
        </div>
        <div className='login__container__field'>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            name='username'
            value={newUser.username}
            onChange={handleInputChange}
          />
        </div>
        <div className='login__container__field'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            value={newUser.password}
            onChange={handleInputChange}
          />
        </div>
        <div className='login__container__field'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='confirmPassword'
            value={newUser.confirmPassword}
            onChange={handleInputChange}
          />
        </div>
        <button className='login-btn' type='submit' onClick={handleSubmitClick}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
