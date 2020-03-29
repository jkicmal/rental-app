import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import classes from './Form.module.scss';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { login, loginConsumeError } from '../../../actions/login/actions';

class LoginFrom extends Component {
  state = {
    formData: {
      email: 'employee@gmail.com',
      password: 'Password@0'
    }
  };

  onInputChange = e => {
    this.setState({ formData: { ...this.state.formData, [e.target.name]: e.target.value } });
  };

  onSubmit = e => {
    e.preventDefault();
    const { loginActions } = this.props;
    loginActions.login(this.state.formData);
  };

  componentDidUpdate() {
    const { loginState, loginActions } = this.props;
    if (loginState.error) {
      console.log(loginState.error);
      toastr.error(loginState.error.type, loginState.error.message);
      loginActions.loginConsumeError();
    }
  }

  render() {
    const { loginState } = this.props;
    const { formData } = this.state;
    return (
      <Fragment>
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
              type="email"
              onChange={this.onInputChange}
              value={formData.email}
            />
            <TextField
              className={classes.textField}
              label="Password"
              name="password"
              required
              type="password"
              onChange={this.onInputChange}
              value={formData.password}
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
    loginConsumeError: () => dispatch(loginConsumeError())
  }
});

const mapStateToProps = state => ({
  loginState: {
    loading: state.loginReducer.loading,
    error: state.loginReducer.error,
    success: state.loginReducer.success
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginFrom);
