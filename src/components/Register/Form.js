import React, { Component, Fragment } from 'react';
import classes from './Form.module.scss';

import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Alert from '../Alert/Alert';

import {
  register,
  registerErrorAlertClose,
  registerSuccessAlertClose
} from '../../actions/register/actions';

// TODO: Add error handling to the form
class RegisterForm extends Component {
  state = {
    formData: {
      email: 'new_user@gmail.com',
      password: 'Password@0',
      passwordRepeat: 'Password@0',
      firstName: 'Joanna',
      lastName: 'Doe',
      phoneNumber: '564876678',
      country: 'Poland',
      state: 'Śląsk',
      city: 'Tarnowskie Góry',
      postalCode: '02-005',
      addressLine1: 'Address line 1',
      addressLine2: 'Address line 2'
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { registerActions } = this.props;
    registerActions.register(this.state.formData);
  };

  onInputChange = e => {
    e.preventDefault();
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value
      }
    });
  };

  onErrorAlertClose = () => {
    const { registerActions } = this.props;
    registerActions.registerErrorAlertClose();
  };

  onSuccessAlertClose = () => {
    const { registerActions } = this.props;
    registerActions.registerSuccessAlertClose();
  };

  componentWillUnmount() {
    const { registerState, registerActions } = this.props;
    if (registerState.error) registerActions.registerErrorAlertClose();
    if (registerState.success) registerActions.registerSuccessAlertClose();
  }

  render() {
    const { formData } = this.state;
    const { registerState } = this.props;

    return (
      <Fragment>
        {registerState.error ? (
          <Alert
            severity="warning"
            message={registerState.error.message}
            onClose={this.onErrorAlertClose}
          />
        ) : null}
        {registerState.success ? (
          <Alert
            severity="success"
            message={registerState.success.message}
            onClose={this.onSuccessAlertClose}
          />
        ) : null}
        <div className={classes.container}>
          <Typography className={classes.title} variant="h5">
            REGISTER
          </Typography>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <TextField
              className={classes.textField}
              label="Email"
              name="email"
              type="email"
              required
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
            <TextField
              className={classes.textField}
              label="Repeat Password"
              name="passwordRepeat"
              required
              type="password"
              onChange={this.onInputChange}
              value={formData.passwordRepeat}
            />
            <TextField
              className={classes.textField}
              label="First Name"
              name="firstName"
              required
              onChange={this.onInputChange}
              value={formData.firstName}
            />
            <TextField
              className={classes.textField}
              label="Last Name"
              name="lastName"
              required
              onChange={this.onInputChange}
              value={formData.lastName}
            />
            <TextField
              className={classes.textField}
              label="Phone Number"
              name="phoneNumber"
              required
              onChange={this.onInputChange}
              value={formData.phoneNumber}
            />
            <TextField
              className={classes.textField}
              label="Country"
              name="country"
              required
              onChange={this.onInputChange}
              value={formData.country}
            />
            <TextField
              className={classes.textField}
              label="State"
              name="state"
              required
              onChange={this.onInputChange}
              value={formData.state}
            />
            <TextField
              className={classes.textField}
              label="City"
              name="city"
              required
              onChange={this.onInputChange}
              value={formData.city}
            />
            <TextField
              className={classes.textField}
              label="Postal Code"
              name="postalCode"
              required
              onChange={this.onInputChange}
              value={formData.postalCode}
            />
            <TextField
              className={classes.textField}
              label="Address Line 1"
              name="addressLine1"
              required
              onChange={this.onInputChange}
              value={formData.addressLine1}
            />
            <TextField
              className={classes.textField}
              label="Address Line 2"
              name="addressLine2"
              onChange={this.onInputChange}
              value={formData.addressLine2}
            />
            {registerState.loading ? (
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

const mapStateToProps = state => ({
  registerState: {
    error: state.registerReducer.error,
    success: state.registerReducer.success,
    loading: state.registerReducer.loading
  }
});

const mapDispatchToProps = dispatch => ({
  registerActions: {
    register: formData => dispatch(register(formData)),
    registerErrorAlertClose: () => dispatch(registerErrorAlertClose()),
    registerSuccessAlertClose: () => dispatch(registerSuccessAlertClose())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
