import React, { Component } from 'react';
import EmployeeProductForm from '../Form';
import { connect } from 'react-redux';
import { fetchCategories } from '../../../../../actions/category/actions';
import { createProduct, productConsumeSuccess } from '../../../../../actions/product/actions';
import { apiAccessTypes } from '../../../../../config';
import { Redirect } from 'react-router-dom';
import { successTypes } from '../../../../../helpers/constants';
import { toastr } from 'react-redux-toastr';

class EmployeeProductFormAdd extends Component {
  componentDidMount() {
    const { categoryActions, loginState } = this.props;
    categoryActions.fetchCategories(apiAccessTypes.EMPLOYEE, loginState.token);
  }

  onSubmit = productFormData => {
    const { productActions, loginState } = this.props;
    productActions.createProduct(productFormData, apiAccessTypes.EMPLOYEE, loginState.token);
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

    if (productState.success && productState.success.type === successTypes.CREATE_SUCCESS) {
      const createdProductId = productState.success.productId;
      return <Redirect to={`/employee/products/${createdProductId}`} />;
    }

    return (
      <div>
        <EmployeeProductForm
          title="New Product"
          categories={categoryState.categories}
          onSubmit={this.onSubmit}
        />
      </div>
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
    success: state.productReducer.success
  }
});

const mapDispatchToProps = dispatch => ({
  categoryActions: {
    fetchCategories: (apiAccessType, token) => dispatch(fetchCategories(null, apiAccessType, token))
  },
  productActions: {
    createProduct: (productFormData, apiAccessType, token) =>
      dispatch(createProduct(productFormData, apiAccessType, token)),
    productConsumeSuccess: () => dispatch(productConsumeSuccess())
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeProductFormAdd);
