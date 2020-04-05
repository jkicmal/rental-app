import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchProduct } from '../../actions/product/actions';

import classes from './employee-product.module.scss';

import { Typography, Paper } from '@material-ui/core';
import { apiAccessTypes } from '../../config/api';
import { FlexContainer, InfoElement } from '../common';

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
      <Fragment>
        <Typography variant="h4">
          {product.name} #{product.id}
        </Typography>
        <FlexContainer>
          <InfoElement extend>{product.description}</InfoElement>
          <InfoElement>Price {product.price.toFixed(2)}PLN</InfoElement>
          <InfoElement>Deposit {product.deposit.toFixed(2)}PLN</InfoElement>
          <InfoElement>Displayed in store: {product.showInStore ? 'Yes' : 'No'}</InfoElement>
          <InfoElement>Category: {product.category ? product.category.name : 'None'}</InfoElement>
        </FlexContainer>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  productState: {
    product: state.productReducer.product,
  },
  loginState: {
    token: state.loginReducer.token,
  },
});

const mapDispatchToProps = (dispatch) => ({
  productActions: {
    fetchProduct: (id, resourceQueryParams, apiAccessType, token) =>
      dispatch(fetchProduct(id, resourceQueryParams, apiAccessType, token)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeProduct);
