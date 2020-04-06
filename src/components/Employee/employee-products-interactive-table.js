import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import { fetchProducts, deleteProduct, productConsumeSuccess } from '../../actions/product/actions';
import { apiAccessTypes } from '../../config';
import { MaterialTableBase, ButtonLink, FlexContainer, Divider } from '../common';

class ProductInteractiveTable extends Component {
  componentDidMount() {
    const { productActions, loginState } = this.props;
    productActions.fetchProducts(
      { relations: ['category'] },
      apiAccessTypes.EMPLOYEE,
      loginState.token
    );
  }

  onRowDelete = async (product) => {
    const { productActions, loginState } = this.props;
    productActions.deleteProduct(product, apiAccessTypes.EMPLOYEE, loginState.token);
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
    const { productState } = this.props;

    const productsData = productState.products.map((product) => ({
      ...product,
      categoryName: !!product.category ? product.category.name : 'None',
      price: Number(product.price).toFixed(2),
      deposit: Number(product.price).toFixed(2),
    }));

    return (
      <MaterialTableBase
        options={{
          search: true,
          paging: true,
        }}
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Price (PLN)', field: 'price' },
          { title: 'Deposit (PLN)', field: 'deposit' },
          { title: 'Category', field: 'categoryName' },
          {
            title: 'Actions',
            render: (rowData) => (
              <FlexContainer>
                <ButtonLink to={`/employee/products/${rowData.id}`}>View</ButtonLink>
                <Divider orientation="vertical" />
                <ButtonLink to={`/employee/products/${rowData.id}/edit`}>Edit</ButtonLink>
              </FlexContainer>
            ),
          },
        ]}
        data={productsData}
        title="Products"
        editable={{
          onRowDelete: (product) => this.onRowDelete(product),
        }}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  productState: {
    products: state.productReducer.products,
    success: state.productReducer.success,
  },
  loginState: {
    token: state.loginReducer.token,
  },
});

const mapDispatchToProps = (dispatch) => ({
  productActions: {
    fetchProducts: (resourceQueryParams, apiAccessType, token) =>
      dispatch(fetchProducts(resourceQueryParams, apiAccessType, token)),
    deleteProduct: (product, apiAccessType, token) =>
      dispatch(deleteProduct(product, apiAccessType, token)),
    productConsumeSuccess: () => dispatch(productConsumeSuccess()),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductInteractiveTable);
