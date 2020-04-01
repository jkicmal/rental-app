import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removeProductFromShoppingCart } from '../../actions/shopping-cart/actions';

import Button from '@material-ui/core/Button';
import { CustomerShoppingCartProductsInteractiveTable, CustomerShoppingCartCheckoutForm } from '.';
import { MuiModal } from '../common';

class CustomerShoppingCartContainer extends Component {
  state = {
    checkoutModalOpen: false
  };

  onCheckout = () => {
    // Close modal
    this.setState({ checkoutModalOpen: false });

    // Send request
  };

  componentDidUpdate() {
    // 1) Check for checkout success
    //      a) Show notification
    //      b) Reset Shopping cart
    // 2) Check for checkout error
  }

  render() {
    // Redirect on checkout success
    return (
      <>
        <CustomerShoppingCartProductsInteractiveTable
          products={this.props.shoppingCartState.products}
          onProductDelete={this.props.shoppingCartActions.removeProductFromShoppingCart.bind(this)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            this.setState({ checkoutModalOpen: true });
          }}
        >
          Checkout
        </Button>
        <MuiModal
          horizontalCenter
          verticalCenter
          open={this.state.checkoutModalOpen}
          onClose={() => {
            this.setState({ checkoutModalOpen: false });
          }}
        >
          <CustomerShoppingCartCheckoutForm onSubmit={this.onCheckout} />
        </MuiModal>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerShoppingCartContainer);
