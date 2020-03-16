import React, { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import classes from './Nav.module.scss';

export const Nav = ({ isAuthenticated }) => {
  return (
    <AppBar className={classes.appBar} position="relative" elevation={0}>
      <Toolbar>
        <Button color="inherit">
          <RouterLink to="/" className={classes.link}>
            Rental
          </RouterLink>
        </Button>

        {/* Spacing between title and menu elements */}
        <div className={classes.divider}></div>

        {isAuthenticated ? (
          <Fragment>
            {/* FIXME: Buttons should be inside of Links */}
            <Button color="inherit">
              <RouterLink to="/employee/categories" className={classes.link}>
                Categories
              </RouterLink>
            </Button>
            <Button color="inherit">
              <RouterLink to="/logout" className={classes.link}>
                Logout
              </RouterLink>
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Button color="inherit">
              <RouterLink to="/register" className={classes.link}>
                Register
              </RouterLink>
            </Button>
            <Button color="inherit">
              <RouterLink to="/login" className={classes.link}>
                Login
              </RouterLink>
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};
