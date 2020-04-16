import React, { Component } from 'react';
import { connect } from 'react-redux';

import { accountTypes } from '../../helpers/constants';
import {
  addProductToShoppingCart,
  removeProductFromShoppingCart,
} from '../../actions/shopping-cart/actions';

import { formatPrice } from '../../helpers/formatters';

import cameraStockImage from '../../assets/images/stock-camera.jpg';
import classes from './store-product.module.scss';

import { Paper, Typography } from '@material-ui/core';
import { Divider, LoadingContainer } from '../common';
import { ProductShoppingCartButton } from '../shared';
import { Link } from 'react-router-dom';

class StoreProduct extends Component {
  render() {
    const { product, loginState, shoppingCartState, shoppingCartActions } = this.props;

    return (
      <LoadingContainer
        loading={!product}
        render={() => (
          <Paper className={classes.container}>
            <Typography variant="h6" align="center">
              {product.name}
            </Typography>
            <Link to={`/products/${product.id}`}>
              <img className={classes.image} src={cameraStockImage} alt={product.name} />
            </Link>
            <Typography variant="caption" align="center">
              Available {product.availableItemsCount} out of {product.totalItemsCount}
            </Typography>
            <Divider />
            <Typography variant="caption">Description</Typography>
            <Typography>{product.description}</Typography>
            <Divider />
            <Typography variant="caption">Price / Day</Typography>
            <Typography>{formatPrice(product.price)}</Typography>
            <Divider />
            <Typography variant="caption">Deposit</Typography>
            <Typography>{formatPrice(product.deposit)}</Typography>
            <Divider />
            <ProductShoppingCartButton
              productAvailableItemsCount={product.availableItemsCount}
              isCustomer={loginState.token && loginState.accountType === accountTypes.CUSTOMER}
              productInShoppingCart={
                shoppingCartState.products.findIndex(
                  (shoppingCartProduct) => shoppingCartProduct.id === product.id
                ) !== -1
              }
              onAdd={() => shoppingCartActions.addProductToShoppingCart(product)}
              onRemove={() => shoppingCartActions.removeProductFromShoppingCart(product)}
            />
          </Paper>
        )}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  loginState: {
    token: state.loginReducer.token,
    accountType: state.loginReducer.accountType,
  },
  shoppingCartState: {
    products: state.shoppingCartReducer.products,
  },
});

const mapDispatchToProps = (dispatch) => ({
  shoppingCartActions: {
    removeProductFromShoppingCart: (product) => dispatch(removeProductFromShoppingCart(product)),
    addProductToShoppingCart: (product) => dispatch(addProductToShoppingCart(product)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StoreProduct);
