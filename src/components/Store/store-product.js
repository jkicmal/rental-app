import React, { Component } from 'react';
import { connect } from 'react-redux';

import { accountTypes } from '../../helpers/constants';
import {
  addProductToShoppingCart,
  removeProductFromShoppingCart
} from '../../actions/shopping-cart/actions';

import cameraStockImage from '../../assets/images/stock-camera.jpg';
import classes from './store-product.module.scss';

import { Paper, Typography, Button } from '@material-ui/core';
import { Divider } from '../common';

class StoreProduct extends Component {
  render() {
    const { product, loginState, shoppingCartState, shoppingCartActions } = this.props;

    // NOTE: Check if product exists in shopping cart
    const shoppingCartProducts = shoppingCartState.products;
    const inShoppingCart =
      shoppingCartProducts.findIndex(
        shoppingCartProduct => shoppingCartProduct.id === product.id
      ) !== -1;

    return (
      <Paper className={classes.container}>
        <Typography variant="h6" align="center">
          {product.name}
        </Typography>
        <img className={classes.image} src={cameraStockImage} alt={product.name} />
        <Typography className={classes.description}>{product.description}</Typography>
        <Typography>Price: {product.price.toFixed(2)}PLN</Typography>
        <Typography>Deposit: {product.deposit.toFixed(2)}PLN</Typography>

        <Divider />

        {/* NOTE: Render button only for Customer */}
        {loginState.token && loginState.accountType === accountTypes.CUSTOMER ? (
          // NOTE: You 'key' attribute to force re-render every time key changes
          <div key={inShoppingCart}>
            {inShoppingCart ? (
              <Button
                className={classes.button}
                onClick={() => shoppingCartActions.removeProductFromShoppingCart(product)}
              >
                REMOVE FROM SHOPPING CART
              </Button>
            ) : (
              <Button
                className={classes.button}
                onClick={() => shoppingCartActions.addProductToShoppingCart(product)}
              >
                ADD TO SHOPPING CART
              </Button>
            )}
          </div>
        ) : null}
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  loginState: {
    token: state.loginReducer.token,
    accountType: state.loginReducer.accountType
  },
  shoppingCartState: {
    products: state.shoppingCartReducer.products
  }
});

const mapDispatchToProps = dispatch => ({
  shoppingCartActions: {
    removeProductFromShoppingCart: product => dispatch(removeProductFromShoppingCart(product)),
    addProductToShoppingCart: product => dispatch(addProductToShoppingCart(product))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreProduct);
