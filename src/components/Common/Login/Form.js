import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import classes from './Form.module.scss';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '../Alert/Alert';

import { login, loginErrorAlertClose } from '../../../actions/login/actions';

class LoginFrom extends Component {
  state = {
    email: 'employee@gmail.com',
    password: 'Password@0'
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { loginActions } = this.props;
    loginActions.login(this.state);
  };

  onErrorAlertClose = () => {
    const { loginActions } = this.props;
    loginActions.loginErrorAlertClose();
  };

  componentWillUnmount() {
    const { loginActions, loginState } = this.props;
    if (loginState.error) loginActions.loginErrorAlertClose();
  }

  render() {
    const { loginState } = this.props;
    return (
      <Fragment>
        {loginState.error ? (
          <Alert
            severity="warning"
            message={loginState.error.message}
            onClose={this.onErrorAlertClose}
          />
        ) : null}
        <div className={classes.container}>
          <Typography className={classes.title} variant="h5">
            LOGIN
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <TextField
              className={classes.textField}
              label="Email"
              name="email"
              required
              // type="email"
              onChange={this.onInputChange}
              value={this.state.email}
            />
            <TextField
              className={classes.textField}
              label="Password"
              name="password"
              required
              type="password"
              onChange={this.onInputChange}
              value={this.state.password}
            />
            {loginState.loading ? <CircularProgress /> : <Button type="submit">Submit</Button>}
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginActions: {
    login: loginFormData => dispatch(login(loginFormData)),
    loginErrorAlertClose: () => dispatch(loginErrorAlertClose())
  }
});

const mapStateToProps = state => ({
  loginState: {
    loading: state.loginReducer.loading,
    error: state.loginReducer.error
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginFrom);
