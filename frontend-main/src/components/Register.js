import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Register = () => {
  const initialState = {
    username: '',
    password: '',
    confirmPassword: '',
  };

  const [newUser, setNewUser] = useState(initialState);

  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value,
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
        <button className='login-btn' type='submit'>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
