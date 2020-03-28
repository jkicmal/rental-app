import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProduct } from '../../../actions/product/actions';

import { Typography, Paper } from '@material-ui/core';
import classes from './Product.module.scss';
import { apiAccessTypes } from '../../../config/api';

class EmployeeProduct extends Component {
  componentDidMount() {
    const { productActions, loginState, productId } = this.props;
    productActions.fetchProduct(
      productId,
      { relations: ['category'] },
      apiAccessTypes.EMPLOYEE,
      loginState.token
    );
  }

  render() {
    const { product } = this.props.productState;

    if (!product) return null;

    return (
      <div>
        <Typography variant="h4">
          {product.name} #{product.id}
        </Typography>
        <Paper className={classes.description}>
          <Typography variant="body1">{product.description}</Typography>
        </Paper>
        <div className={classes.infoElementsContainer}>
          <Paper className={classes.infoElement}>
            <Typography variant="body1">Price {product.price.toFixed(2)}PLN</Typography>
          </Paper>
          <Paper className={classes.infoElement}>
            <Typography variant="body1">Deposit {product.deposit.toFixed(2)}PLN</Typography>
          </Paper>
          <Paper className={classes.infoElement}>
            <Typography variant="body1">
              Displayed in store: {product.showInStore ? 'Yes' : 'No'}
            </Typography>
          </Paper>
          <Paper className={classes.infoElement}>
            <Typography variant="body1">
              Category: {product.category ? product.category.name : 'None'}
            </Typography>
          </Paper>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  productState: {
    product: state.productReducer.product
  },
  loginState: {
    token: state.loginReducer.token
  }
});

const mapDispatchToProps = dispatch => ({
  productActions: {
    fetchProduct: (id, resourceQueryParams, apiAccessType, token) =>
      dispatch(fetchProduct(id, resourceQueryParams, apiAccessType, token))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeProduct);
