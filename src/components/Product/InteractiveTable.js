import React, { Component } from 'react';
import { connect } from 'react-redux';

import MaterialTableBase from '../MaterialTable/Base';
import { fetchProducts, deleteProduct } from '../../actions/product/actions';

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
      console.log(product.category);
      return Object.assign(
        { categoryName: !!product.category ? product.category.name : 'None' },
        product
      );
    });

    return (
      <MaterialTableBase
        options={{
          search: false,
          paging: true
        }}
        columns={[
          { title: 'ID', field: 'id', editable: 'never' },
          { title: 'Name', field: 'name' },
          { title: 'Category', field: 'categoryName' }
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
