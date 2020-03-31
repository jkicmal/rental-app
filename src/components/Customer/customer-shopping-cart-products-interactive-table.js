import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removeProductFromShoppingCart } from '../../actions/shopping-cart/actions';

import { MaterialTableBase } from '../common';

class CustomerShoppingCartProductsInteractiveTable extends Component {
  onRowDelete = async product => {
    const { shoppingCartActions } = this.props;
    shoppingCartActions.removeProductFromShoppingCart(product);
  };

  render() {
    const { shoppingCartState } = this.props;

    const productsData = shoppingCartState.products.map(product => ({
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
  shoppingCartState: {
    products: state.shoppingCartReducer.products
  }
});

const mapDispatchToProps = dispatch => ({
  shoppingCartActions: {
    removeProductFromShoppingCart: product => dispatch(removeProductFromShoppingCart(product))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerShoppingCartProductsInteractiveTable);
