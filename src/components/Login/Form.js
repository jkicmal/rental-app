import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import classes from './Form.module.scss';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '../Alert/Alert';

import { login, loginAlertClose } from '../../actions/auth/actions';

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
    this.props.login(this.state);
  };

  onAlertClose = () => {
    this.props.loginAlertClose();
  };

  render() {
    const { error, showAlert, loading } = this.props.auth;
    return (
      <Fragment>
        {error && showAlert ? (
          <Alert
            severity="warning"
            status={error.status}
            message={error.message}
            onClose={this.onAlertClose}
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
            {loading ? (
              <CircularProgress />
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </form>
        </div>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: loginFormData => dispatch(login(loginFormData)),
    loginAlertClose: () => dispatch(loginAlertClose())
  };
};

const mapStateToProps = state => {
  return {
    auth: state.authReducer
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginFrom);
