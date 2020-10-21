import React from 'react';

import {AppBar, Toolbar, Button, IconButton} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/icons/Menu';


import { makeStyles } from '@material-ui/core/styles';


import { Link } from 'react-router-dom'

const blogStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: 5,
  marginBottom: 5,
};


const NavigationBar = ({user, handleLogout}) => {

  return (
    <div style={blogStyle}>
      <AppBar position="static">
      <Toolbar>
    <div style={{float: 'left'}}>
          <IconButton edge="start" color="inherit" aria-label="menu">
          </IconButton>
          <Button color="inherit" component={Link} to="/blogs" >
            home
          </Button>
          <Button color="inherit" component={Link} to="/blogs" >
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users" >
            users
          </Button>
      </div>
      <div style={{float: 'right'}}>
      <Button 
                color="inherit" 
                type="submit" 
                onClick={handleLogout}
                >
                logout
              </Button> 
      </div>

      </Toolbar>
    </AppBar>
    </div>
  )
}

export default NavigationBar;