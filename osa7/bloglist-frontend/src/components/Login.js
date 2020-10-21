import React from 'react';
import PropTypes from 'prop-types';

import {TextField, Button} from '@material-ui/core'

const Login = ({ 
  username, password, onSubmit, onChangeUsername, onChangePassword }) => {
  return (
    <form onSubmit = { onSubmit }>
      <h1>Login</h1>
      <div>
        {/* <h6>Username</h6> */}
        <TextField 
          id="username-field" 
          label="username" 
          name="Username" 
          value={username}
          onChange={onChangeUsername}
          />
      </div>
      <div>
        <TextField 
          id="password-field" 
          label="password" 
          name="Password" 
          value={password}
          onChange={onChangePassword}
        />
      </div>
      <br/>
      <Button variant="contained" color="primary" type="submit">Login</Button>
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