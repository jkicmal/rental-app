import React, { Component } from 'react';
import classes from './Form.module.scss';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

class RegisterForm extends Component {
  state = {
    formData: {
      email: '',
      password: '',
      repeatPassword: '',
      firstName: '',
      secondName: '',
      phoneNumber: '',
      country: '',
      state: '',
      city: '',
      postalCode: '',
      addressLine1: '',
      addressLine2: ''
    }
  };

  onSubmit = e => {
    e.preventDefault();
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

  render() {
    return (
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
            value={this.state.formData.email}
          />
          <TextField
            className={classes.textField}
            label="Password"
            name="password"
            required
            type="password"
            onChange={this.onInputChange}
            value={this.state.formData.password}
          />
          <TextField
            className={classes.textField}
            label="Repeat Password"
            name="repeatPassword"
            required
            type="repeatPassword"
            onChange={this.onInputChange}
            value={this.state.formData.repeatPassword}
          />
          <TextField
            className={classes.textField}
            label="First Name"
            name="firstName"
            required
            onChange={this.onInputChange}
            value={this.state.formData.firstName}
          />
          <TextField
            className={classes.textField}
            label="Second Name"
            name="secondName"
            required
            onChange={this.onInputChange}
            value={this.state.formData.secondName}
          />
          <TextField
            className={classes.textField}
            label="Phone Number"
            name="phoneNumber"
            required
            onChange={this.onInputChange}
            value={this.state.formData.phoneNumber}
          />
          <TextField
            className={classes.textField}
            label="Country"
            name="country"
            required
            onChange={this.onInputChange}
            value={this.state.formData.country}
          />
          <TextField
            className={classes.textField}
            label="State"
            name="state"
            required
            onChange={this.onInputChange}
            value={this.state.formData.state}
          />
          <TextField
            className={classes.textField}
            label="City"
            name="city"
            required
            onChange={this.onInputChange}
            value={this.state.formData.city}
          />
          <TextField
            className={classes.textField}
            label="Postal Code"
            name="postalCode"
            required
            onChange={this.onInputChange}
            value={this.state.formData.postalCode}
          />
          <TextField
            className={classes.textField}
            label="Address Line 1"
            name="addressLine1"
            required
            onChange={this.onInputChange}
            value={this.state.formData.addressLine1}
          />
          <TextField
            className={classes.textField}
            label="Address Line 2"
            name="addressLine2"
            onChange={this.onInputChange}
            value={this.state.formData.addressLine2}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    );
  }
}
export default RegisterForm;
