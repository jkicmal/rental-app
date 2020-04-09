import React from 'react';

import { accountTypes } from '../../helpers/constants';

import classes from './nav.module.scss';

import { AppBar, Toolbar } from '@material-ui/core';
import { ButtonLink } from '.';

const Nav = ({ isAuthenticated, accountType }) => {
  const employeeNavElements = [
    <ButtonLink key="/employee/rentals" to="/employee/rentals">
      Rentals
    </ButtonLink>,
    <ButtonLink key="/employee/categories" to="/employee/categories">
      Categories
    </ButtonLink>,
    <ButtonLink key="/employee/products" to="/employee/products">
      Products
    </ButtonLink>,
    <ButtonLink key="/employee/accounts" to="/employee/accounts">
      Accounts
    </ButtonLink>,
  ];

  const customerNavElements = [
    <ButtonLink key="/customer/shopping-cart" to="/customer/shopping-cart">
      Shopping Cart
    </ButtonLink>,
    <ButtonLink key="/customer/rentals" to="/customer/rentals">
      Rentals
    </ButtonLink>,
  ];

  const logoutNavElement = (
    <ButtonLink key="/logout" to="/logout">
      Logout
    </ButtonLink>
  );

  const authNavElements = [
    <ButtonLink key="/register" to="/register">
      Register
    </ButtonLink>,
    <ButtonLink key="/login" to="/login">
      Login
    </ButtonLink>,
  ];

  const navElementsToRender = isAuthenticated
    ? accountType === accountTypes.EMPLOYEE
      ? [...employeeNavElements, logoutNavElement]
      : [...customerNavElements, logoutNavElement]
    : authNavElements;

  return (
    <AppBar className={classes.appBar} position="relative" elevation={0}>
      <Toolbar>
        <ButtonLink to="/">Rental</ButtonLink>

        {/* Spacing between title and menu elements */}
        <div className={classes.divider}></div>

        {navElementsToRender}
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
