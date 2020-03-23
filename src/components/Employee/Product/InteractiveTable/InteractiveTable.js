import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-ui/core';

import classes from './InteractiveTable.module.scss';
import MaterialTableBase from '../../../MaterialTable/Base';
import { fetchProducts, deleteProduct } from '../../../../actions/product/actions';

class ProductInteractiveTable extends Component {
  componentDidMount() {
    console.log('PRODUCT INTERACTIVE TABLE COMPONENT DID MOUNT');
    this.props.productActions.fetchProducts({ relations: ['category'] });
  }

  onRowDelete = async product => {
    this.props.productActions.deleteProduct('', product);
  };

  render() {
    const { productState } = this.props;

    const productsData = productState.products.map(product => {
      // console.log(product.category);
      // return Object.assign({}, product);

      return {
        ...product,
        categoryName: !!product.category ? product.category.name : 'None',
        price: product.price.toFixed(2),
        deposit: product.deposit.toFixed(2)
      };
    });

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
  }
});

const mapDispatchToProps = dispatch => ({
  productActions: {
    fetchProducts: resourceQueryParams => dispatch(fetchProducts(resourceQueryParams)),
    deleteProduct: (token, product) => dispatch(deleteProduct(token, product))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductInteractiveTable);
