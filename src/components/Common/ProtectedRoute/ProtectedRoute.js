import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { loginCheckState } from '../../../actions/login/actions';

class ProtectedRoute extends Component {
  componentDidMount() {
    // Check user state on each protected route enter
    const { unauthenticatedOnly } = this.props;
    if (!unauthenticatedOnly) {
      const { loginActions } = this.props;
      loginActions.loginCheckState();
    }
  }

  render() {
    const { loginState, unauthenticatedOnly, accountType, ...rest } = this.props;

    const isAuthenticated = !!loginState.token;

    const hasCorrectAccountType = accountType ? accountType === loginState.accountType : true;

    const shouldRender =
      (!unauthenticatedOnly && isAuthenticated && hasCorrectAccountType) ||
      (unauthenticatedOnly && !isAuthenticated);

    return shouldRender ? <Route {...rest} /> : <Redirect to="/" />;
  }
}

const mapStateToProps = state => ({
  loginState: {
    token: state.loginReducer.token,
    accountType: state.loginReducer.accountType
  }
});

const mapDispatchToProps = dispatch => ({
  loginActions: {
    loginCheckState: () => dispatch(loginCheckState())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
