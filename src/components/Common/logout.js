import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../../actions/login/actions';

class Logout extends Component {
  componentDidMount() {
    const { loginActions } = this.props;
    loginActions.logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => ({
  loginActions: {
    logout: () => dispatch(logout())
  }
});

export default connect(null, mapDispatchToProps)(Logout);
