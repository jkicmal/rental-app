import React, { Component } from 'react';

import classes from './employee-product-form.module.scss';

import {
  Typography,
  MenuItem,
  TextField,
  Select,
  Button,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { Divider } from '../common';

class EmployeeAccountForm extends Component {
  state = {
    formData: {
      type: '',
    },
  };

  componentDidMount() {
    const { account } = this.props;
    if (account) this.assignAccountToState(account);
  }

  onInputChange = (e) => {
    const state = this.state;
    this.setState({
      formData: { ...state.formData, [e.target.name]: e.target.value },
    });
  };

  onCheckboxChange = (e) => {
    const state = this.state;
    this.setState({
      formData: { ...state.formData, [e.target.name]: e.target.checked },
    });
  };

  assignAccountToState(account) {
    this.setState({
      formData: {
        type: account.type,
      },
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.formData);
  };

  render() {
    const { title } = this.props;
    const { formData } = this.state;

    return (
      <div className={classes.container}>
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
        <Divider size="sm" />
        <form className={classes.form} onSubmit={this.onSubmit}>
          <FormControl>
            <InputLabel id="account-type-label">Account Type</InputLabel>
            <Select
              labelId="account-type-label"
              className={classes.textField}
              name="type"
              value={formData.type}
              onChange={this.onInputChange}
            >
              <MenuItem value="EMPLOYEE">Employee</MenuItem>
              <MenuItem value="CUSTOMER">Customer</MenuItem>
            </Select>
          </FormControl>
          <Divider size="sm" />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default EmployeeAccountForm;
