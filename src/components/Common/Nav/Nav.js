import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import classes from './Nav.module.scss';
import { accountTypes } from '../../../helpers/constants';
import { RouterLink } from '../';

const Nav = ({ isAuthenticated, accountType }) => {
  const employeeNavElements = [
    <RouterLink key="/employee/categories" to="/employee/categories">
      <Button color="inherit">Categories</Button>
    </RouterLink>,
    <RouterLink key="/employee/products" to="/employee/products">
      <Button color="inherit">Products</Button>
    </RouterLink>
  ];

  const customerNavElements = [
    <RouterLink key="/customer/shopping-cart" to="/customer/shopping-cart">
      <Button color="inherit">Shopping Cart</Button>
    </RouterLink>,
    <RouterLink key="/customer/orders" to="/customer/orders">
      <Button color="inherit">Orders</Button>
    </RouterLink>
  ];

  const logoutNavElement = (
    <RouterLink key="/logout" to="/logout">
      <Button color="inherit">Logout</Button>
    </RouterLink>
  );

  const authNavElements = [
    <RouterLink key="/register" to="/register">
      <Button color="inherit">Register</Button>
    </RouterLink>,
    <RouterLink key="/login" to="/login">
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
        <RouterLink to="/">
          <Button color="inherit">Rental</Button>
        </RouterLink>

        {/* Spacing between title and menu elements */}
        <div className={classes.divider}></div>

        {navElementsToRender}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
