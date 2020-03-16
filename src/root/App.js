import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions/auth/actions';

import { Nav } from '../components/UI/Nav/Nav';
import ScreensEmployeeCategory from '../screens/Employee/Category/Category';
import ScreensAuthLogin from '../screens/Auth/Login/Login';
import ScreensRental from '../screens/Rental/Rental';
import Logout from '../components/Logout/Logout';

class App extends Component {
  render() {
    return (
      <Router>
        <Nav isAuthenticated={this.props.isAuthenticated} />
        <Switch>
          {/* TODO: Add <ProtectedRoute> Component */}
          <Route
            exact
            path="/login"
            /**
             * NOTE:
             * Use render={(props) => ...} instad of component={() => ...}
             * Because of better performance
             */
            render={props => (
              <ScreensAuthLogin
                {...props}
                isAuthenticated={this.props.isAuthenticated}
              />
            )}
          />
          <Route exact path="/logout" component={Logout} />
          <Route
            exact
            path="/employee/categories"
            component={ScreensEmployeeCategory}
          />
          <Route exact path="/" component={ScreensRental} />
          {/* <Route component={NotFoundPage} /> */}
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.token !== null
});

const mapDispatchToProps = dispatch => ({
  logout: logout
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
