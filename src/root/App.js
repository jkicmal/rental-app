import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { accountTypes } from '../helpers/constants';
import { logout, loginCheckState } from '../actions/login/actions';

import { Nav } from '../components/UI/Nav/Nav';
import ScreensLogin from '../screens/Login/Login';
import ScreensRegister from '../screens/Register/Register';
import ScreensStore from '../screens/Store/Store';
import Logout from '../components/Logout/Logout';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

import ScreensEmployeeCategoryViewMany from '../screens/Employee/Category/ViewMany';
import ScreensEmployeeProductViewMany from '../screens/Employee/Product/ViewMany';
import ScreensEmployeeProductViewOne from '../screens/Employee/Product/ViewOne';

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

          {/* Employee routes */}
          <ProtectedRoute
            accountType={accountTypes.EMPLOYEE}
            exact
            path="/employee/categories"
            component={ScreensEmployeeCategoryViewMany}
          />
          <ProtectedRoute
            accountType={accountTypes.EMPLOYEE}
            exact
            path="/employee/products"
            component={ScreensEmployeeProductViewMany}
          />
          <ProtectedRoute
            accountType={accountTypes.EMPLOYEE}
            exact
            path="/employee/products/:productId"
            component={ScreensEmployeeProductViewOne}
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
