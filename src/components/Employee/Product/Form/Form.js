import React, { Component } from 'react';
import classes from './Form.module.scss';
import {
  Typography,
  MenuItem,
  TextField,
  Select,
  Button,
  FormControl,
  InputLabel
} from '@material-ui/core';

class EmployeeProductForm extends Component {
  state = {
    formData: {
      name: 'product name',
      description: 'product description',
      price: '100',
      deposit: '20',
      categoryId: ''
    }
  };

  componentDidMount() {
    const { product } = this.props;
    if (product) this.assignProductToState(product);
  }

  onInputChange = e => {
    const state = this.state;
    this.setState({ formData: { ...state.formData, [e.target.name]: e.target.value } });
  };

  assignProductToState(product) {
    this.setState({
      formData: {
        name: product.name,
        description: product.description,
        price: product.price,
        deposit: product.deposit,
        categoryId: product.categoryId
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
          <Button type="submit">Create</Button>
        </form>
      </div>
    );
  }
}

export default EmployeeProductForm;
