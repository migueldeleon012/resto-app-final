import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__container__user">
          <FontAwesomeIcon icon={faUser} />
          <h2>Register</h2>
        </div>
        <div className="login__container__field">
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" />
        </div>
        <div className="login__container__field">
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" />
        </div>
        <button className="login-btn" type="submit">
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
