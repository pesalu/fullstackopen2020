import React from 'react';
import PropTypes from 'prop-types';


const Login = ({ 
  username, password, onSubmit, onChangeUsername, onChangePassword }) => {
  return (
    <form onSubmit = { onSubmit }>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={onChangeUsername}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={onChangePassword}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

Login.propTypes = {
  username: PropTypes.string.isRequired, 
  password: PropTypes.string.isRequired, 
  onSubmit: PropTypes.func.isRequired, 
  onChangeUsername: PropTypes.func.isRequired, 
  onChangePassword: PropTypes.func.isRequired,
};

export default Login;