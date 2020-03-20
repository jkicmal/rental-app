import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

class ProtectedRoute extends Component {
  render() {
    const { auth, unauthenticatedOnly, accountType, ...rest } = this.props;

    const isAuthenticated = !!auth.token;

    const hasCorrectAccountType = accountType
      ? accountType === auth.accountType
      : true;

    const shouldRender =
      (!unauthenticatedOnly && isAuthenticated && hasCorrectAccountType) ||
      (unauthenticatedOnly && !isAuthenticated);

    return shouldRender ? <Route {...rest} /> : <Redirect to="/" />;
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps, null)(ProtectedRoute);
