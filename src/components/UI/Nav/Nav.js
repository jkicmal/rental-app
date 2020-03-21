import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import classes from './Nav.module.scss';
import { accountTypes } from '../../../helpers/constants';

export const Nav = ({ isAuthenticated, accountType }) => {
  const employeeNavElements = [
    <RouterLink
      key="/employee/categories"
      to="/employee/categories"
      className={classes.link}
    >
      <Button color="inherit">Categories</Button>
    </RouterLink>,
    <RouterLink
      key="/employee/orders"
      to="/employee/orders"
      className={classes.link}
    >
      <Button color="inherit">Orders</Button>
    </RouterLink>
  ];

  const customerNavElements = [
    <RouterLink
      key="/customer/shopping-cart"
      to="/customer/shopping-cart"
      className={classes.link}
    >
      <Button color="inherit">Shopping Cart</Button>
    </RouterLink>,
    <RouterLink
      key="/customer/orders"
      to="/customer/orders"
      className={classes.link}
    >
      <Button color="inherit">Orders</Button>
    </RouterLink>
  ];

  const logoutNavElement = (
    <RouterLink key="/logout" to="/logout" className={classes.link}>
      <Button color="inherit">Logout</Button>
    </RouterLink>
  );

  const authNavElements = [
    <RouterLink key="/register" to="/register" className={classes.link}>
      <Button color="inherit">Register</Button>
    </RouterLink>,
    <RouterLink key="/login" to="/login" className={classes.link}>
      <Button color="inherit">Login</Button>
    </RouterLink>
  ];

  const navElementsToRender = isAuthenticated
    ? accountType === accountTypes.EMPLOYEE
      ? [...employeeNavElements, logoutNavElement]
      : [...customerNavElements, logoutNavElement]
    : authNavElements;

  return (
    <AppBar className={classes.appBar} position="relative" elevation={0}>
      <Toolbar>
        <RouterLink to="/" className={classes.link}>
          <Button color="inherit">Rental</Button>
        </RouterLink>

        {/* Spacing between title and menu elements */}
        <div className={classes.divider}></div>

        {navElementsToRender}
      </Toolbar>
    </AppBar>
  );
};
