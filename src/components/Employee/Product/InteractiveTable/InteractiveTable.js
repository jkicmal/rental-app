import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { fetchProducts, deleteProduct } from '../../../../actions/product/actions';

import classes from './InteractiveTable.module.scss';
import { Button } from '@material-ui/core';
import { MaterialTableBase } from '../../../Common';
import { apiAccessTypes } from '../../../../config';

class ProductInteractiveTable extends Component {
  componentDidMount() {
    const { productActions, loginState } = this.props;
    productActions.fetchProducts(
      { relations: ['category'] },
      apiAccessTypes.EMPLOYEE,
      loginState.token
    );
  }

  onRowDelete = async product => {
    const { productActions, loginState } = this.props;
    productActions.deleteProduct(product, apiAccessTypes.EMPLOYEE, loginState.token);
  };

  render() {
    const { productState } = this.props;

    const productsData = productState.products.map(product => ({
      ...product,
      categoryName: !!product.category ? product.category.name : 'None',
      price: Number(product.price).toFixed(2),
      deposit: Number(product.price).toFixed(2)
    }));

    return (
      <MaterialTableBase
        options={{
          search: true,
          paging: true
        }}
        columns={[
          { title: 'Name', field: 'name' },
          { title: 'Price (PLN)', field: 'price' },
          { title: 'Deposit (PLN)', field: 'deposit' },
          { title: 'Category', field: 'categoryName' },
          {
            // field: 'id',
            render: rowData => (
              <RouterLink className={classes.link} to={`/employee/products/${rowData.id}`}>
                <Button variant="outlined">View</Button>
              </RouterLink>
            )
          }
        ]}
        data={productsData}
        title="Products"
        editable={{
          onRowDelete: product => this.onRowDelete(product)
        }}
      />
    );
  }
}

const mapStateToProps = state => ({
  productState: {
    products: state.productReducer.products
  },
  loginState: {
    token: state.loginReducer.token
  }
});

const mapDispatchToProps = dispatch => ({
  productActions: {
    fetchProducts: (resourceQueryParams, apiAccessType, token) =>
      dispatch(fetchProducts(resourceQueryParams, apiAccessType, token)),
    deleteProduct: (product, apiAccessType, token) =>
      dispatch(deleteProduct(product, apiAccessType, token))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductInteractiveTable);
