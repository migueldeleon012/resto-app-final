import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__container__user">
          <FontAwesomeIcon icon={faUser} />
          <h2>Login</h2>
        </div>
        <div className="login__container__field">
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" />
        </div>
        <div className="login__container__field">
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" />
        </div>
        <Link className="login-link" to="/register">
          <span className="semitransparent">
            You don't have an account? Click here to register
          </span>
        </Link>
        <button className="login-btn" type="submit">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
