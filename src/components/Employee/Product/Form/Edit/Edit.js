import React, { Component } from 'react';
import EmployeeProductForm from '../Form';
import { connect } from 'react-redux';
import { fetchCategories } from '../../../../../actions/category/actions';
import {
  productConsumeSuccess,
  fetchProduct,
  updateProduct
} from '../../../../../actions/product/actions';
import { apiAccessTypes } from '../../../../../config';
import { Redirect } from 'react-router-dom';
import { successTypes } from '../../../../../helpers/constants';
import { toastr } from 'react-redux-toastr';
import { CircularProgress } from '@material-ui/core';

class EmployeeProductFormEdit extends Component {
  componentDidMount() {
    const { categoryActions, productActions, loginState, productId } = this.props;
    productActions.fetchProduct(productId, null, apiAccessTypes.EMPLOYEE, loginState.token);
    categoryActions.fetchCategories(apiAccessTypes.EMPLOYEE, loginState.token);
  }

  onSubmit = productFormData => {
    const { productActions, loginState, productId } = this.props;
    productActions.updateProduct(
      productId,
      productFormData,
      apiAccessTypes.EMPLOYEE,
      loginState.token
    );
  };

  componentDidUpdate() {
    const { productState, productActions } = this.props;
    const { success } = productState;
    if (success) {
      toastr.success(success.type, success.message);
      productActions.productConsumeSuccess();
    }
  }

  render() {
    const { categoryState, productState } = this.props;

    if (productState.success && productState.success.type === successTypes.UPDATE_SUCCESS) {
      const updatedProductId = productState.success.productId;
      return <Redirect to={`/employee/products/${updatedProductId}`} />;
    }

    return productState.product ? (
      <EmployeeProductForm
        title={`Edit Product #${this.props.productId}`}
        categories={categoryState.categories}
        product={productState.product}
        onSubmit={this.onSubmit}
      />
    ) : (
      <CircularProgress />
    );
  }
}

const mapStateToProps = state => ({
  categoryState: {
    categories: state.categoryReducer.categories
  },
  loginState: {
    token: state.loginReducer.token
  },
  productState: {
    product: state.productReducer.product,
    success: state.productReducer.success
  }
});

const mapDispatchToProps = dispatch => ({
  categoryActions: {
    fetchCategories: (apiAccessType, token) => dispatch(fetchCategories(null, apiAccessType, token))
  },
  productActions: {
    fetchProduct: (id, resourceQueryParams, apiAccessType, token) =>
      dispatch(fetchProduct(id, resourceQueryParams, apiAccessType, token)),
    updateProduct: (productId, productFormData, apiAccessType, token) =>
      dispatch(updateProduct(productId, productFormData, apiAccessType, token)),
    productConsumeSuccess: () => dispatch(productConsumeSuccess())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeProductFormEdit);
