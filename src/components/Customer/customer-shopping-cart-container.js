import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import {
  removeProductFromShoppingCart,
  resetShoppingCart,
} from '../../actions/shopping-cart/actions';
import {
  createRental,
  rentalConsumeError,
  rentalConsumeSuccess,
} from '../../actions/rental/actions';
import { apiAccessTypes } from '../../config/api';

import Button from '@material-ui/core/Button';
import { CustomerShoppingCartProductsInteractiveTable, CustomerShoppingCartCheckoutForm } from '.';
import { MuiModal, FlexContainer, Divider } from '../common';
import { Redirect } from 'react-router-dom';

class CustomerShoppingCartContainer extends Component {
  state = {
    checkoutModalOpen: false,
  };

  onCheckout = (checkoutFormData) => {
    const { products: shoppingCartProducts } = this.props.shoppingCartState;
    const { createRental } = this.props.rentalActions;
    const { token } = this.props.loginState;

    this.setState({ checkoutModalOpen: false });

    const rentalFormData = {
      productsIds: shoppingCartProducts.map((product) => product.id),
      ...checkoutFormData,
    };

    createRental(rentalFormData, apiAccessTypes.CUSTOMER, token);
  };

  componentDidUpdate() {
    const { success: rentalSuccess, error: rentalError } = this.props.rentalState;

    if (rentalSuccess) {
      toastr.success(rentalSuccess.type, rentalSuccess.message);
      this.props.rentalActions.rentalConsumeSuccess();
      this.props.shoppingCartActions.resetShoppingCart();
    }

    if (rentalError) {
      toastr.error(rentalError.type, rentalError.message);
      this.props.rentalActions.rentalConsumeError();
    }
  }

  render() {
    const { success: rentalSuccess } = this.props.rentalState;
    const { products: shoppingCartProducts } = this.props.shoppingCartState;
    const { removeProductFromShoppingCart } = this.props.shoppingCartActions;
    const { checkoutModalOpen } = this.state;

    // NOTE: Redirect on success
    if (rentalSuccess) return <Redirect to={`/customer/rentals/${rentalSuccess.rentalId}`} />;

    return (
      <>
        <CustomerShoppingCartProductsInteractiveTable
          products={shoppingCartProducts}
          onProductDelete={async (product) => removeProductFromShoppingCart(product)}
        />
        <Divider />
        <FlexContainer padding="xs" horizontalCenter>
          <Button
            // NOTE: Disable checkout button when there are no products in cart
            disabled={!shoppingCartProducts.length}
            variant="contained"
            color="primary"
            onClick={() => {
              this.setState({ checkoutModalOpen: true });
            }}
          >
            Checkout
          </Button>
        </FlexContainer>
        <MuiModal
          horizontalCenter
          verticalCenter
          open={checkoutModalOpen}
          onClose={() => {
            this.setState({ checkoutModalOpen: false });
          }}
        >
          <CustomerShoppingCartCheckoutForm
            onSubmit={(checkoutFormData) => this.onCheckout(checkoutFormData)}
          />
        </MuiModal>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  shoppingCartState: {
    products: state.shoppingCartReducer.products,
  },
  rentalState: {
    success: state.rentalReducer.success,
    error: state.rentalReducer.error,
  },
  loginState: {
    token: state.loginReducer.token,
  },
});

const mapDispatchToProps = (dispatch) => ({
  shoppingCartActions: {
    removeProductFromShoppingCart: (product) => dispatch(removeProductFromShoppingCart(product)),
    resetShoppingCart: () => dispatch(resetShoppingCart()),
  },
  rentalActions: {
    createRental: (rentalFormData, apiAccessType, token) =>
      dispatch(createRental(rentalFormData, apiAccessType, token)),
    rentalConsumeError: () => dispatch(rentalConsumeError()),
    rentalConsumeSuccess: () => dispatch(rentalConsumeSuccess()),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerShoppingCartContainer);
