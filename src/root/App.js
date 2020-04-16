import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { accountTypes } from '../helpers/constants';
import { logout, loginCheckState } from '../actions/login/actions';

import { Nav, Logout, ProtectedRoute } from '../components/common';

import {
  // Shared / Common
  ScreensLogin,
  ScreensRegister,
  ScreensStore,
  ScreensProduct,
  // Employee Category
  ScreensEmployeeCategories,
  // Employee Product
  ScreensEmployeeProduct,
  ScreensEmployeeProducts,
  ScreensEmployeeProductEdit,
  ScreensEmployeeProductAdd,
  // Employee Rental
  ScreensEmployeeRentals,
  ScreensEmployeeRental,
  // Customer Rental
  ScreensCustomerRentals,
  ScreensCustomerRental,
  // Customer Shopping Cart
  ScreensCustomerShoppingCart,
  ScreensEmployeeAccounts,
  ScreensEmployeeAccount,
  ScreensEmployeeAccountEdit,
} from '../screens';

class App extends Component {
  constructor(props) {
    super(props);
    this.props.loginCheckState();
  }

  render() {
    const { token, accountType } = this.props.login;

    const isAuthenticated = !!token;

    return (
      <Router>
        <Nav isAuthenticated={isAuthenticated} accountType={accountType} />
        <Switch>
          {/* Unauthenticated only routes */}
          <ProtectedRoute unauthenticatedOnly exact path="/login" component={ScreensLogin} />
          <ProtectedRoute unauthenticatedOnly exact path="/register" component={ScreensRegister} />

          {/* Authenticated routes */}
          <ProtectedRoute exact path="/logout" component={Logout} />

          {/* Customer routes */}
          {/* Shopping cart */}
          <ProtectedRoute
            accountType={accountTypes.CUSTOMER}
            exact
            path="/customer/shopping-cart"
            component={ScreensCustomerShoppingCart}
          />

          {/* Rentals */}
          <ProtectedRoute
            accountType={accountTypes.CUSTOMER}
            exact
            path="/customer/rentals"
            component={ScreensCustomerRentals}
          />
          <ProtectedRoute
            accountType={accountTypes.CUSTOMER}
            exact
            path="/customer/rentals/:rentalId"
            component={ScreensCustomerRental}
          />

          {/* Employee routes */}
          {/* Category */}
          <ProtectedRoute
            accountType={accountTypes.EMPLOYEE}
            exact
            path="/employee/categories"
            component={ScreensEmployeeCategories}
          />

          {/* Product */}
          <ProtectedRoute
            accountType={accountTypes.EMPLOYEE}
            exact
            path="/employee/products"
            component={ScreensEmployeeProducts}
          />
          <ProtectedRoute
            accountType={accountTypes.EMPLOYEE}
            exact
            path="/employee/products/add"
            component={ScreensEmployeeProductAdd}
          />
          <ProtectedRoute
            accountType={accountTypes.EMPLOYEE}
            exact
            path="/employee/products/:productId"
            component={ScreensEmployeeProduct}
          />
          <ProtectedRoute
            accountType={accountTypes.EMPLOYEE}
            exact
            path="/employee/products/:productId/edit"
            component={ScreensEmployeeProductEdit}
          />

          {/* Account */}
          <ProtectedRoute
            accountType={accountTypes.EMPLOYEE}
            exact
            path="/employee/accounts/:accountId"
            component={ScreensEmployeeAccount}
          />
          <ProtectedRoute
            accountType={accountTypes.EMPLOYEE}
            exact
            path="/employee/accounts"
            component={ScreensEmployeeAccounts}
          />
          <ProtectedRoute
            accountType={accountTypes.EMPLOYEE}
            exact
            path="/employee/accounts/:accountId/edit"
            component={ScreensEmployeeAccountEdit}
          />

          {/* Rental */}
          <ProtectedRoute
            accountType={accountTypes.EMPLOYEE}
            exact
            path="/employee/rentals"
            component={ScreensEmployeeRentals}
          />
          <ProtectedRoute
            accountType={accountTypes.EMPLOYEE}
            exact
            path="/employee/rentals/:rentalId"
            component={ScreensEmployeeRental}
          />

          {/* Common routes */}
          <Route exact path="/" component={ScreensStore} />
          <Route exact path="/products/:productId" component={ScreensProduct} />

          {/* If all of routes aboute fail */}
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  login: state.loginReducer,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
  loginCheckState: () => dispatch(loginCheckState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
