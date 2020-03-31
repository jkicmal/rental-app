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
  FormControlLabel
} from '@material-ui/core';
import { Divider } from '../common';

class EmployeeProductForm extends Component {
  state = {
    formData: {
      name: '',
      description: '',
      price: 0,
      deposit: 0,
      categoryId: '',
      showInStore: false
    }
  };

  componentDidMount() {
    const { product } = this.props;
    if (product) this.assignProductToState(product);
  }

  onInputChange = e => {
    const state = this.state;
    this.setState({
      formData: { ...state.formData, [e.target.name]: e.target.value }
    });
  };

  onCheckboxChange = e => {
    const state = this.state;
    this.setState({
      formData: { ...state.formData, [e.target.name]: e.target.checked }
    });
  };

  assignProductToState(product) {
    this.setState({
      formData: {
        name: product.name,
        description: product.description,
        price: product.price,
        deposit: product.deposit,
        categoryId: product.categoryId || '',
        showInStore: product.showInStore
      }
    });
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.formData);
  };

  render() {
    const { categories, title } = this.props;
    const { formData } = this.state;

    return (
      <div className={classes.container}>
        <Typography className={classes.title} variant="h5">
          {title}
        </Typography>
        <Divider size="sm" />
        <form className={classes.form} onSubmit={this.onSubmit}>
          <TextField
            className={classes.textField}
            name="name"
            label="Name"
            value={formData.name}
            onChange={this.onInputChange}
          />
          <TextField
            className={classes.textField}
            name="description"
            multiline
            rows={4}
            label="Description"
            value={formData.description}
            onChange={this.onInputChange}
          />
          <TextField
            className={classes.textField}
            name="price"
            label="Price"
            type="number"
            value={formData.price}
            onChange={this.onInputChange}
          />
          <TextField
            className={classes.textField}
            name="deposit"
            label="Deposit"
            type="number"
            value={formData.deposit}
            onChange={this.onInputChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                name="showInStore"
                checked={formData.showInStore}
                onChange={this.onCheckboxChange}
              />
            }
            label="Show in store"
          />
          {categories.length ? (
            <FormControl>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                className={classes.textField}
                name="categoryId"
                value={formData.categoryId}
                onChange={this.onInputChange}
              >
                {categories
                  ? categories.map(category => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))
                  : null}
              </Select>
            </FormControl>
          ) : null}
          <Divider size="sm" />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default EmployeeProductForm;
