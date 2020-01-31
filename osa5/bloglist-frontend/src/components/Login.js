import React from 'react';

const Login = ({ username, password, onSubmit, onChangeUsername, onChangePassword }) => {
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
  )
}

export default Login;