import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { accountTypes } from '../helpers/constants';
import { logout, loginCheckState } from '../actions/login/actions';

import { Nav, Logout, ProtectedRoute } from '../components/Common';
import { ScreensCommonLogin, ScreensCommonRegister } from '../screens/Common';
import { ScreensStore } from '../screens/Store';
import {
  ScreensEmployeeCategories,
  ScreensEmployeeProduct,
  ScreensEmployeeProducts,
  ScreensEmployeeProductEdit,
  ScreensEmployeeProductAdd
} from '../screens/Employee';

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
          <ProtectedRoute unauthenticatedOnly exact path="/login" component={ScreensCommonLogin} />
          <ProtectedRoute
            unauthenticatedOnly
            exact
            path="/register"
            component={ScreensCommonRegister}
          />

          {/* Authenticated routes */}
          <ProtectedRoute exact path="/logout" component={Logout} />

          {/* Employee routes */}
          <ProtectedRoute
            accountType={accountTypes.EMPLOYEE}
            exact
            path="/employee/categories"
            component={ScreensEmployeeCategories}
          />
          <ProtectedRoute
            accountType={accountTypes.EMPLOYEE}
            exact
            path="/employee/products"
            component={ScreensEmployeeProducts}
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
            path="/employee/products/add"
            component={ScreensEmployeeProductAdd}
          />
          <ProtectedRoute
            accountType={accountTypes.EMPLOYEE}
            exact
            path="/employee/products/:productId/edit"
            component={ScreensEmployeeProductEdit}
          />

          {/* Common routes */}
          <Route exact path="/" component={ScreensStore} />

          {/* If all of routes aboute fail */}
          <Route render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  login: state.loginReducer
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  loginCheckState: () => dispatch(loginCheckState())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
